import React from 'react';

const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }

  const errorStyle = {
    color: 'darkgreen',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  return (
    <div style={errorStyle}>
      {notification}
    </div>
  );

};

export default Notification;