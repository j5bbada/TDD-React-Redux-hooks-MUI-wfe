import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { addTodo } from "actions/todos"
import { TodoForm } from "components"

export const useAddTodoForm = (dispatch) => {
  const handleSubmit = useCallback(
    (value) => {
      if (!value) return
      return dispatch(addTodo(value))
    },
    [dispatch]
  )
  return {
    handleSubmit,
  }
}

const AddTodoForm = () => {
  const dispatch = useDispatch()
  const { handleSubmit } = useAddTodoForm(dispatch)
  return <TodoForm onSubmit={handleSubmit} />
}

export default AddTodoForm
