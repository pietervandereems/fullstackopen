const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    default:
      return state;
  }
};

let notificationTimer;

export const setNotification = (notification, sec = 5) => async dispatch => {
  if (notificationTimer) {
    clearTimeout(notificationTimer);
  }
  dispatch({
    type: 'SET_NOTIFICATION',
    notification
  });
  notificationTimer = setTimeout(() => dispatch({
    type: 'SET_NOTIFICATION',
    notification: ''
  }), sec * 1000);
};


export default reducer;
