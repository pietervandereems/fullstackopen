import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBlog, deleteBlog } from '../reducers/blogs.reducer';
import { setNotification } from '../reducers/notification.reducer';
import { useParams, useHistory } from 'react-router-dom';

const Blog = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const id = useParams().id;
  const user = useSelector(state => state.user);
  const blog = useSelector(state => state.blogs).find(blog => blog.id === id);
  if (!blog) {
    history.push('/');
    return null;
  }

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
    <article>
      <h2>{blog.title} {blog.author}</h2>
      <p>
        {blog.url}<br />
        likes {blog.likes}<button onClick={like}>like</button><br />
        added by {blog.user.name}<br />
        {blog.user.id === user.id ? <button onClick={remove}>remove</button> : null}
      </p>
    </article >
  );
};

export default Blog;
