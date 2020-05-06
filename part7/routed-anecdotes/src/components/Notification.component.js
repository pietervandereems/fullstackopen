import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ notification }) => {

  if (!notification) {
    return null;
  }

  const style = {
    border: 'solid',
    padding: 5,
    borderWidth: 1
  };

  return (
    <div style={style}>
      {notification}
    </div>
  );
};

Notification.propTypes = {
  notification: PropTypes.string
};

export default Notification;
