import React from "react";
import { Container } from "react-bootstrap";
import { NavBar } from "./components";
import { ContextProvider } from "./context/context-provider";
import "./App.css";
import { AppRoutes } from "./Routes/AppRoutes";

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
