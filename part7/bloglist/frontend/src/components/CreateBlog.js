import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CreateBlogs = ({ saveBlog }) => {
  const [blog, setBlog] = useState({});

  const handleChange = (item) => ({ target: { value } }) => setBlog({ ...blog, [item]: value });

  const addBlog = (event) => {
    event.preventDefault();
    saveBlog(blog);
    setBlog({});
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <label>
          title
          <input type="text" name="Title" onChange={handleChange('title')} />
        </label><br />
        <label>
          author
          <input type="text" name="Author" onChange={handleChange('author')} />
        </label><br />
        <label>
          url
          <input type="text" name="Url" onChange={handleChange('url')} />
        </label><br />
        <button aria-label="submit" type="submit">create</button>
      </form>
    </>
  );
};

CreateBlogs.propTypes = {
  saveBlog: PropTypes.func.isRequired
};

export default CreateBlogs;
