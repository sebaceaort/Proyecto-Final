import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { UserContext } from "../context/user-context";
import { Profile } from "../views";
import { AdminEntitiesScreen } from "../views/AdminScreens/AdminEntitiesScreen";
import Historical from "../views/MunicipioScreens/historical";
import DoughnutChart from "../components/graph";
import { UpdateProvider } from "../context/update-provider";
import { PrivateMunicipioRoutes } from "./PrivateMunicipioRoutes";
import { MunicipioEntitiesScreen } from "../views/MunicipioScreens/MunicipioEntitiesScreen";
import { PrivateAdminRoutes } from "./PrivateAdminRoutes";
export const MunicipioRoutes = () => {
  const { user } = useContext(UserContext);
  return (
    <Switch>
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/show-graph" component={DoughnutChart} />
      <PrivateMunicipioRoutes
        rol={user?.usRole}
        path="/show-historical"
        component={Historical}
      />
      <PrivateMunicipioRoutes
        rol={user?.usRole}
        path="/show-graph"
        component={Historical}
      />
      <UpdateProvider>
        <PrivateMunicipioRoutes
          rol={user?.usRole}
          path="/muni-data"
          component={MunicipioEntitiesScreen}
        />
        <PrivateAdminRoutes
          rol={user?.usRole}
          exact
          path="/show-data"
          component={AdminEntitiesScreen}
        />
      </UpdateProvider>
    </Switch>
  );
};
