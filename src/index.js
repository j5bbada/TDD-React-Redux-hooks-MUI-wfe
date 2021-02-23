import React from "react"
import ReactDOM from "react-dom"
import reportWebVitals from "./reportWebVitals"
import configureStore, { history } from "stores"
import { Root } from "components"

const store = configureStore()

ReactDOM.render(<Root store={store} history={history} />, document.getElementById("root"))

reportWebVitals()
