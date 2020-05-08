import React from 'react';
import { useSelector } from 'react-redux';
import Blog from './Blog';
import CreateBlogs from './CreateBlog';
import Togglable from './Togglable';

const Blogs = () => {
  const blogs = useSelector(state => state.blogs);

  return (
    <>
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
