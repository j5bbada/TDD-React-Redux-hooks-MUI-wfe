import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from "components/elements"
import { removeTodo, toggleTodo } from "actions/todos"
import DeleteIcon from "@material-ui/icons/Delete"

const TodoListItem = ({ id, completed, text }) => {
  const dispatch = useDispatch()
  const handleTggle = useCallback(() => dispatch(toggleTodo(id)), [dispatch, id])
  const handleRemove = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      dispatch(removeTodo(id))
    },
    [dispatch, id]
  )
  return (
    <ListItem
      onClick={handleTggle}
      style={{
        textDecoration: completed ? "line-through" : "none",
      }}
    >
      <ListItemIcon>
        <Checkbox edge="start" checked={completed} tabIndex={-1} disableRipple />
      </ListItemIcon>
      <ListItemText>{text}</ListItemText>
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={handleRemove}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default TodoListItem
