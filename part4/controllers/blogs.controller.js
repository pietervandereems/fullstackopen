const blogsRouter = require('express').Router();
const Blog = require('../models/blogs.model');

blogsRouter.get('/', (request, response, next) => {
  Blog
    .find({})
    .then(blogs => blogs.map(blog => blog.toJSON()))
    .then(blogsJSON => response.json(blogsJSON))
    .catch(err => next(err));
});

blogsRouter.post('', (request, response, next) => {
  const blog = new Blog(request.body);
  blog
    .save()
    .then(savedBlog => savedBlog.toJSON())
    .then(savedPersonJSON => response.status(201).json(savedPersonJSON))
    .catch(err => next(err));

});

module.exports = blogsRouter;
