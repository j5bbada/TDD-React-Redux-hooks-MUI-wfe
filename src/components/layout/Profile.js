import React, { useRef, useCallback } from "react"
import {
  IconButton,
  Avatar,
  Typography,
  Badge,
  CircularProgress,
  Fab,
  Grow,
  Chip,
  makeStyles,
  withStyles,
} from "components/elements"
import { ChangeThemeBtn, Logo } from "components"
import { Person as PersonIcon } from "@material-ui/icons"
import { version } from "../../../package.json"
import { useHistory } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    height: 144,
    backgroundColor: theme.palette.background.paper,
    overflow: "hidden",
  },
  logo: {
    position: "absolute",
    top: -50,
    left: -80,
    opacity: 0.5,
  },
  container: {
    display: "flex",
    position: "absolute",
    bottom: 45,
    left: 55,
  },
  fab: {
    marginRight: 10,
  },
  title: {
    padding: 10,
    paddingLeft: 20,
    fontSize: 20,
    textShadow: `2px 2px 2px ${theme.palette.background.paper}`,
  },
  ver: {
    paddingTop: 7,
    fontSize: 14,
  },
  iconButton: {
    position: "absolute",
    bottom: 24,
    right: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    color: "#fff",
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
  },
  name: {
    paddingTop: theme.spacing(1),
    display: "block",
  },
  env: { marginLeft: 7 },
  alpha: {
    position: "absolute",
    top: 7,
    // right: 10,
    padding: 0,
    marginLeft: 7,
    textShadow: `none`,
  },
  profile: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    fontSize: 14,
    color: "#000",
    background: "rgba(255, 255, 255, 0.5)",
    boxShadow: theme.shadows[1],
    // textShadow: "1px 1px 1px #eee"
  },
  circularProgress: {
    position: "absolute",
    bottom: 1,
    right: -2,
    width: 22,
    height: 22,
    zIndex: 12,
  },
}))

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: 9,
    top: 48,
    border: `1px solid ${theme.palette.secondary.light}`,
    boxShadow: theme.shadows[2],
    padding: "0 2px",
  },
}))(Badge)

const Profile = ({
  displayName = "nick.name(로그인)/corp",
  name = "nick.name",
  profileImage,
  notiCount = 0,
}) => {
  const classes = useStyles()
  const history = useHistory()
  const imgEl = useRef(null)
  const [checked, setChecked] = React.useState(false)
  const koreanName = displayName && displayName.split("(")[1].split(")")[0]
  const handleChange = useCallback(() => {
    setChecked((prev) => !prev)
  }, [])
  const handleGoProfile = useCallback(() => {
    history.push("/my/profile")
  }, [history])

  const hasNoti = notiCount > 0
  const env = process.env.REACT_APP_ENV || "local"
  const projectInfo = (
    <Typography variant="h1" noWrap className={classes.title}>
      <strong>Device</strong>Farm
      <Chip
        size="small"
        label="βeta"
        clickable
        variant="outlined"
        color="secondary"
        className={classes.alpha}
      />
      <div className={classes.ver}>
        <small>v{version}</small>
        <small className={classes.env}>{env}</small>
      </div>
    </Typography>
  )
  const profileBtn = (
    <React.Fragment>
      <IconButton className={classes.iconButton} onClick={handleChange}>
        <StyledBadge badgeContent={hasNoti ? notiCount : null} color="secondary">
          <Avatar className={classes.avatar}>
            {profileImage ? (
              <img
                src={profileImage}
                ref={imgEl}
                alt=""
                width="100%"
                height="100%"
                onError={() => (imgEl.current.src = "/favicon.ico")}
              />
            ) : (
              displayName.toUpperCase().charAt(0)
            )}
          </Avatar>
          {hasNoti && (
            <CircularProgress
              color="secondary"
              className={classes.circularProgress}
              style={{ width: 22, height: 22 }}
            />
          )}
        </StyledBadge>
      </IconButton>
      <div className={classes.container}>
        <Grow
          in={checked}
          style={{ transformOrigin: "0 0 0" }}
          {...(checked ? { timeout: 500 } : {})}
        >
          <Fab size="small" className={classes.fab} onClick={handleGoProfile}>
            <PersonIcon />
          </Fab>
        </Grow>
        <Grow in={checked}>
          <Fab size="small" className={classes.fab}>
            <ChangeThemeBtn />
          </Fab>
        </Grow>
      </div>
    </React.Fragment>
  )
  const profileInfo = (
    <React.Fragment>
      <strong className={classes.name}>{koreanName}</strong>
      <small>{name}@nexample.com</small>
    </React.Fragment>
  )
  return (
    <div className={classes.root}>
      <div className={classes.logo}>
        <Logo />
      </div>
      {projectInfo}
      <div className={classes.profile}>
        {profileBtn}
        {profileInfo}
      </div>
    </div>
  )
}

export default Profile
