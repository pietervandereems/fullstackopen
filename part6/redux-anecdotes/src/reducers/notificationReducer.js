const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    default:
      return state;
  }
};


export const setNotification = (notification, sec = 5) => async dispatch => {
  dispatch({
    type: 'SET_NOTIFICATION',
    notification
  });
  setTimeout(() => dispatch({
    type: 'SET_NOTIFICATION',
    notification: ''
  }), sec * 1000);
};


export default reducer;
