import * as ACTIONS from '../actions/types';

const initialState = {
  admin: {},
  token: undefined,
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_ADMIN:
      return {
        ...state,
        admin: action.payload.admin,
        token: action.payload.token,
      };
    case ACTIONS.GET_SINGLE_ADMIN:
      return {
        ...state,
        admin: action.payload.admin,
        token: action.payload.token,
      };
    case ACTIONS.ADMIN_LOGIN:
      return {
        ...state,
        admin: action.payload.admin,
        token: action.payload.token,
      };
    case ACTIONS.UPDATE_ADMIN:
      return {
        ...state,
        admin: action.payload.admin,
        token: action.payload.token,
      };
    case ACTIONS.UPDATE_ADMIN_PASSWORD:
      return {
        ...state,
        admin: action.payload.admin,
        token: action.payload.token,
      };
    case ACTIONS.SAVE_TOKEN:
      return {
        ...state,
        token: action.payload.token,
      };
    default:
      return state;
  }
};
