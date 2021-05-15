import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import NewTunnel from "../pages/NewTunnel";
import TunnelInfo from "../pages/TunnelInfo";

const Routes = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/new-tunnel" component={NewTunnel} />
      <Route path="/tunnel/:name" component={TunnelInfo} />
    </Switch>
  </HashRouter>
);

export default Routes;
