import React from "react"
import { FilterMenu, Header, AddTodoForm, VisibleTodoList } from "components"
import { Paper } from "components/elements"

const TodosPage = () => {
  return (
    <>
      <Header title="Todos" />
      <AddTodoForm />
      <FilterMenu />
      <Paper>
        <VisibleTodoList />
      </Paper>
    </>
  )
}

export default TodosPage
