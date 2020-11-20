import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import MapYandex from "./map.jsx";
import AdFrom from "./ad-form.jsx";

class Main extends PureComponent {

  constructor(props) {
    super(props);
  }


  render() {
    const {town, handlerClickOnChoise} = this.props;
    console.log(town + `main`);

    return (
      <div className="description ">
        <MapYandex
          city={town}
          handlerClickOnChoise={handlerClickOnChoise} />
        <AdFrom
          handlerClickOnChoise={handlerClickOnChoise}
          town={town}
        />
      </div>

    );
  }
}
Main.propTypes = {
  town: PropTypes.string.isRequired,
  handlerClickOnChoise: PropTypes.func.isRequired,
};
export default Main;
