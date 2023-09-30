import axios from 'axios';
import * as ACTIONS from '../types';

const BASE_URL = '/api/tasks/';

export const createNewTask = (params, token) => async (dispatch) => {
  try {
    const res = await axios.post(BASE_URL, params, {
      headers: { 'x-auth-token': token },
    });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const updateTaskById = (id, data, token) => async (dispatch) => {
  try {
    const res = await axios.put(BASE_URL + id, data, {
      headers: { 'x-auth-token': token },
    });

    // dispatch({ type: ACTIONS.UPDATE_TASK, payload: { task: res.data } })

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteTaskById = (id, token) => (dispatch) => {
  axios
    .delete(BASE_URL + id, {
      headers: { 'x-auth-token': token },
    })
    .then((res) => {
      dispatch({ type: ACTIONS.DELETE_TASK, payload: { task: res.data } });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getTasksByCardId = (cardId, token) => async (dispatch) => {
  try {
    const res = await axios.get(BASE_URL + 'byCardId/' + cardId, {
      headers: { 'x-auth-token': token },
    });

    dispatch({
      type: ACTIONS.GET_TASKS_BY_CARD_ID,
      payload: { tasks: res.data },
    });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getTasksByUserId = (token) => async (dispatch) => {
  try {
    const res = await axios.get(BASE_URL + 'byUserId', {
      headers: { 'x-auth-token': token },
    });

    dispatch({
      type: ACTIONS.GET_TASK_BY_COMPANY_ID,
      payload: { tasks: res.data },
    });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getTaskById = (id, token) => (dispatch) => {
  axios
    .get(BASE_URL + id, {
      headers: { 'x-auth-token': token },
    })
    .then((res) => {
      dispatch({ type: ACTIONS.GET_TASK_BY_ID, payload: { task: res.data } });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getTasks = (dispatch, token) => {
  axios
    .get(BASE_URL, {
      headers: { 'x-auth-token': token },
    })
    .then((res) => {
      dispatch({ type: ACTIONS.GET_TASKS, payload: { tasks: res.data } });
    })
    .catch((e) => {
      console.log(e);
    });
};
