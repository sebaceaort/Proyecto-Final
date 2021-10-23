import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { UserContext } from "../context/user-context";
import { AddUser, agregarEje, UsersDisabled } from "../views";
import { MunicipioRoutes } from "./MunicipioRoutes";
import { PrivateAdminRoutes } from "./PrivateAdminRoutes";

export const LoggedRoutes = () => {
  const { user } = useContext(UserContext);

  return (
    <Switch>
      <PrivateAdminRoutes
        rol={user?.usRole}
        path="/load-indicators"
        component={agregarEje}
      />
      <PrivateAdminRoutes
        rol={user?.usRole}
        path="/AddUser"
        component={AddUser}
      />
      <PrivateAdminRoutes
        rol={user?.usRole}
        path="/UsersDisabled"
        component={UsersDisabled}
      />
      <Route path="/" component={MunicipioRoutes} />
    </Switch>
  );
};
