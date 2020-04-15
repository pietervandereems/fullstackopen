const listHelper = require('../utils/list_helper');
const { listWithOneBlog, blogsList, blogListFavorite } = require('./testdata');

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});

describe('total likes', () => {

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(listWithOneBlog[0].likes);
  });

  test('when a list of multiple blogs equals the total of all likes', () => {
    const result = listHelper.totalLikes(blogsList);
    expect(result).toBe(36);
  });

});
describe('favorite blog', () => {
  test('show the favorite blog', () => {

    const result = listHelper.favoriteBlog(blogsList);
    expect(result).toEqual(blogListFavorite);
  });
});
