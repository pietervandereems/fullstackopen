import React, { useState } from 'react';

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
      {blog.title} <button onClick={toggleDetails}>{visible ? 'hide' : 'view'}</button><br />
      <p style={showDetails}>
        {blog.url}<br />
        likes {blog.likes}<button onClick={like}>like</button><br />
        {blog.author}<br />
        {blog.user.id === userId ? <button onClick={remove}>remove</button> : null}
      </p>
    </article >
  );
};

export default Blog;
