import { combineReducers } from "redux"
import byId, * as fromById from "./byId"
import createList, * as fromList from "./createList"

const listByFilter = combineReducers({
  all: createList("all"),
  active: createList("active"),
  completed: createList("completed"),
})

const todos = combineReducers({
  byId,
  listByFilter,
})

export default todos

export const getVisibleTodos = ({ todos }, filter) => {
  const ids = fromList.getIds(todos.listByFilter[filter])
  return ids.map((id) => fromById.getTodo(todos.byId, id))
}

export const getIsFetching = ({ todos }, filter) =>
  fromList.getIsFetching(todos.listByFilter[filter])

export const getErrorMessage = ({ todos }, filter) =>
  fromList.getErrorMessage(todos.listByFilter[filter])
