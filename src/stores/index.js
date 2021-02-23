import { createStore, applyMiddleware } from "redux"
import ReduxThunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { createBrowserHistory } from "history"
import { routerMiddleware } from "connected-react-router"
import rootReducer from "reducers"

export const history = createBrowserHistory()
const middleWares = [routerMiddleware(history), ReduxThunk]
const configureStore = () => {
  const store = createStore(
    rootReducer(history),
    composeWithDevTools(applyMiddleware(...middleWares))
  )
  return store
}

export default configureStore
