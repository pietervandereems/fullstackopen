const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blogs.model');
const { blogsList } = require('./testdata');
const { getBlogById, blogsInDB } = require('./test_helper');

const api = supertest(app);

const ericBlog = {
  title: 'Composing Software',
  author: 'Eric Elliot',
  url: 'https://ericelliottjs.com/premium-content',
  likes: 1,
};

beforeEach(async () => {
  await Blog.deleteMany({});

  const saveArray = blogsList
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

    expect(blogs.body).toHaveLength(blogsList.length);
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

    test('succeeds with valid data', async () => {
      const blog = { ...ericBlog };

      const savedBlog = await api
        .post('/api/blogs')
        .send(blog)
        .set('Accept', 'application/json')
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogs = await blogsInDB();
      expect(blogs).toHaveLength(blogsList.length + 1);

      const newBlog = await getBlogById(savedBlog.body.id);
      expect(savedBlog.body).toEqual(newBlog);
    });

    test('succeeds without likes, defaults likes to 0', async () => {
      const blog = { ...ericBlog };
      delete blog.likes;

      const savedBlog = await api
        .post('/api/blogs')
        .send(blog)
        .set('Accept', 'application/json')
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogs = await blogsInDB();
      expect(blogs).toHaveLength(blogsList.length + 1);

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
        .expect(400);
    });

    test('fails with statuscode 400 if data without url', async () => {
      const blog = { ...ericBlog };
      delete blog.url;

      await api
        .post('/api/blogs')
        .send(blog)
        .expect(400);
    });
  });

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const initialBlogs = await blogsInDB();

      const blogToDelete = initialBlogs[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204);

      const blogsAfter = await blogsInDB();

      expect(blogsAfter).toHaveLength(
        blogsList.length - 1
      );

      expect(blogsAfter).not.toContain(blogToDelete.content);
    });
  });
});


afterAll(() => {
  mongoose.connection.close();
});
