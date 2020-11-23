import React, {useState, useCallback} from "react";
import PropTypes from "prop-types";
import MapFormList from "./map-form-list.jsx";

const Count = (props) => {
  const {town, handlerClickOnChoise} = props;

  const [colored, setColored] = useState(false);
  const [count, setCount] = useState(1);

  const styles = {
    color: colored ? `darkred` : `black`,
  };

  const generateItemFromAPI = useCallback(
      (start) => {
        console.log(`generateItemFromAPI: `);

        return new Array(count)
        .fill(``)
        .map((_, index) => `Карта номер: ${start + index}`);
      },
      [count]
  );

  return (
    <>
      <h1 style={styles}>Количество элементов: {count}</h1>
      <button
        className={`btn btn-success`}
        onClick={() => setCount((prev) => prev + 1)}
      >
        Add
      </button>
      <button
        className={`btn btn-warning`}
        onClick={() => setColored((prev) => !prev)}
      >
        Change styles
      </button>

      <MapFormList
        handlerClickOnChoise={handlerClickOnChoise}
        town={town}
        getItems={generateItemFromAPI}
      />
    </>
  );
};

Count.propTypes = {
  town: PropTypes.string.isRequired,
  handlerClickOnChoise: PropTypes.func.isRequired,
};

export default Count;
