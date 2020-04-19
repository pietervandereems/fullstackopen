const blogsRouter = require('express').Router();
const Blog = require('../models/blogs.model');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.get('/:id', async ({ params: { id } }, response) => {
  const blogs = await Blog.find({ _id: id });

  if (blogs.length === 1) {
    return response.json(blogs[0].toJSON());
  }

  response.status(404).end();
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog.toJSON());
});

blogsRouter.put('/:id', async ({ params: { id }, body }, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(id, body, { new: true });
  response.json(updatedBlog.toJSON());
});

blogsRouter.delete('/:id', async ({ params: { id } }, response) => {
  await Blog.findByIdAndRemove(id);
  response.status(204).end();
});

module.exports = blogsRouter;
