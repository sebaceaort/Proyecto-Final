import React from "react";
//import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { NavBar } from "./components";
//import { Home, Profile, Indicators, AddUser, UsersDisabled } from "./views";
import { ContextProvider } from "./context/context-provider";
//import { PruebasScreen } from "./views/PruebasScreen";
//import agregarEje from "./views/AdminScreens/agregarEje"
//import NewIndicator from "./components/newIndicator";
import "./App.css";
import { AppRoutes } from "./Routes/AppRoutes";

const App = () => {
  return (
    <ContextProvider>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <AppRoutes/>
          {/* <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/load-data" component={Indicators} />
            <Route path="/show-data" component={PruebasScreen} />
            <Route path="/load-indicators" component={agregarEje} />
            <Route path="/newIndicator" component={NewIndicator} />
            <Route path="/AddUser" component={AddUser} />
            <Route path="/UsersDisabled" component={UsersDisabled} />
        </Switch> */}
        </Container>
      </div>
    </ContextProvider>
  );
};

export default App;
