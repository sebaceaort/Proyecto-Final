import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import Auth0ProviderWithHistory from "./auth0-provider";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
require("dotenv").config();




ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Auth0ProviderWithHistory> */}
        <App />
      {/* </Auth0ProviderWithHistory> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

if (process.env.NODE_ENV === 'development') {
  serviceWorkerRegistration.unregister()
} else {
  serviceWorkerRegistration.register();
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
