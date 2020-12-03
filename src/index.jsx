import React from "react";
import ReactDOM from "react-dom";

import {createAPI} from "./components/api.js";

import App from "./components/app.jsx";

const onBadRequest = (err) => {
  // eslint-disable-next-line no-console
  console.log(err);
};
const onUnauthorized = (status) => {
  // eslint-disable-next-line no-console
  console.log(status);
};
const api = createAPI(onUnauthorized, onBadRequest);

ReactDOM.render(
    <App />,
    document.querySelector(`#root`)
);


