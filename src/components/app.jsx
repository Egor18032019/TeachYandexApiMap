import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";

import Main from "./main.jsx";
import Footer from "./footer.jsx";
import {ActionCreator} from "./data-reducer.js";
import {getTown} from "./selectors.js";

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderApp() {

    return (
      <main>
        <Main
        />
        <Footer />
      </main>
    );
  }


  render() {
    const {town, handlerClickOnChoise} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/property">
            <Main
              handlerClickOnChoise={handlerClickOnChoise}
              town={town}
            />
          </Route>
          <Route exact path="/login">

          </Route>
        </Switch>
      </BrowserRouter >
    );
  }
}


App.propTypes = {
};

export default App;
