import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";

import Main from "./main.jsx";
import Footer from "./footer.jsx";

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


App.propTypes = {
};

export default App;
