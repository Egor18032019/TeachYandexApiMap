import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MapYandex from "./map.jsx";
import AdFrom from "./ad-form.jsx";

class WithMapForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      town: `Москва`,
    };
    this.onChangeTown = this.onChangeTown.bind(this);
  }
  onChangeTown(value) {
    this.setState({town: value});
    console.log(this.state);
  }

  render() {
    const {town} = this.state;

    return (
      <div className="map-list__element">
        <MapYandex
          city={town}
          onChangeTown={this.onChangeTown}
        />

        < AdFrom
          town={town}
          onChangeTown={this.onChangeTown}
        />
      </div>
    );
  }
}


WithMapForm.propTypes = {


};

export default WithMapForm;
