import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { updateBlog, deleteBlog } from '../reducers/blogs.reducer';
import { setNotification } from '../reducers/notification.reducer';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
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

  const like = async (event) => {
    event.preventDefault();
    const updatedBlog = await dispatch(updateBlog({
      ...blog,
      likes: blog.likes + 1
    }));
    dispatch(setNotification({ txt: `liked ${updatedBlog.title}` }));
  };

  const remove = async (event) => {
    event.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await dispatch(deleteBlog(blog));
      dispatch(setNotification({ txt: `${blog.title} removed` }));
    }
  };

  return (
    <article style={blogStyle}>
      {blog.title} {blog.author}<button onClick={toggleDetails}>{visible ? 'hide' : 'view'}</button><br />
      <p data-likes={blog.likes} style={showDetails}>
        {blog.url}<br />
        likes {blog.likes}<button onClick={like}>like</button><br />
        {blog.author}<br />
        {blog.user.id === user.id ? <button onClick={remove}>remove</button> : null}
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
  })
};

export default Blog;
