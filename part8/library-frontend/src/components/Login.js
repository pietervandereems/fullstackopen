import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useApolloClient } from '@apollo/client';
import { LOGIN } from '../queries';

const Login = ({ show, setToken, setError, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const client = useApolloClient();

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    }
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.token;
      localStorage.setItem('user-token', token);
      client.resetStore();
      setToken(token);
      setUser(result.data.login.user);
    }
  }, [result.data, setToken, client, setUser]);

  if (!show) {
    return null;
  }

  const handleLogin = (event) => {
    event.preventDefault();

    login({ variables: { username, password } });

    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        username
        <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
      </label><br />
      <label>
        password
        <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
      </label><br />
      <button type="submit">login</button>
    </form>
  );

};

Login.propTypes = {
  show: PropTypes.bool,
  setToken: PropTypes.func,
  setError: PropTypes.func,
  setUser: PropTypes.func
};

export default Login;
