import React from "react";
import { Route, Switch } from "react-router-dom";
import { Profile } from "../views";
import { PruebasScreen } from "../views/PruebasScreen";
import Historical from "../views/MunicipioScreens/historical";
import DoughnutChart from "../components/graph"
export const MunicipioRoutes = () => {
  return (
    <Switch>
      <Route path="/profile" component={Profile} />
      <Route path="/show-data" component={PruebasScreen} />
      <Route path="/show-graph" component={DoughnutChart} />
      <Route path="/show-historical" component={Historical} />
      
    </Switch>
  );
};
