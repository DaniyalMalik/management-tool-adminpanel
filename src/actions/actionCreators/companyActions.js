import axios from 'axios';
import * as ACTIONS from '../types';

const BASE_URL = '/api/company/';

export const getCompany = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.SAVE_TOKEN, payload: { token } });

    const res = await axios.get(BASE_URL + id, {
      headers: { 'x-auth-token': token },
    });

    dispatch({
      type: ACTIONS.GET_COMPANY,
      payload: { company: res.data.company },
    });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getCompaniesByOwner =
  (companyOwner, token) => async (dispatch) => {
    try {
      dispatch({ type: ACTIONS.SAVE_TOKEN, payload: { token } });

      const res = await axios.get(
        BASE_URL + `companyowner?companyOwner=${companyOwner}`,
        {
          headers: { 'x-auth-token': token },
        },
      );

      dispatch({
        type: ACTIONS.GET_COMPANIES_BY_OWNER,
        payload: { companies: res.data.companies },
      });

      return res.data;
    } catch (e) {
      console.log(e);
    }
  };

export const createCompany = (data, token) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.SAVE_TOKEN, payload: { token } });

    const res = await axios.post(BASE_URL, data, {
      headers: { 'x-auth-token': token },
    });

    dispatch({
      type: ACTIONS.CREATE_COMPANY,
      payload: { company: res.data.company },
    });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getCompanies = (token) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.SAVE_TOKEN, payload: { token } });

    const res = await axios.get(BASE_URL, {
      headers: { 'x-auth-token': token },
    });

    dispatch({
      type: ACTIONS.GET_COMPANIES,
      payload: { companies: res.data.companies },
    });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getTodaysCompanies = (date, token) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.SAVE_TOKEN, payload: { token } });

    const res = await axios.get(BASE_URL + `today/?date=${date}`, {
      headers: { 'x-auth-token': token },
    });

    dispatch({
      type: ACTIONS.GET_TODAYS_COMPANIES,
      payload: { companies: res.data.companies },
    });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteCompany = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.SAVE_TOKEN, payload: { token } });

    const res = await axios.delete(BASE_URL + id, {
      headers: { 'x-auth-token': token },
    });

    dispatch({
      type: ACTIONS.DELETE_COMPANY,
      payload: { company: res.data.company },
    });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const updateCompany = (id, data, token) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.SAVE_TOKEN, payload: { token } });

    const res = await axios.put(BASE_URL + id, data, {
      headers: { 'x-auth-token': token },
    });

    dispatch({
      type: ACTIONS.UPDATE_COMPANY,
      payload: { company: res.data.company },
    });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};
