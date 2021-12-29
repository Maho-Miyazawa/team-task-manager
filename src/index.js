import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";

import store from "./store/store";
import { Provider } from "react-redux";

const redirectUri = `${window.location.origin}/signup`;

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH_DOMAIN}
      clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
      redirectUri={redirectUri}
    >
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
