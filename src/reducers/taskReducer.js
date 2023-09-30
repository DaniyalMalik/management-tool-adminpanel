import * as ACTIONS from '../actions/types'

const initialState = {
  tasks: [],
}
export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_TASKS:
      return { ...state, taskLoading: false, tasks: action.payload.tasks }
    case ACTIONS.GET_TASK_BY_COMPANY_ID:
      return { ...state, taskLoading: false, tasks: action.payload.tasks }
    case ACTIONS.GET_TASKS_BY_CARD_ID:
      return { ...state, taskLoading: false, tasks: action.payload.tasks }
    case ACTIONS.UPDATE_TASK: {
      const tasksCopy = [...state.tasks]
      const targetIndex = tasksCopy.findIndex(
        (task) => task._id === action.payload.task._id,
      )
      tasksCopy[targetIndex] = action.payload.task
      return { ...state, tasks: tasksCopy, taskLoading: false }
    }
    case ACTIONS.DELETE_TASK: {
      const taskPrev = [...state.tasks]
      const index = taskPrev.findIndex(
        (task) => task._id === action.payload.task._id,
      )
      taskPrev.splice(index, 1)
      return { ...state, tasks: taskPrev, taskLoading: false }
    }
    default:
      return state
  }
}
