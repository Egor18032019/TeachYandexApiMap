import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import WithMapForm from "./whit-map-form.jsx";

const MapFormList = (props) => {
  const {handlerClickOnChoise, getItems} = props;

  const [items, setItems] = useState([]);
  useEffect(() => {
    const newItems = getItems(1);
    setItems(newItems);
    console.log(newItems);
  }, [getItems]);

  return (
    <div className={`description`}>
      {items.map((i, index) => (

        <div key={i} className={`map${index + 1} `}>
          {i}
          <WithMapForm
            handlerClickOnChoise={handlerClickOnChoise} />
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
