import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateMunicipioRoutes = ({ rol, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={
        (props) =>
          rol !== "admin" ? 
          <Component {...props} /> 
          :
           <Redirect to="/" /> //Hacer patalla de login para mandarlos ahi
      }
    />
  );
};
