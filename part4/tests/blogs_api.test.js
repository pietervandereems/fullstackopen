const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blogs.model');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { createBlogList } = require('./testdata');
const { getBlogById, blogsInDB } = require('./test_helper');

const api = supertest(app);

const ericBlog = {
  title: 'Composing Software',
  author: 'Eric Elliot',
  url: 'https://ericelliottjs.com/premium-content',
  likes: 1,
};

const users = {
  testUser: {
    username: 'jesttester',
    password: 'sekreet'
  },
  wrongUser: {
    username: 'jestwrong',
    password: 'wrongsekreet'
  }
};

let blogList = [];

beforeAll(async () => {

  for (const user in users) {
    const usr = users[user];
    const passwordHash = await bcrypt.hash(usr.password, 10);
    const createdUser = new User({ name: usr.username, username: usr.username, passwordHash });
    await User.deleteOne({ name: usr.username, username: usr.username });
    const savedUser = await createdUser.save();

    const login = await api
      .post('/api/login')
      .send(usr)
      .set('Accept', 'application/json')
      .expect(200);
    expect(login.body.token).toBeDefined();
    usr.id = savedUser._id;
    usr.bearerToken = 'bearer ' + login.body.token;
  }

  blogList = createBlogList(users.testUser.id);
});

beforeEach(async () => {
  await Blog.deleteMany({});

  const saveArray = blogList
    .map(blog => new Blog(blog))
    .map(blog => blog.save());

  await Promise.all(saveArray);
});

describe('blogs api', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const blogs = await api
      .get('/api/blogs')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(blogs.body).toHaveLength(blogList.length);
  });

  test('a specific blog is returned when requested by id', async () => {
    const allBlogs = await blogsInDB();
    const blog = allBlogs[0];

    const requestedBlog = await api
      .get(`/api/blogs/${blog.id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(requestedBlog.body).toEqual(blog);
  });

  describe(('adding a new blog'), () => {

    test('fails without a valid token', async () => {
      const blog = { ...ericBlog };

      await api
        .post('/api/blogs')
        .send(blog)
        .set('Authorization', 'notAToken')
        .set('Accept', 'application/json')
        .expect(401);
    });

    test('succeeds with valid data', async () => {
      const blog = { ...ericBlog };

      const savedBlog = await api
        .post('/api/blogs')
        .send(blog)
        .set('Authorization', users.testUser.bearerToken)
        .set('Accept', 'application/json')
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogs = await blogsInDB();
      expect(blogs).toHaveLength(blogList.length + 1);

      const newBlog = await getBlogById(savedBlog.body.id);
      expect(savedBlog.body).toEqual(newBlog);
    });

    test('succeeds without likes, defaults likes to 0', async () => {
      const blog = { ...ericBlog };
      delete blog.likes;

      const savedBlog = await api
        .post('/api/blogs')
        .send(blog)
        .set('Authorization', users.testUser.bearerToken)
        .set('Accept', 'application/json')
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogs = await blogsInDB();
      expect(blogs).toHaveLength(blogList.length + 1);

      const newBlog = await getBlogById(savedBlog.body.id);
      expect(savedBlog.body).toEqual(newBlog);
      expect(newBlog.likes).toBeDefined();
      expect(newBlog.likes).toBe(0);
    });

    test('fails with statuscode 400 if data without title', async () => {
      const blog = { ...ericBlog };
      delete blog.title;

      await api
        .post('/api/blogs')
        .send(blog)
        .set('Authorization', users.testUser.bearerToken)
        .expect(400);
    });

    test('fails with statuscode 400 if data without url', async () => {
      const blog = { ...ericBlog };
      delete blog.url;

      await api
        .post('/api/blogs')
        .send(blog)
        .set('Authorization', users.testUser.bearerToken)
        .expect(400);
    });

  });

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const initialBlogs = await blogsInDB();
      const blogToDelete = initialBlogs[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', users.testUser.bearerToken)
        .expect(204);

      const blogsAfter = await blogsInDB();

      expect(blogsAfter).toHaveLength(
        initialBlogs.length - 1
      );

      expect(blogsAfter).not.toContainEqual(blogToDelete);
    });

    test('fails with statuscode 400 if id is invalid', async () => {
      const initialBlogs = await blogsInDB();
      const blogToDelete = initialBlogs[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id - 999}`)
        .set('Authorization', users.testUser.bearerToken)
        .expect(400);
    });

    test('fails with statuscode 403 if user deletes anothers blog', async () => {
      const initialBlogs = await blogsInDB();
      const blogToDelete = initialBlogs[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', users.wrongUser.bearerToken)
        .expect(403);
    });
  });

  describe('update of a blog', () => {
    test('succeeds with statuscode 200 and blog is updated', async () => {
      const initialBlogs = await blogsInDB();

      const blogToUpdate = {
        ...initialBlogs[0],
        likes: initialBlogs[0].likes + 100
      };

      const updateResult = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .set('Authorization', users.testUser.bearerToken)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(updateResult.body).toEqual(blogToUpdate);

      const blogsAfter = await blogsInDB();
      expect(blogsAfter).toHaveLength(blogList.length);
      expect(blogsAfter).toContainEqual(blogToUpdate);
    });

    test('fails with statuscode 400 if id is invalid', async () => {
      const initialBlogs = await blogsInDB();
      const blogToUpdate = initialBlogs[0];
      const result = await api
        .put('/api/blogs/aaaa')
        .send(blogToUpdate)
        .set('Authorization', users.testUser.bearerToken)
        .expect(400);

      expect(result.body).toEqual({ error: 'malformatted id' });
    });

    test('fails with statuscode 403 if update by another user', async () => {
      const initialBlogs = await blogsInDB();

      const blogToUpdate = {
        ...initialBlogs[0],
        likes: initialBlogs[0].likes + 100
      };

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .set('Authorization', users.wrongUser.bearerToken)
        .set('Accept', 'application/json')
        .expect(403);

    });
  });

});


afterAll(async () => {

  mongoose.connection.close();
});
