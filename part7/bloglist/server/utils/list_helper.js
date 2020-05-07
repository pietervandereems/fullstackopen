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

const mostLikes = (blogs = []) => {
  const groupedBlogs = _.groupBy(blogs, (blog) => blog.author);

  const groupedArray = [];
  for (const author in groupedBlogs) {
    groupedArray.push({
      author,
      likes: groupedBlogs[author].reduce((likes, blog) => likes += blog.likes, 0)
    });
  }

  return groupedArray.reduce((mostLiked, author) => author.likes >= mostLiked.likes ? author : mostLiked, { likes: 0 });
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
