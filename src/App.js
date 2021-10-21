import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { NavBar } from "./components";
import { Home, Profile, Indicators } from "./views";
import { ContextProvider } from "./context-provider";
import { PruebasScreen } from "./views/PruebasScreen";
import agregarEje from "./views/agregarEje"
import "./App.css";

const App = () => {
  return (
    <ContextProvider>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/load-data" component={Indicators} />
            <Route path="/show-data" component={PruebasScreen} />
            <Route path="/load-indicators" component={agregarEje} />
          </Switch>
        </Container>
      </div>
    </ContextProvider>
  );
};

export default App;
