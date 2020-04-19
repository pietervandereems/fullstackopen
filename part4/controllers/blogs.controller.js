const blogsRouter = require('express').Router();
const Blog = require('../models/blogs.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');

const decodeToken = (token) => {
  const decodedToken = token ? jwt.verify(token, SECRET) : null;
  if (!token || !decodedToken.id) {
    return {
      valid: false,
      error: {
        name: 'TokenError',
        message: 'token missing or invalid'
      }
    };
  }
  return { valid: true, ...decodedToken };
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

blogsRouter.post('/', async ({ body, token }, response, next) => {
  const decodedToken = decodeToken(token);
  if (!decodedToken.valid) {
    return next(decodedToken.error);
  }

  const user = await User.findById(decodedToken.id);
  const blog = new Blog({
    ...body,
    user: user.toJSON().id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog.toJSON());
});

blogsRouter.put('/:id', async ({ params: { id }, body }, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(id, body, { new: true });
  response.json(updatedBlog.toJSON());
});

blogsRouter.delete('/:id', async ({ params: { id }, token }, response, next) => {
  const decodedToken = decodeToken(token);
  if (!decodedToken.valid) {
    return next(decodedToken.error);
  }

  const blogToDelete = await Blog.findById(id);
  if (!blogToDelete.user) {
    return response.status(204).end();
  }
  if (blogToDelete.user.toString() !== decodedToken.id.toString()) {
    return next({
      name: 'UnauthorizedUser',
      message: `User is not authorized to delete blog ${id}`
    });
  }

  const user = (await User.findById(decodedToken.id)).toJSON();
  const updatedUser = {
    ...user,
    blogs: user.blogs.filter(blogId => blogId.toString() !== id)
  };
  await User.findByIdAndUpdate(decodedToken.id, updatedUser);

  await Blog.findByIdAndRemove(id);
  response.status(204).end();
});

module.exports = blogsRouter;
