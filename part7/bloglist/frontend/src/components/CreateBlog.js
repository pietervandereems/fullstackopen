import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notification.reducer';
import { addBlog } from '../reducers/blogs.reducer';
import PropTypes from 'prop-types';
import { Button, Input, BlogArticle, Form } from './Styles';

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
    <BlogArticle>
      <h2>create new</h2>
      <Form onSubmit={createBlog}>
        <label for="Title">title</label>
        <Input type="text" name="Title" id="Title" onChange={handleChange('title')} />

        <label for="Author">author</label>
        <Input type="text" name="Author" id="Author" onChange={handleChange('author')} />

        <label for="Url">url</label>
        <Input type="text" name="Url" id="Url" onChange={handleChange('url')} />

        <Button aria-label="submit" type="submit">create</Button>
      </Form>
    </BlogArticle>
  );
};

CreateBlogs.propTypes = {
  toggleVisibility: PropTypes.func
};

export default CreateBlogs;
