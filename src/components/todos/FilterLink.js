import React from "react"
import { Link } from "react-router-dom"
import { Button } from "components/elements"

const FilterLink = ({ filter, active, children }) => {
  return (
    <Button
      component={Link}
      to={filter === "all" ? "/todos/all" : "/todos/" + filter}
      disabled={!!active}
    >
      {children}
    </Button>
  )
}

export default FilterLink
