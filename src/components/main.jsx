import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import Count from "./count-map-list.jsx";

class Main extends PureComponent {

  constructor(props) {
    super(props);
  }


  render() {
    const {town, handlerClickOnChoise} = this.props;
    console.log(town + `main`);

    return (
      <div className="main">
        <Count
          handlerClickOnChoise={handlerClickOnChoise}
          town={town} />

      </div>

    );
  }
}
Main.propTypes = {
  town: PropTypes.string.isRequired,
  handlerClickOnChoise: PropTypes.func.isRequired,
};
export default Main;
