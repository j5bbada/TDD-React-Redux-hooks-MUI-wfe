import React, { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { TodoList, FetchError } from "components"
import { LinearProgress } from "components/elements"
import { getVisibleTodos, getIsFetching, getErrorMessage } from "reducers/todos"
import { fetchTodos } from "actions/todos"

function useLoading(filter) {
  const dispatch = useDispatch()
  const data = useSelector((state) => getVisibleTodos(state, filter), [filter])
  const isFetching = useSelector((state) => getIsFetching(state, filter), [filter])
  const errorMessage = useSelector((state) => getErrorMessage(state, filter), [filter])
  const handleFetch = useCallback(() => dispatch(fetchTodos(filter)), [dispatch, filter])

  useEffect(() => {
    dispatch(fetchTodos(filter))
  }, [dispatch, filter])

  return {
    data,
    isFetching,
    errorMessage,
    onFetch: handleFetch,
  }
}

const VisibleTodoList = () => {
  const params = useParams()
  const filter = params.filter || "all"
  const { data, isFetching, errorMessage, onFetch } = useLoading(filter)

  if (isFetching && !data.length) {
    return <LinearProgress />
  }

  if (errorMessage && !data.length) {
    return <FetchError message={errorMessage} onRetry={onFetch} />
  }

  return <TodoList data={data} />
}

export default VisibleTodoList
