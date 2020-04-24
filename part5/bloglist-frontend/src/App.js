import React, { useState } from 'react';
import Notification from './components/Notification';
import Login from './components/Login';
import Blogs from './components/Blogs';


const App = () => {
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({});

  const sendNotification = (note = { txt: '', full: '', isError: false }) => {
    setNotification(note);
    setTimeout(() => setNotification({ txt: '' }), note.full ? 10000 : 5000);
  };



  return (
    <>
      <Notification notification={notification} />
      {user ? <Blogs user={user} /> : <Login sendNotification={sendNotification} setUser={setUser} />}

    </>
  );
};

export default App;
