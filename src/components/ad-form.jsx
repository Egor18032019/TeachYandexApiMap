import React, {useState, useRef, useEffect, useMemo} from "react";
import PropTypes from "prop-types";

const AdFrom = (props) => {
  const {handlerClickOnChoise, town} = props;
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const cityRef = useRef(``);
  const [title, setTitleRef] = useState(town);
  const [city, setCityRef] = useState(town);

  console.log(town + `Adform`);

  useEffect(() => {
    handlerClickOnChoise(city);
  }, [city]);

  return (
    <form className={`ad-form`} method="post" encType="multipart/form-data"
      action="https://js.dump.academy/keksobooking" autoComplete="off" ref={formRef}>

      <fieldset className="ad-form__element ad-form__element--wide">
        <label className="ad-form__label" htmlFor="title">Описание</label>
        <input id="title" name="title" type="text" maxLength={100} minLength={1} required
          placeholder="Примерное описание" ref={titleRef} value={`${title}`} onChange={(evt) => {
            setTitleRef(evt.target.value);
          }} />
      </fieldset>
      <fieldset className="ad-form__element">
        <label className="ad-form__label" htmlFor="City">Город</label>
        <select id="type" name="type" value={town}
          onChange={() => {
            setCityRef(cityRef.current.value);
            setTitleRef(cityRef.current.value);
          }}
          ref={cityRef} onClick={() => {
            setCityRef(cityRef.current.value);
          }}>
          <option value="Москва">Москва</option>
          <option value="Saint-Petersburg">Saint-Petersburg</option>
          <option value="Екатеринбург">Екатеринбург</option>
        </select>
      </fieldset>
      <fieldset className="ad-form__element ad-form__element--submit">
        <button className="ad-form__reset" type="reset">очистить</button>
      </fieldset>
    </form>
  );
};

AdFrom.propTypes = {
  handlerClickOnChoise: PropTypes.func.isRequired,
  town: PropTypes.string.isRequired,
};

export default AdFrom;
