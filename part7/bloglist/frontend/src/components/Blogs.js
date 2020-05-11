import React from 'react';
import { useSelector } from 'react-redux';
import CreateBlogs from './CreateBlog';
import Togglable from './Togglable';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <article style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
    </article >
  );
};

const Blogs = () => {
  const blogs = useSelector(state => state.blogs);

  return (
    <>
      <Togglable buttonLabel="create new">
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

Blog.propTypes = {
  blog: PropTypes.shape({
    author: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.string
  })
};

export default Blogs;
