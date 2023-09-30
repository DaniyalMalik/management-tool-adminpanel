import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { boardReducer } from '../reducers/boardReducer';
import { listsReducer } from '../reducers/listsReducer';
import { cardReducer } from '../reducers/cardReducer';
import { taskReducer } from '../reducers/taskReducer';
import { userReducer } from '../reducers/userReducer';
import { adminReducer } from '../reducers/adminReducer';
import { companyReducer } from '../reducers/companyReducer';
import { meetingReducer } from '../reducers/meetingReducer';
import * as ACTIONS from '../actions/types';

const composeEnhancers = composeWithDevTools({});

const appReducer = combineReducers({
  boards: boardReducer,
  lists: listsReducer,
  cards: cardReducer,
  user: userReducer,
  admin: adminReducer,
  tasks: taskReducer,
  companies: companyReducer,
  meetings: meetingReducer,
});

const rootReducer = (state, action) => {
  if (action.type === ACTIONS.LOGOUT_USER) {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }
  return appReducer(state, action);
};

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);
