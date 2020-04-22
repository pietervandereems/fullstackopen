const Blog = require('../models/blogs.model');
const { createBlogList } = require('./testdata');

describe('blog model', () => {

  test('should contain the id property', () => {
    const blog = new Blog(createBlogList()[0]);
    expect(blog.toJSON().id).toBeDefined();
  });

  test('should _not_ contain the _id property', () => {
    const blog = new Blog(createBlogList()[0]);
    expect(blog.toJSON()._id).toBeUndefined();
  });

});
