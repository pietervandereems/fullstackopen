import React from 'react';

const Notification = ({ notification: { txt, isError } }) => {
  if (!txt) {
    return null;
  }

  const defaultStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  const errorStyle = {
    ...defaultStyle,
    color: 'red',
  };

  const noteStyle = {
    ...defaultStyle,
    color: 'darkgreen'
  };

  return (
    <div style={isError ? errorStyle : noteStyle}>
      {txt}
    </div>
  );

};

export default Notification;