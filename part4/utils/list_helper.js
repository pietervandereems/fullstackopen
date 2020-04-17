const _ = require('lodash');

const dummy = () => {
  return 1;
};

const totalLikes = (blogs = []) => blogs.reduce((acc, blog) => acc + blog.likes, 0);

const favoriteBlog = (blogs = []) => blogs.reduce((favorite, blog) => blog.likes >= favorite.likes ? blog : favorite, { likes: -1 });

const mostBlogs = (blogs = []) => {

  const countedBlogs = _.countBy(blogs, (blog) => blog.author);
  let most = {
    author: '',
    blogs: 0
  };
  for (const author in countedBlogs) {
    if (countedBlogs[author] >= most.blogs) {
      most = {
        author,
        blogs: countedBlogs[author]
      };
    }
  }
  return most;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
};
