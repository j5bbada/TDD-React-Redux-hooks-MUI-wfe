import React from "react"
import { Provider } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import Routes from "routes"
import { GlobalThemeProvider } from "components"

const Root = ({ store, history }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <GlobalThemeProvider>
          <Routes />
        </GlobalThemeProvider>
      </ConnectedRouter>
    </Provider>
  )
}

export default Root
