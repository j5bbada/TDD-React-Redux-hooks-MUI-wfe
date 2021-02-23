import React from "react"
import { Typography, Button, makeStyles } from "components/elements"
import { Refresh as RefreshIcon } from "@material-ui/icons"
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(1),
  },
}))
const FetchError = ({ message, onRetry }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Error
      </Typography>
      <Typography variant="body2" gutterBottom>
        Could not fetch data. {message}
      </Typography>
      <Button variant="contained" className={classes.button} type="button" onClick={onRetry}>
        <RefreshIcon className={classes.icon} />
        Retry
      </Button>
    </div>
  )
}

export default FetchError
