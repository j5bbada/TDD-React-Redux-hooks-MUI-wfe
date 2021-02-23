import React from "react"
import { Route, Switch } from "react-router-dom"
import { AboutPage, TodosPage, LoginPage, NoMatchPage } from "pages"

const Routes = () => {
  const todosRoute = ({ match }) => (
    <React.Fragment>
      <Route exact path={match.url} component={TodosPage} />
      <Route exact path={match.url + "/:filter"} component={TodosPage} />
    </React.Fragment>
  )

  return (
    <Switch>
      <Route exact path="/" component={AboutPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/todos" component={todosRoute} />
      <Route path="/login" component={LoginPage} />
      <Route component={NoMatchPage} />
    </Switch>
  )
}

export default Routes
