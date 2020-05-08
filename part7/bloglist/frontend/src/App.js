import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './components/Notification';
import Login from './components/Login';
import Blogs from './components/Blogs';
import { initializeBlogs } from './reducers/blogs.reducer';
import { initialLogin, logout } from './reducers/user.reducer';
import {
  Switch,
  Route
} from 'react-router-dom';
import Users from './components/Users';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initialLogin());
  }, [dispatch]);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout());
  };

  return (
    <>
      <Notification />
      <h2>blogs</h2>
      {user ?
        <section>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
          <Switch>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Blogs />
            </Route>
          </Switch>
        </section> :
        <Login />
      }


    </>
  );
};

export default App;
