import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import MapYandex from "./map.jsx";
import AdFrom from "./ad-form.jsx";

const MapFormList = (props) => {
  const {town, handlerClickOnChoise, getItems} = props;

  const [items, setItems] = useState([]);
  useEffect(() => {
    const newItems = getItems(1);
    setItems(newItems);
    console.log(`render: ` + items);
    console.log(newItems);
  }, [getItems]);
  console.log(`render: ` + items);

  return (
    <div className={`description`}>
      {items.map((i, index) => (

        <div key={i} className={`map${index + 1} `}>
          {i}
          <MapYandex
            city={town}
            handlerClickOnChoise={handlerClickOnChoise} />
          <AdFrom
            handlerClickOnChoise={handlerClickOnChoise}
            town={town}
          />
        </div>

      ))}

    </div>
  );

};
MapFormList.propTypes = {
  handlerClickOnChoise: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
  town: PropTypes.string.isRequired,
};

export default MapFormList;
