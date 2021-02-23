import { combineReducers } from "redux"
import {
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  TOGGLE_TODO_SUCCESS,
  ADD_TODO_SUCCESS,
  REMOVE_TODO_SUCCESS,
} from "actions/todos"

const filterToArrayById = (obj, predicate) =>
  Object.keys(obj)
    .filter((key) => predicate(obj[key]))
    .map((item) => parseInt(item))

const createList = (filter) => {
  const handleSplit = (state, action) => {
    const all = action.response.entities.todos || []
    const activeIds = filterToArrayById(all, (item) => !item.completed)
    const completedIds = filterToArrayById(all, (item) => item.completed)
    return filter === "active" ? activeIds : completedIds
  }

  // const handleToggle1 = (state, action) => {
  //   const { result: toggledId, entities } = action.response
  //   const { completed } = entities.todos[toggledId]
  //   if (completed && filter === "completed" && !state.includes(action.id))
  //     return [...state, toggledId]
  //   const shouldRemove =
  //     (completed && filter === "active") || (!completed && filter === "completed")
  //   return shouldRemove ? state.filter((id) => id !== toggledId) : state
  // }

  // const handleToggle2 = (state, action) => {
  //   const { result: toggledId, entities } = action.response
  //   const { completed } = entities.todos[toggledId]

  //   if (completed) {
  //     if (filter === "active") return state.filter((id) => id !== toggledId)
  //     else if (filter === "completed" && !state.includes(action.id))
  //       return [...state, toggledId].sort()
  //     else return state
  //   } else {
  //     if (filter === "active" && !state.includes(action.id)) return [...state, toggledId].sort()
  //     else if (filter === "completed") return state.filter((id) => id !== toggledId)
  //     else return state
  //   }
  // }

  // const handleToggle3 = (state, action) => {
  //   const { result: toggledId, entities } = action.response
  //   const { completed } = entities.todos[toggledId]

  //   if ((completed && filter === "active") || (!completed && filter === "completed"))
  //     return state.filter((id) => id !== toggledId)
  //   else if ((filter === "active" || filter === "completed") && !state.includes(action.id))
  //     return [...state, toggledId].sort()
  //   else return state
  // }

  // const handleToggle4 = (state, action) => {
  //   const { result: toggledId, entities } = action.response
  //   const { completed } = entities.todos[toggledId]

  //   if ((completed && filter === "active") || (!completed && filter === "completed"))
  //     return state.filter((id) => id !== toggledId)
  //   else if (filter !== "all" && !state.includes(action.id)) return [...state, toggledId].sort()
  //   else return state
  // }

  const changeCompletedIds = (state, action) => {
    const { result: toggledId, entities } = action.response
    const { completed } = entities.todos[toggledId]

    const shouldRemove =
      (completed && filter === "active") || (!completed && filter === "completed")
    return shouldRemove ? state.filter((id) => id !== toggledId) : state
  }

  const addIds = (state, action) => {
    const { result: toggledId } = action.response
    return [...state, toggledId].sort()
  }
  const removeIds = (state, action) => {
    const removeId = action.response.result
    return state.filter((item) => item !== removeId)
  }

  const handleToggle = (state, action) => {
    return state.includes(action.id) ? changeCompletedIds(state, action) : addIds(state, action)
  }

  const ids = (state = [], action) => {
    switch (action.type) {
      case FETCH_TODOS_SUCCESS:
        return filter === "all" ? action.response.result : handleSplit(state, action)
      case TOGGLE_TODO_SUCCESS:
        return filter === "all" ? state : handleToggle(state, action)
      case ADD_TODO_SUCCESS:
        return filter !== "completed" ? addIds(state, action) : state
      case REMOVE_TODO_SUCCESS:
        return removeIds(state, action)
      default:
        return state
    }
  }

  const isFetching = (state = false, action) => {
    if (filter !== action.filter) {
      return state
    }
    switch (action.type) {
      case FETCH_TODOS_REQUEST:
        return true
      case FETCH_TODOS_SUCCESS:
      case FETCH_TODOS_FAILURE:
        return false
      default:
        return state
    }
  }

  const errorMessage = (state = null, action) => {
    if (filter !== action.filter) {
      return state
    }
    switch (action.type) {
      case FETCH_TODOS_FAILURE:
        return action.message
      case FETCH_TODOS_REQUEST:
      case FETCH_TODOS_SUCCESS:
        return null
      default:
        return state
    }
  }

  return combineReducers({
    ids,
    isFetching,
    errorMessage,
  })
}

export default createList

export const getIds = (state) => state.ids
export const getIsFetching = (state) => state.isFetching
export const getErrorMessage = (state) => state.errorMessage
