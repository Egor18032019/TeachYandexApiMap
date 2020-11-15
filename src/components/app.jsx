import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import Main from "./main.jsx";
import Footer from "./footer.jsx";
import {Operation} from "./data-reducer.js";
import {getPlacesNormilse} from "./selectors.js";

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderApp() {
    const { } = this.props;

    return (
      <main>
        <Main

        />
        <Footer />
      </main>
    );
  }


  render() {
    const { } = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/property">
            <Main
            />
          </Route>
          <Route exact path="/login">

          </Route>
        </Switch>
      </BrowserRouter >
    );
  }
}

const mapDispatchToTitle = (dispatch) => ({
  getNewData(newDataObj) {
    dispatch(Operation.postData(newDataObj));
  },
});

const mapStateToProps = (store) => {
  return {
    places: getPlacesNormilse(store),

  };
};

App.propTypes = {

};

export {App};
export default connect(mapStateToProps, mapDispatchToTitle)(App); // первым стате а вторым диспатчеры
