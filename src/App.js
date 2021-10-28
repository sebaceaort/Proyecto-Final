import React from "react";
import { Container } from "react-bootstrap";
import { NavBar } from "./components";
import { ContextProvider } from "./context/context-provider";
import { AppRoutes } from "./Routes/AppRoutes";
import "./App.css";
import "./scss/_bstheme.scss"

const App = () => {
  return (
    <ContextProvider>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <AppRoutes/>
        </Container>
      </div>
    </ContextProvider>
  );
};

export default App;
