const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blogs.model');
const { blogsList } = require('./testdata');
const { getBlogById, blogsInDB } = require('./test_helper');

const api = supertest(app);

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
    const blog = new Blog({
      title: 'Composing Software',
      author: 'Eric Elliot',
      url: 'https://ericelliottjs.com/premium-content',
      likes: 1,
    });

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

});

afterAll(() => {
  mongoose.connection.close();
});
