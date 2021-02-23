import React from "react"
import { LinearProgress as MuiLinearProgress } from "@material-ui/core"
const LinearProgress = props => {
  return <MuiLinearProgress {...props} style={{ height: 1 }} />
}

export default LinearProgress
