import React, { useEffect, useState } from 'react';
import blogService from '../services/blogs.service';
import Blog from './Blog';
import CreateBlogs from './CreateBlog';
import Togglable from './Togglable';
import PropTypes from 'prop-types';

const Blogs = ({ user, setUser, sendNotification }) => {
  const [blogs, setBlogs] = useState([]);
  const blogFormRef = React.createRef();

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };

    fetchData();
  }, []);


  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.setItem('user', '');
    setUser(null);
  };

  const saveBlog = async (blog) => {
    blogFormRef.current.toggleVisibility();
    const savedBlog = await blogService.addBlog(blog, user);
    sendNotification({ txt: `a new blog ${savedBlog.title} by ${savedBlog.author} added` });
    setBlogs([...blogs, savedBlog]);
  };

  const updateBlog = async (blog) => {
    await blogService.updateBlog(blog, user);
    sendNotification({ txt: `liked ${blog.title}` });
    setBlogs(blogs.map(b => b.id === blog.id ? blog : b));
  };

  const deleteBlog = async (blog) => {
    await blogService.deleteBlog(blog, user);
    sendNotification({ txt: `${blog.title} removed` });
    setBlogs(blogs.filter(b => b.id !== blog.id));
  };

  return (
    <>
      <h2>blogs</h2>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <CreateBlogs saveBlog={saveBlog} />
      </Togglable>
      <section>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} userId={user.id} />)
        }
      </section>
    </>
  );
};

Blogs.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string
  }),
  setUser: PropTypes.func.isRequired,
  sendNotification: PropTypes.func.isRequired
};


export default Blogs;
