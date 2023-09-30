import axios from 'axios';
import * as ACTIONS from '../types';

const BASE_URL = '/api/admin/';

export const fetchAdminInfo = (token) => async (dispatch) => {
  try {
    const res = await axios.get(BASE_URL, {
      headers: { 'x-auth-token': token },
    });

    dispatch({
      type: ACTIONS.GET_ADMIN,
      payload: { admin: res.data.admin, token },
    });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getSingleAdmin = (id, token) => async (dispatch) => {
  try {
    const res = await axios.get(BASE_URL + id, {
      headers: { 'x-auth-token': token },
    });

    dispatch({
      type: ACTIONS.GET_SINGLE_ADMIN,
      payload: { admin: res.data.admin, token },
    });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const loginAdmin = (params) => async (dispatch) => {
  try {
    const res = await axios.post(`${BASE_URL}login`, params);

    dispatch({
      type: ACTIONS.ADMIN_LOGIN,
      payload: { admin: res.data.admin, token: res.data.token },
    });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const registerAdmin = (params) => async (dispatch) => {
  try {
    const res = await axios.post(`${BASE_URL}register`, params);

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const updateAdmin = (id, data, token) => async (dispatch) => {
  try {
    const res = await axios.put(BASE_URL + id, data, {
      headers: { 'x-auth-token': token },
    });

    dispatch({
      type: ACTIONS.UPDATE_ADMIN,
      payload: { admin: res.data.admin, token },
    });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const updateAdminPassword = (id, data, token) => async (dispatch) => {
  try {
    const res = await axios.put(BASE_URL + 'updatePassword/' + id, data, {
      headers: { 'x-auth-token': token },
    });

    dispatch({
      type: ACTIONS.UPDATE_ADMIN_PASSWORD,
      payload: { admin: res.data.admin, token },
    });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};
