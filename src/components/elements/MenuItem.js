import React from "react"
import { MenuItem as MuiMenuItem } from "@material-ui/core"

const MenuItem = React.forwardRef((props, ref) => {
  return <MuiMenuItem ref={ref} {...props} />
})

export default MenuItem
