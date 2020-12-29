import React from "react";
import MapYandex from "./map.jsx";
// import MapYandex from "./draft.jsx";
import AdFrom from "./ad-form.jsx";
import {TownProvider} from "./town-provider.tsx";

const WithMapForm = () => {
  return (
    <div className="map-list__element">
      <TownProvider>
        <MapYandex/>
        < AdFrom/>
      </TownProvider>
    </div>
  );
};

export default WithMapForm;
