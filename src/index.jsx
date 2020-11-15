import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {compose} from "recompose";
import thunk from "redux-thunk";
import {Provider} from "react-redux";

import {createAPI} from "./components/api.js";
import combineReducers from "./components/combineReducer.js";
import {
  ActionCreator, Operation as UserOperation
} from "./components/user-reducer.ts";
import {setIdDataLoaded} from "./components/data-reducer.js";
import App from "./components/app.jsx";

const onBadRequest = (err) => {
  store.dispatch(setIdDataLoaded(false, err));
};
const onUnauthorized = (status) => {
  store.dispatch(ActionCreator.setAuthStatus(status));
};
const api = createAPI(onUnauthorized, onBadRequest);

const store = createStore(combineReducers, compose(
    applyMiddleware(thunk.withExtraArgument(api)),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
));

store.dispatch(UserOperation.checkStatusAuth());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);


