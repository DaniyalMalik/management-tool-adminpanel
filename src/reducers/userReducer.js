import * as ACTIONS from '../actions/types';

const initialState = {
  user: {},
  todayUsers: [],
  users: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_USERS:
      return {
        ...state,
        users: action.payload.users,
      };
    case ACTIONS.GET_TODAYS_USERS:
      return {
        ...state,
        todayUsers: action.payload.users,
      };
    case ACTIONS.GET_USERS_BY_EMPLOY_ID:
      return {
        ...state,
        users: action.payload.users,
      };
    case ACTIONS.GET_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    case ACTIONS.DELETE_USER:
      return {
        ...state,
        users: state.users.filter(
          (user) => user._id !== action.payload.user._id,
        ),
      };
    case ACTIONS.UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload.user._id ? action.payload.user : user,
        ),
        user: action.payload.user.user,
      };
    case ACTIONS.UPDATE_USER_PASSWORD:
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
};
