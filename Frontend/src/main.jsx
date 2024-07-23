import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store}   from "./Store/index.jsx";
import {persistor}  from "./Store/index.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from 'react-redux';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
