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

  Promise.all(saveArray);
});

describe('blogs api', () => {

  test('get all blogs', async () => {
    const blogs = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(blogs.body).toHaveLength(blogsList.length);
  });

  test('add a new blog', async () => {
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

  test('add a new blog without likes', async () => {
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

  test('add a blog without title', async () => {
    const blog = { ...ericBlog };
    delete blog.title;

    await api
      .post('/api/blogs')
      .send(blog)
      .set('Accept', 'application/json')
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('add a blog without url', async () => {
    const blog = { ...ericBlog };
    delete blog.url;

    await api
      .post('/api/blogs')
      .send(blog)
      .set('Accept', 'application/json')
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});


afterAll(() => {
  try {
    setTimeout(() => mongoose.connection.close(), 500);
  } catch (err) {
    console.error('mongoose connection close error');
  }
});
