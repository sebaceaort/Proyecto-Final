import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { UserContext } from "../context/user-context";
import { Home } from "../views";
import { LoggedRoutes } from "./LoggedRoutes";

export const AppRoutes = () => {
  const { user } = useContext(UserContext);

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <PrivateRoute
        isAutenticated={user ? true : false}
        path="/"
        component={LoggedRoutes}
      />
    </Switch>
  );
};
