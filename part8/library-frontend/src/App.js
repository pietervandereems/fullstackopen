import React, { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';
import PropTypes from 'prop-types';
import Recommendations from './components/Recommendations';

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }

  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  );
};

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localToken = localStorage.getItem('user-token');
    if (!token && localToken) {
      setToken(localToken);
    }
  }, []); // eslint-disable-line

  const notifyOfError = (errorMessage) => {
    setErrorMessage(errorMessage);
    setTimeout((() => setErrorMessage(null)), 5000);
  };

  const toggleLogin = () => {
    if (token) {
      setToken(null);
      localStorage.clear();
    } else {
      setPage('login');
    }
  };

  return (
    <>
      <nav>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ?
          <button onClick={() => setPage('add')}>add book</button> :
          null
        }
        {token ?
          <button onClick={() => setPage('recommendations')}>recommend</button> :
          null
        }
        <button onClick={toggleLogin}>{token ? 'logout' : 'login'}</button>
      </nav>

      <Notify errorMessage={errorMessage} />

      <Authors show={page === 'authors'} setError={notifyOfError} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Recommendations show={page === 'recommendations'} favorite={(user) ? user.favoriteGenre : ''} />

      <Login show={page === 'login'} setToken={setToken} setError={notifyOfError} setUser={setUser} />
    </>
  );
};

Notify.propTypes = {
  errorMessage: PropTypes.string
};

export default App;
