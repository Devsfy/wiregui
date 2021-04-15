import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import NewConnection from "../pages/NewConnection";
import ConnectionInfo from "../pages/ConnectionInfo";

const Routes = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/new-connection" component={NewConnection} />
      <Route path="/connection/:name" component={ConnectionInfo} />
    </Switch>
  </HashRouter>
);

export default Routes;
