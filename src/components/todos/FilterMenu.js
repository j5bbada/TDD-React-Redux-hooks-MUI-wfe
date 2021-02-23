import React from "react"
import { FilterLink } from "components"
import { ButtonGroup } from "components/elements"
import { useParams } from "react-router-dom"

const FilterMenu = () => {
  const params = useParams()
  const filter = params.filter || "all"
  return (
    <ButtonGroup fullWidth variant="outlined" size="small">
      <FilterLink filter="all" active={filter === "all"}>
        All
      </FilterLink>
      <FilterLink filter="active" active={filter === "active"}>
        Active
      </FilterLink>
      <FilterLink filter="completed" active={filter === "completed"}>
        Completed
      </FilterLink>
    </ButtonGroup>
  )
}

export default FilterMenu
