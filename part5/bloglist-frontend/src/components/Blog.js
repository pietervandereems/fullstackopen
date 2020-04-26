import React, { useState } from 'react';

const Blog = ({ blog }) => {
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

  return (
    <article style={blogStyle}>
      {blog.title} <button onClick={toggleDetails}>{visible ? 'hide' : 'view'}</button><br />
      <p style={showDetails}>
        {blog.url}<br />
        likes {blog.likes}<button>like</button><br />
        {blog.author}
      </p>
    </article >
  );
};

export default Blog;
