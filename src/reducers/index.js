import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import todos from "./todos"

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    todos,
  })

export default rootReducer
