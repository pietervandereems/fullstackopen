const dummy = () => {
  return 1;
};

const totalLikes = (blogs = []) => blogs.reduce((acc, blog) => acc + blog.likes, 0);

const favoriteBlog = (blogs = []) => blogs.reduce((favorite, blog) => blog.likes >= favorite.likes ? blog : favorite, { likes: -1 });

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
