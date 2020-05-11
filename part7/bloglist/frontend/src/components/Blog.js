import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeBlog, deleteBlog } from '../reducers/blogs.reducer';
import { setNotification } from '../reducers/notification.reducer';
import { useParams, useHistory } from 'react-router-dom';
import AddComment from './AddComment';
import { Button, BlogArticle } from './Styles';


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
    const likedBlog = await dispatch(likeBlog(blog));
    dispatch(setNotification({ txt: `liked ${likedBlog.title}` }));
  };

  const remove = async (event) => {
    event.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await dispatch(deleteBlog(blog));
      dispatch(setNotification({ txt: `${blog.title} removed` }));
    }
  };

  return (
    <BlogArticle>
      <h2>{blog.title} {blog.author}</h2>
      <p>
        <a href={blog.url}>{blog.url}</a><br />
        likes {blog.likes}<Button onClick={like}>like</Button><br />
        added by {blog.user.name}<br />
        {blog.user.id === user.id ? <Button onClick={remove}>remove</Button> : null}
        <h2>comments</h2>
        <AddComment blog={blog} />
        {blog.comments.length > 0 ?
          <ul>
            {blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
          </ul>
          : null}
      </p>
    </BlogArticle >
  );
};

export default Blog;
