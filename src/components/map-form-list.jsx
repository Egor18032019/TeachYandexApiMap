import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import WithMapForm from "./whit-map-form.jsx";

const MapFormList = (props) => {
  const {getItems} = props;

  const [items, setItems] = useState([]);
  useEffect(() => {
    const newItems = getItems(1);
    setItems(newItems);
  }, [getItems]);

  return (
    <div className={`description`}>
      {items.map((i, index) => (

        <div key={i} className={`map${index + 1} `}>
          {i}
          <WithMapForm />
        </div>

      ))}

    </div>
  );

};
MapFormList.propTypes = {
  getItems: PropTypes.func.isRequired,
};

export default MapFormList;
