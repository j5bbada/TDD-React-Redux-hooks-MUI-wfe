import React from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Hidden,
  useTheme,
  makeStyles,
} from "components/elements"
import { Menu as MenuIcon, Close as CloseIcon } from "@material-ui/icons"
import { Nav } from "components"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(6),
    },
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: theme.drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 2200,
    marginTop: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
    display: (mobileOpen) => (mobileOpen ? "none" : ""),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: theme.drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: "auto",
    marginLeft: 0,
  },
}))

const DefaultLayout = ({ children }) => {
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const classes = useStyles(mobileOpen)
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Responsive drawer + Global Header
          </Typography>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
              <CloseIcon />
            </IconButton>
            <Nav />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            <Nav />
          </Drawer>
        </Hidden>
      </nav>
      <div className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </div>
    </div>
  )
}

export default DefaultLayout
