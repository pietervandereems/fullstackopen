import React, { useEffect, useState } from 'react';
import blogService from '../services/blogs.service';
import Blog from './Blog';
import CreateBlogs from './CreateBlog';
import Togglable from './Togglable';

const Blogs = ({ user, setUser, sendNotification }) => {
  const [blogs, setBlogs] = useState([]);

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

  return (
    <>
      <h2>blogs</h2>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="new note">
        <CreateBlogs user={user} setBlogs={setBlogs} blogs={blogs} sendNotification={sendNotification} />
      </Togglable>
      <p>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </p>
    </>
  );
};

export default Blogs;
