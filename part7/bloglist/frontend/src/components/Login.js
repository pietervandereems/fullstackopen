import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user.reducer';
import { setNotification } from '../reducers/notification.reducer';

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    const user = await dispatch(login(username, password));
    if (user.failed) {
      dispatch(setNotification({ txt: 'Wrong credentials', isError: true }));
    } else {
      dispatch(setNotification({ txt: `Welkom ${user.name}` }));
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
