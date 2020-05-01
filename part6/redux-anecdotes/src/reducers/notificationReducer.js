const reducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFY':
      return action.notification;
    default: return state;
  }
};

export const notify = (notification) => ({
  type: 'NOTIFY',
  notification
});

export default reducer;
