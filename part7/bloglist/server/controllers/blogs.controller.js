const blogsRouter = require('express').Router();
const Blog = require('../models/blogs.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');

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

blogsRouter.post('/', async ({ body, token }, response) => {
  const decodedToken = jwt.verify(token, SECRET);
  const user = await User.findById(decodedToken.id);
  const blog = new Blog({
    ...body,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog.toJSON());
});

blogsRouter.post('/:id/comment', async ({ params: { id }, body: { comment } }, response) => {
  const blog = await Blog.findById(id);
  blog.comments.push(comment);
  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
  return response.json(updatedBlog.toJSON());
});

blogsRouter.put('/:id', async ({ params: { id }, body, token }, response) => {

  const decodedToken = jwt.verify(token, SECRET);
  const oldBlog = (await Blog.findById(id));

  if (oldBlog.user.toString() === decodedToken.id) {
    const updatedBlog = await Blog.findByIdAndUpdate(id, body, { new: true });
    return response.json(updatedBlog.toJSON());
  }

  throw {
    name: 'UnauthorizedUser',
    message: `User is not authorized to update blog ${id}`
  };

});

blogsRouter.put('/:id/like', async ({ params: { id } }, response) => {
  const blog = await Blog.findById(id);
  blog.likes += 1;
  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
  return response.json(updatedBlog.toJSON());
});

blogsRouter.delete('/:id', async ({ params: { id }, token }, response) => {
  const decodedToken = jwt.verify(token, SECRET);

  const blogToDelete = await Blog.findById(id);
  if (!blogToDelete.user) {
    return response.status(204).end();
  }

  if (blogToDelete.user.toString() !== decodedToken.id.toString()) {
    throw {
      name: 'UnauthorizedUser',
      message: `User is not authorized to delete blog ${id}`
    };
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
