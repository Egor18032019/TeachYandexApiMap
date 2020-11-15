import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import MapYandex from "./map.jsx";

class Main extends PureComponent {

  constructor(props) {
    super(props);
    this.textRef = createRef();
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    console.log(this.textRef.current.value);
  }

  render() {
    const {} = this.props;
    return (
      <div className="description ">
        <MapYandex />

      </div>

    );
  }
}
Main.propTypes = {

};
export default Main;
