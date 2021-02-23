import React from "react"
import { TodoListItem } from "components"
import { List, ListItem } from "components/elements"
import PropTypes from "prop-types"

const TodoList = ({ data = [] }) => {
  return (
    <List data-test="todoListComponent">
      {data.length > 0 ? (
        data.map((todo) => <TodoListItem key={todo.id} {...todo} />)
      ) : (
        <ListItem data-test="componentEmpty">할 일을 등록해주세요</ListItem>
      )}
    </List>
  )
}

TodoList.propTypes = {
  data: PropTypes.array,
}

// TodoList.propTypes = {
//   data: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number,
//       text: PropTypes.string,
//       completed: PropTypes.bool,
//       createDate: PropTypes.string,
//     })
//   ),
// }

export default TodoList
