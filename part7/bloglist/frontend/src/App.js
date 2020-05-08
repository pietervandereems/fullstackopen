import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './components/Notification';
import Login from './components/Login';
import Blogs from './components/Blogs';
import { initializeBlogs } from './reducers/blogs.reducer';
import { initialLogin } from './reducers/user.reducer';


const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initialLogin());
  }, [dispatch]);

  return (
    <>
      <Notification />
      {user ?
        <Blogs /> :
        <Login />
      }

    </>
  );
};

export default App;
