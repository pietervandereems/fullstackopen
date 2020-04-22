const Blog = require('../models/blogs.model');
const User = require('../models/user.model');

const getBlogById = async (id) => {
  const blog = await Blog.find({ _id: id });
  return {
    ...blog[0].toJSON(),
    user: blog[0].user.toString()
  };
};

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => ({ ...blog.toJSON(), user: blog.user.toString() }));
};

const usersInDB = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
};

module.exports = {
  getBlogById,
  blogsInDB,
  usersInDB
};
