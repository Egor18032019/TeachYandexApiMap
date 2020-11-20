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
    const {town, handlerClickOnChoise} = this.props;
    console.log(town);

    return (
      <main>
        <Main
          handlerClickOnChoise={handlerClickOnChoise}
          town={town}
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

const mapDispatchToProps = (dispatch) => ({
  handlerClickOnChoise(town) {
    dispatch(ActionCreator.setTown(town));
  },
});

const mapStateToProps = (store) => {
  return {
    town: getTown(store),

  };
};

App.propTypes = {
  handlerClickOnChoise: PropTypes.func.isRequired,
  town: PropTypes.string.isRequired
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App); // первым стате а вторым диспатчеры
