import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './components/Notification';
import Login from './components/Login';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import { initializeBlogs } from './reducers/blogs.reducer';
import { initialLogin, logout } from './reducers/user.reducer';
import {
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Users from './components/Users';
import UserOverview from './components/UserOverview';

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

  const padding = { padding: 5 };
  const navbar = {
    backgroundColor: 'lightgrey',
    padding: 2,
    marginTop: 5,
    marginBottom: 5
  };

  return (
    <>
      <nav style={navbar}>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user
          ? <em>{user.name} logged in <button onClick={handleLogout}>logout</button></em>
          : null
        }
      </nav>
      <Notification />
      <h2>blog app</h2>
      {user ?
        <section>
          <Switch>
            <Route path="/users/:id">
              <UserOverview />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/blogs/:id">
              <Blog />
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
