const blogsRouter = require('express').Router();
const Blog = require('../models/blogs.model');
const User = require('../models/user.model');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {
      name: 1,
      username: 1,
      id: 1
    });

  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.get('/:id', async ({ params: { id } }, response) => {
  const blogs = await Blog.find({ _id: id });

  if (blogs.length === 1) {
    return response.json(blogs[0].toJSON());
  }

  response.status(404).end();
});

blogsRouter.post('/', async ({ body }, response) => {
  const user = await User.find({})[0].toJSON().id;
  const blog = new Blog({
    user,
    ...body
  });
  const savedBlog = await blog.save();
  user.blogs = user.notes.concat(savedBlog._id);
  await user.save();
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
