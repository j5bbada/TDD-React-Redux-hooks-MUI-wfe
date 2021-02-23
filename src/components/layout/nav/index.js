import React from "react"
import { List, ListItem, ListItemIcon, ListItemText } from "components/elements"
import {
  Dashboard as DashboardIcon,
  List as ListIcon,
  Lock as LockIcon,
  LockOpen as LockOpenIcon,
} from "@material-ui/icons"
import { Link } from "react-router-dom"

const initNav = [
  { title: "About", to: "/about", icon: <DashboardIcon /> },
  { title: "Todos", to: "/todos", icon: <ListIcon /> },
  { title: "Login", to: "/login", icon: <LockIcon /> },
]

const Nav = () => {
  return (
    <List className="navComponent" data-test="navComponent">
      {initNav.map((item) => (
        <ListItem button key={item.title} component={Link} to={item.to}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItem>
      ))}
      <ListItem button key="Logout">
        <ListItemIcon>
          <LockOpenIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  )
}

export default Nav
