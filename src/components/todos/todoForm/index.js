import React, { useCallback, useState } from "react"
import { TextField, Button, makeStyles } from "components/elements"
import PropTypes from "prop-types"

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
  },
  button: {
    margin: theme.spacing(2),
    marginRight: 0,
    whiteSpace: "nowrap",
  },
}))

export const useTodoForm = (props) => {
  const { title = undefined, onSubmit } = props
  const isUpdateMode = !!title
  const [value, setValue] = useState(isUpdateMode ? title : "")
  const handleChange = useCallback(({ target: { value } }) => {
    setValue(value)
  }, [])
  const isDisabled = value.trim().length <= 0

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()
      const title = value && value.trim()
      if (!title) return
      onSubmit(title)
      setValue("")
    },
    [onSubmit, value]
  )

  return {
    isUpdateMode,
    isDisabled,
    value,
    handleChange,
    handleSubmit,
  }
}

const TodoForm = (props) => {
  const classes = useStyles()
  const { isUpdateMode, isDisabled, value, handleChange, handleSubmit } = useTodoForm(props)

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className={classes.form}
      data-test="todoFormComponent"
    >
      <TextField
        onChange={handleChange}
        id="todo-title"
        name="todo-title"
        label="TODO"
        value={value}
        placeholder="오늘의 할 일 적어보기"
        helperText="하루치 분량으로 쪼개어 기입해주세요"
        fullWidth
        margin="normal"
        variant="filled"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button
        disabled={isDisabled}
        variant="contained"
        color="primary"
        className={classes.button}
        type="submit"
      >
        {isUpdateMode ? "Update" : "Add"} Todo
      </Button>
    </form>
  )
}

TodoForm.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
}

export default TodoForm
