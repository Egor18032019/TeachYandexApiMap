import React, {PureComponent} from "react";

import Count from "./count-map-list.jsx";

class Main extends PureComponent {

  constructor(props) {
    super(props);
  }


  render() {

    return (
      <div className="main">
        <Count />
      </div>

    );
  }
}

export default Main;
