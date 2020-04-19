const blogsRouter = require('express').Router();
const Blog = require('../models/blogs.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');

const getTokenFrom = authorization => {
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

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

blogsRouter.post('/', async ({ body, authorization }, response, next) => {
  const token = getTokenFrom(authorization);

  const decodedToken = token ? jwt.verify(token, SECRET) : null;
  if (!token || !decodedToken.id) {
    return next({
      name: 'TokenError',
      message: 'token missing or invalid'
    });
  }

  const user = (await User.findById(decodedToken.id)).toJSON();
  const blog = new Blog({
    ...body,
    user: user.id,
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
