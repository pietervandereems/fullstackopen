import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const User = ({ user }) => (
  <tr>
    <td> <Link to={`/users/${user.id}`}>{user.name}</Link></td>
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
          <tr><th></th><th>blogs created</th></tr>
          {blogCountList.map(blogCount => <User key={blogCount.id} user={blogCount} />)}
        </tbody>
      </table>
    </>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    blogs: PropTypes.number,
    id: PropTypes.string
  })
};

export default Users;
