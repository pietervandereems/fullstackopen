import React, { useState } from 'react';

const CreateBlogs = ({ saveBlog }) => {
  const [blog, setBlog] = useState({});

  const handleChange = (item) => ({ target: { value } }) => setBlog({ ...blog, [item]: value });

  const addBlog = (event) => {
    event.preventDefault();
    setBlog({});
    saveBlog(blog);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <label>
          title
          <input type="text" onChange={handleChange('title')} />
        </label><br />
        <label>
          author
          <input type="text" onChange={handleChange('author')} />
        </label><br />
        <label>
          url
          <input type="text" onChange={handleChange('url')} />
        </label><br />
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default CreateBlogs;
