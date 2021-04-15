import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import NewConnection from "../pages/NewConnection";

const Routes = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/new-connection" component={NewConnection} />
    </Switch>
  </HashRouter>
);

export default Routes;
