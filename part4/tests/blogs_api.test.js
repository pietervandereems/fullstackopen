const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blogs.model');
const { blogsList } = require('./testdata');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const saveArray = blogsList
    .map(blog => new Blog(blog))
    .map(blog => blog.save());

  Promise.all(saveArray);
});

describe('blogs api', () => {

  test('get all blogs from the api', async () => {
    const blogs = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(blogs.body).toHaveLength(blogsList.length);
  });

});

afterAll(() => {
  mongoose.connection.close();
});
