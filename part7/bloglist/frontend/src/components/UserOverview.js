import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserOverview = () => {
  const id = useParams().id;
  const blogs = useSelector(state => state.blogs);

  const userBlogs = blogs.filter(blog => blog.user.id === id);
  if (userBlogs.length === 0) {
    return (<p>No blogs found posted by this user</p>);
  }

  return (
    <>
      <h2>{userBlogs[0].user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {userBlogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </>
  );

};

export default UserOverview;
