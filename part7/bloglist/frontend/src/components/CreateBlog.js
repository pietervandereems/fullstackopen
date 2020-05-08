import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notification.reducer';
import { addBlog } from '../reducers/blogs.reducer';
import PropTypes from 'prop-types';

const CreateBlogs = ({ toggleVisibility }) => {
  const dispatch = useDispatch();
  const [blog, setBlog] = useState({});

  const handleChange = (item) => ({ target: { value } }) => setBlog({ ...blog, [item]: value });

  const createBlog = async (event) => {
    event.preventDefault();
    toggleVisibility();
    const savedBlog = await dispatch(addBlog(blog));
    dispatch(setNotification({ txt: `a new blog ${savedBlog.title} by ${savedBlog.author} added` }));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
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
  toggleVisibility: PropTypes.func
};

export default CreateBlogs;
