import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <tr>
    <td>{user.name}</td>
    <td>{user.blogs}</td>
  </tr>
);

const Users = () => {
  const blogs = useSelector(state => state.blogs);
  if (blogs.length === 0) {
    return null;
  }

  const blogCounter = blogs.reduce((acc, blog) => {
    if (acc[blog.user.id]) {
      acc[blog.user.id].blogs += 1;
    } else {
      acc[blog.user.id] = {
        name: blog.user.name,
        blogs: 1,
        id: blog.user.id
      };
    }
    return acc;
  }, {});

  const blogCountList = [];
  for (const item in blogCounter) {
    blogCountList.push(blogCounter[item]);
  }
  return (
    <>
      <h2>Users</h2>
      <table>
        <tbody>
          {blogCountList.map(blogCount => <User key={blogCount.id} user={blogCount} />)}
        </tbody>
      </table>
    </>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    blogs: PropTypes.number
  })
};

export default Users;
