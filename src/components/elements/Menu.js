import React from "react"
import { Menu as MuiMenu } from "@material-ui/core"

const Menu = React.forwardRef((props, ref) => {
  return <MuiMenu ref={ref} {...props} />
})

export default Menu
