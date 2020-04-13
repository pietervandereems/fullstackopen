import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ notification: { txt, full, isError } }) => {
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
      {full ? <p>{full}</p> : null}
    </div>
  );

};

Notification.propTypes = {
  notification: {
    txt: PropTypes.string,
    full: PropTypes.string,
    isError: PropTypes.bool
  }
};

export default Notification;
