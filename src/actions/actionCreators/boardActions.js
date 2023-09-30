import axios from 'axios'
import * as ACTIONS from '../types'

const BASE_URL = '/api/boards/'

export const fetchAllBoards = (token) => (dispatch) => {
  dispatch({ type: ACTIONS.MAKE_REQUEST_BOARD })
  axios
    .get(BASE_URL, {
      headers: { 'x-auth-token': token },
    })
    .then((res) => {
      dispatch({ type: ACTIONS.GET_BOARDS, payload: { boards: res.data } })
    })
    .catch((e) => {
      dispatch({ type: ACTIONS.ERROR_BOARD, payload: { error: e } })
    })
}

export const fetchBoardById = (id, token) => (dispatch) => {
  dispatch({ type: ACTIONS.MAKE_REQUEST_BOARD })
  axios
    .get(BASE_URL + id, {
      headers: { 'x-auth-token': token },
    })
    .then((res) => {
      dispatch({
        type: ACTIONS.GET_BOARD_BY_ID,
        payload: { currBoard: res.data },
      })
    })
    .catch((e) => {
      console.log(e)
      // dispatch({ type: ACTIONS.ERROR_BOARD, payload: { error: e } })
    })
}

export const createNewBoard = (params, token) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.POST_REQUEST_BOARD })

    const res = await axios.post(BASE_URL, params, {
      headers: { 'x-auth-token': token },
    })

    dispatch({ type: ACTIONS.ADD_BOARD, payload: { board: res.data } })

    return res.data
  } catch (e) {
    if (e.message === 'Network Error')
      dispatch({ type: ACTIONS.ERROR_BOARD, payload: { error: e } })
    else if (e.response.status === 422)
      dispatch({ type: ACTIONS.VALIDATION_ERROR_BOARD })
  }
}

export const updateBoardById = (id, params, token) => (dispatch) => {
  dispatch({ type: ACTIONS.MAKE_REQUEST_BOARD })
  axios
    .patch(BASE_URL + id, params, {
      headers: { 'x-auth-token': token },
    })
    .then((res) => {
      dispatch({
        type: ACTIONS.UPDATE_BOARD_PATCH,
        payload: { board: res.data },
      })
    })
    .catch((e) => {
      dispatch({ type: ACTIONS.ERROR_BOARD, payload: { error: e.message } })
    })
}

export const updateBoardByIdPut = (id, params, token) => async (dispatch) => {
  try {
    const res = await axios.put(BASE_URL + id, params, {
      headers: { 'x-auth-token': token },
    })

    return res.data
  } catch (e) {
    dispatch({ type: ACTIONS.ERROR_BOARD, payload: { error: e.message } })
  }
}

export const updateBoard = (id, params, token) => async (dispatch) => {
  try {
    const res = await axios.put(BASE_URL + 'updateBoard/' + id, params, {
      headers: { 'x-auth-token': token },
    })

    return res.data
  } catch (e) {
    dispatch({ type: ACTIONS.ERROR_BOARD, payload: { error: e.message } })
  }
}

export const removeBoardAccess = (id, params, token) => async (dispatch) => {
  try {
    const res = await axios.put(BASE_URL + 'removeAccess/' + id, params, {
      headers: { 'x-auth-token': token },
    })

    return res.data
  } catch (e) {
    dispatch({ type: ACTIONS.ERROR_BOARD, payload: { error: e.message } })
  }
}

export const deleteBoardById = (id, token) => async (dispatch) => {
  try {
    const res = await axios.delete(BASE_URL + id, {
      headers: { 'x-auth-token': token },
    })

    dispatch({ type: ACTIONS.DELETE_BOARD, payload: { board: res.data.board } })

    return res.data
  } catch (e) {
    dispatch({ type: ACTIONS.ERROR_BOARD, payload: { error: e.message } })
  }
}

export const fetchListsFromBoard = (id, token) => (dispatch) => {
  dispatch({ type: ACTIONS.MAKE_REQUEST_LIST })
  axios
    .get(`${BASE_URL + id}/lists`, {
      headers: { 'x-auth-token': token },
    })
    .then((res) => {
      dispatch({ type: ACTIONS.GET_LISTS, payload: { lists: res.data } })
    })
    .catch((e) => {
      dispatch({ type: ACTIONS.ERROR_LIST, payload: { error: e } })
    })
}

export const fetchCardsFromBoard = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.MAKE_REQUEST_CARD })

    const res = await axios.get(`${BASE_URL + id}/cards`, {
      headers: { 'x-auth-token': token },
    })

    dispatch({ type: ACTIONS.GET_CARDS, payload: { cards: res.data } })

    return res.data
  } catch (e) {
    dispatch({ type: ACTIONS.ERROR_CARD, payload: { error: e.message } })
  }
}

export const fetchActivitiesFromBoard =
  (id, token, last, limit) => (dispatch) => {
    let params = ''
    if (last) params += `&last=${last}`
    if (limit) params += `&limit=${limit || 10}`
    axios
      .get(`${BASE_URL + id}/activities?${params}`, {
        headers: { 'x-auth-token': token },
      })
      .then((res) => {
        dispatch({
          type: ACTIONS.GET_ACTIVITIES,
          payload: {
            activities: res.data,
            hasMore: res.headers['x-has-more'] === 'true',
            add: !!last,
          },
        })
      })
      .catch((e) => {
        dispatch({ type: ACTIONS.ERROR_ACTIVITY, payload: { error: e } })
      })
  }
