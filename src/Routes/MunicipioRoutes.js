import React from "react";
import { Route, Switch } from "react-router-dom";
import { Profile } from "../views";
import { AdminEntitiesScreen } from "../views/AdminEntitiesScreen";
import Historical from "../views/MunicipioScreens/historical";
import DoughnutChart from "../components/graph";
import { UpdateProvider } from "../context/update-provider";
export const MunicipioRoutes = () => {
  return (
    <Switch>
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/show-graph" component={DoughnutChart} />
      <Route exact path="/show-historical" component={Historical} />
      <UpdateProvider>
        <Route path="/show-data" component={AdminEntitiesScreen} />
      </UpdateProvider>
    </Switch>
  );
};
