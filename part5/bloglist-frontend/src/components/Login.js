import React, { useState, useEffect } from 'react';
import loginService from '../services/login.service';
import jsonwebtoken from 'jsonwebtoken';
import PropTypes from 'prop-types';

const Login = ({ sendNotification, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const localUser = window.localStorage.getItem('user');
    if (!localUser) {
      return;
    }
    try {
      const user = JSON.parse(window.localStorage.getItem('user'));
      setUser(user);
    } catch (err) {
      console.error('Error setting user from localStorage', err);
    }
  }, [setUser]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password,
      });
      setUsername('');
      setPassword('');
      sendNotification({ txt: `Welkom ${user.name}` });
      window.localStorage.setItem('user', JSON.stringify({
        ...user,
        id: jsonwebtoken.decode(user.token).id
      }));
      setUser(user);
    } catch (exception) {
      console.error('login problem', exception);
      sendNotification({ txt: 'Wrong credentials', isError: true });
    }
  };

  return (
    <>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <p>
          <label>username
            <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} /><br />
          </label>
          <label>
            password
            <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
          </label>
        </p>
        <button type="submit">login</button>
      </form>
    </>
  );
};

Login.propTypes = {
  sendNotification: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
};

export default Login;
