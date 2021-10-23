import React from "react";
import { Route, Switch } from "react-router-dom";
import { Indicators, Profile } from "../views";
import { PruebasScreen } from "../views/PruebasScreen";

export const MunicipioRoutes = () => {
  return (
    <Switch>
      <Route path="/profile" component={Profile} />
      <Route path="/load-data" component={Indicators} />
      <Route path="/show-data" component={PruebasScreen} />
    </Switch>
  );
};
