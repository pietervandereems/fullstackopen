const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    default:
      return state;
  }
};

export const setNotification = (notification) => ({
  type: 'SET_NOTIFICATION',
  notification
});

export const removeNotification = () => ({
  type: 'SET_NOTIFICATION',
  notification: ''
});

export default reducer;
