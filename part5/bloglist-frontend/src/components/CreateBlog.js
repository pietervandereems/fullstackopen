import React, { useState } from 'react';
import blogService from '../services/blogs.service';

const CreateBlogs = ({ user, setBlogs, blogs }) => {
  const [blog, setBlog] = useState({});

  const handleChange = (item) => ({ target: { value } }) => setBlog({ ...blog, [item]: value });

  const saveBlog = async (event) => {
    event.preventDefault();

    const savedBlog = await blogService.addBlog(blog, user);
    setBlogs([...blogs, savedBlog]);
  };

  return (
    <form onSubmit={saveBlog}>
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
  );
};

export default CreateBlogs;
