import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, updateBlog, deleteBlog, userId }) => {
  const [visible, setVisibility] = useState(false);
  const showDetails = { display: visible ? '' : 'none' };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const toggleDetails = (event) => {
    event.preventDefault();
    setVisibility(!visible);
  };

  const like = (event) => {
    event.preventDefault();
    updateBlog({
      ...blog,
      likes: blog.likes + 1
    });
  };

  const remove = (event) => {
    event.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog);
    }
  };

  return (
    <article style={blogStyle}>
      {blog.title} {blog.author}<button onClick={toggleDetails}>{visible ? 'hide' : 'view'}</button><br />
      <p data-likes={blog.likes} style={showDetails}>
        {blog.url}<br />
        likes {blog.likes}<button onClick={like}>like</button><br />
        {blog.author}<br />
        {blog.user.id === userId ? <button onClick={remove}>remove</button> : null}
      </p>
    </article >
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    likes: PropTypes.number,
    author: PropTypes.string,
    url: PropTypes.string,
    title: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  userId: PropTypes.string
};

export default Blog;
