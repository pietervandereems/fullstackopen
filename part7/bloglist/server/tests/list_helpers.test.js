const listHelper = require('../utils/list_helper');
const {
  listWithOneBlog,
  createBlogList,
  blogListFavorite,
  blogListMostBlogs,
  blogListMostLiked
} = require('./testdata');

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
    const result = listHelper.totalLikes(createBlogList());
    expect(result).toBe(36);
  });

});

describe('favorite blog', () => {
  test('show the favorite blog', () => {
    const result = listHelper.favoriteBlog(createBlogList());
    expect(result).toEqual(blogListFavorite);
  });
});

describe('most blogs', () => {
  test('show who has the most blogs and how many', () => {
    const result = listHelper.mostBlogs(createBlogList());
    expect(result).toEqual(blogListMostBlogs);
  });
});
describe('most likes', () => {
  test('show who has the most likes and how many', () => {
    const result = listHelper.mostLikes(createBlogList());
    expect(result).toEqual(blogListMostLiked);
  });
});
