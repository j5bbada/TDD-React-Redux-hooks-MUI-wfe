import React from "react"
import { AppBar, Toolbar, Typography, makeStyles } from "components/elements"
import PropTypes from "prop-types"

const useStyles = makeStyles((theme) => ({
  subtitle: {
    flexGrow: 1,
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(6),
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${theme.drawerWidth}px)`,
    },
  },
  toolbar: theme.mixins.toolbar,
}))

const Header = ({ title = "pageTitle", leftMenu = undefined, rightMenu = undefined }) => {
  const classes = useStyles()
  return (
    <AppBar position="fixed" className={classes.appBar} data-test="headerComponent">
      <Toolbar>
        {leftMenu && <div data-test="componentLeftMenu">{leftMenu}</div>}
        <Typography variant="h6" noWrap className={classes.subtitle} data-test="componentTitle">
          {title}
        </Typography>
        {rightMenu && <div data-test="componentRightMenu">{rightMenu}</div>}
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  title: PropTypes.string,
  leftMenu: PropTypes.node,
  rightMenu: PropTypes.node,
}

export default Header
// export default React.memo(Header)
