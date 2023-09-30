import axios from 'axios';
import * as ACTIONS from '../types';

const BASE_URL = '/api/meetings/';

export const getManyFromMeeting = (userId, token) => async (dispatch) => {
  try {
    const res = await axios.get(BASE_URL + `?userId=${userId}`, {
      headers: { 'x-auth-token': token },
    });

    dispatch({
      type: ACTIONS.GET_MEETINGS,
      payload: { meetings: res.data.meetings },
    });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getSingleFromMeeting = (id, token) => async (dispatch) => {
  try {
    const res = await axios.get(BASE_URL + id, {
      headers: { 'x-auth-token': token },
    });

    dispatch({
      type: ACTIONS.GET_SINGLE_MEETING,
      payload: { meeting: res.data.meeting },
    });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const updateSingleFromMeeting =
  (id, data, token) => async (dispatch) => {
    try {
      const res = await axios.put(BASE_URL + id, data, {
        headers: { 'x-auth-token': token },
      });

      dispatch({
        type: ACTIONS.UPDATE_MEETING,
        payload: { meeting: res.data.meeting },
      });

      return res.data;
    } catch (e) {
      console.log(e);
    }
  };

export const addToMeeting = (data, token) => async (dispatch) => {
  try {
    const res = await axios.post(BASE_URL, data, {
      headers: { 'x-auth-token': token },
    });

    dispatch({
      type: ACTIONS.POST_MEETING,
      payload: { meeting: res.data.meeting },
    });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteFromMeeting = (id, token) => async (dispatch) => {
  try {
    const res = await axios.delete(BASE_URL + id, {
      headers: { 'x-auth-token': token },
    });

    dispatch({
      type: ACTIONS.DELETE_MEETING,
      payload: { meeting: res.data.meeting },
    });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};
