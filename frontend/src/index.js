import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import {thunk} from "redux-thunk";
import {GoogleOAuthProvider} from '@react-oauth/google'

import './index.css'
import reducers from './store/reducers'

const store = createStore(reducers, compose(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
  <Provider store={store}>
    <App />
  </Provider>
  </GoogleOAuthProvider>
);
