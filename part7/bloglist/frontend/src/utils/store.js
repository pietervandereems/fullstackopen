import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import blogs from '../reducers/blogs.reducer';
import user from '../reducers/user.reducer';
import notification from '../reducers/notification.reducer';

const reducer = combineReducers({
  blogs,
  notification,
  user
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
