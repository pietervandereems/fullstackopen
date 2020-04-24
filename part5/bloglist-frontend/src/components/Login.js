import React, { useState, useEffect } from 'react';
import loginService from '../services/login.service';

const Login = ({ sendNotification, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    try {
      const user = JSON.parse(window.localStorage.getItem('user'));
      console.log('login useEffect',{user});
      setUser(user);
    } catch (err) {
      //
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
      sendNotification({ txt: 'Welkom' });
      window.localStorage.setItem('user', JSON.stringify(user));
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

export default Login;
