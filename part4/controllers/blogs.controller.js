const blogsRouter = require('express').Router();
const Blog = require('../models/blogs.model');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs.map(blog => blog.toJSON()));
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
