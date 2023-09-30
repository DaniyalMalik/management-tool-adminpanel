import axios from 'axios';
import * as ACTIONS from '../types';

const BASE_URL = '/api/user/';

export const getSingleUser = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.SAVE_TOKEN, payload: { token } });

    const res = await axios.get(BASE_URL + id, {
      headers: { 'x-auth-token': token },
    });

    dispatch({
      type: ACTIONS.GET_USER,
      payload: { user: res.data.user },
    });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const registerUser = (params) => async (dispatch) => {
  try {
    const res = await axios.post(`${BASE_URL}register`, params);

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getAllUsers = (token) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.SAVE_TOKEN, payload: { token } });

    const res = await axios.get(BASE_URL + 'users', {
      headers: { 'x-auth-token': token },
    });

    dispatch({
      type: ACTIONS.GET_USERS,
      payload: { users: res.data.users },
    });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getTodaysUsers = (date, token) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.SAVE_TOKEN, payload: { token } });

    const res = await axios.get(BASE_URL + `today/?date=${date}`, {
      headers: { 'x-auth-token': token },
    });

    dispatch({
      type: ACTIONS.GET_TODAYS_USERS,
      payload: { users: res.data.users },
    });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getAllUsersByEmployId = (employId, token) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.SAVE_TOKEN, payload: { token } });

    const res = await axios.get(
      BASE_URL + `getbyemployid?employId=${employId}`,
      {
        headers: { 'x-auth-token': token },
      },
    );

    dispatch({
      type: ACTIONS.GET_USERS_BY_EMPLOY_ID,
      payload: { users: res.data.users },
    });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteUser = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.SAVE_TOKEN, payload: { token } });

    const res = await axios.delete(BASE_URL + id, {
      headers: { 'x-auth-token': token },
    });

    dispatch({
      type: ACTIONS.DELETE_USER,
      payload: { user: res.data.user },
    });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const updateUser = (id, data, token) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.SAVE_TOKEN, payload: { token } });

    const res = await axios.put(BASE_URL + id, data, {
      headers: { 'x-auth-token': token },
    });

    dispatch({
      type: ACTIONS.UPDATE_USER,
      payload: { user: res.data },
    });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const updateUserPassword = (id, data, token) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.SAVE_TOKEN, payload: { token } });

    const res = await axios.put(BASE_URL + 'updatePassword/' + id, data, {
      headers: { 'x-auth-token': token },
    });

    dispatch({
      type: ACTIONS.UPDATE_USER_PASSWORD,
      payload: { user: res.data.user },
    });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const forgotPasswordAction = (data) => async (dispatch) => {
  try {
    const res = await axios.post(BASE_URL + 'forgotPassword', data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const resetPasswordAction =
  (data, forgotPasswordToken) => async (dispatch) => {
    try {
      const res = await axios.put(
        BASE_URL + 'resetPassword/' + forgotPasswordToken,
        data,
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
