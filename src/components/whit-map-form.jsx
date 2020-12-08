import React, {PureComponent} from "react";
import MapYandex from "./map.jsx";
// import MapYandex from "./draft.jsx";
import AdFrom from "./ad-form.jsx";
import {TownProvider} from "./town-provider.tsx";

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
  }

  render() {
    const {town} = this.state;

    return (
      <div className="map-list__element">
        <TownProvider>
          <MapYandex
            city={town}
            onChangeTown={this.onChangeTown}
          />
          < AdFrom
            town={town}
            onChangeTown={this.onChangeTown}
          />
        </TownProvider>
      </div>
    );
  }
}

export default WithMapForm;
