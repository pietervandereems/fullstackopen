import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/user.reducer';
import Blog from './Blog';
import CreateBlogs from './CreateBlog';
import Togglable from './Togglable';

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.user);


  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout());
  };

  return (
    <>
      <h2>blogs</h2>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="new note">
        <CreateBlogs />
      </Togglable>
      <section id="bloglisting">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => <Blog key={blog.id} blog={blog} />)
        }
      </section>
    </>
  );
};

export default Blogs;
