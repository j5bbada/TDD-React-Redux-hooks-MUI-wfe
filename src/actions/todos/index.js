import { normalize } from "normalizr"
import { todoApi } from "apis"
import * as schema from "../schema"
import { getIsFetching } from "reducers/todos"
export const FETCH_TODOS_REQUEST = "todos/FETCH_TODOS_REQUEST"
export const FETCH_TODOS_SUCCESS = "todos/FETCH_TODOS_SUCCESS"
export const FETCH_TODOS_FAILURE = "todos/FETCH_TODOS_FAILURE"
export const TOGGLE_TODO_SUCCESS = "todos/TOGGLE_TODO_SUCCESS"
export const ADD_TODO_SUCCESS = "todos/ADD_TODO_SUCCESS"
export const REMOVE_TODO_SUCCESS = "todos/REMOVE_TODO_SUCCESS"

export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve()
  }

  dispatch(request())

  return todoApi
    .fetchTodos(filter)
    .then((response) => dispatch(success(response)))
    .catch((err) => dispatch(failure(err)))

  function request() {
    return {
      type: FETCH_TODOS_REQUEST,
      filter,
    }
  }

  function success(response) {
    return {
      type: FETCH_TODOS_SUCCESS,
      filter,
      response: normalize(response, schema.arrayOfTodo),
    }
  }

  function failure(error) {
    return {
      type: FETCH_TODOS_FAILURE,
      filter,
      message: error ? error.message : "Something went wrong.",
    }
  }
}

export const toggleTodo = (id) => (dispatch) =>
  todoApi.toggleTodo(id).then((response) =>
    dispatch({
      type: TOGGLE_TODO_SUCCESS,
      id,
      response: normalize(response, schema.todo),
    })
  )

export const addTodo = (text) => (dispatch) =>
  todoApi.addTodo(text).then((response) =>
    dispatch({
      type: ADD_TODO_SUCCESS,
      text,
      response: normalize(response, schema.todo),
    })
  )

export const removeTodo = (id) => (dispatch) =>
  todoApi.removeTodo(id).then((response) =>
    dispatch({
      type: REMOVE_TODO_SUCCESS,
      id,
      response: normalize(response, schema.todo),
    })
  )
