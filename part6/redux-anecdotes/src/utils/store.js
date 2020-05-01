import { createStore, combineReducers } from 'redux';
import anecdotes from '../reducers/anecdoteReducer';
import notification from '../reducers/notificationReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
  anecdotes,
  notification
});

const store = createStore(reducer, composeWithDevTools());

export default store;
