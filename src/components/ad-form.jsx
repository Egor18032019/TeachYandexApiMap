import React, {useState, useRef, useEffect, useCallback} from "react";

import {useContextMap} from "./town-provider.tsx";

const AdFrom = () => {
  const {town, length, time, endPointRoute, setTown} = useContextMap();
  const formRef = useRef(null);
  const cityRef = useRef(``);
  const [city, setCityRef] = useState(town);
  const computed = useCallback(() => setTown(city), [city]);

  useEffect(() => {
    console.log(`computed AdFrom`);
    computed(city);
  }, [city]);
  useEffect(() => {
    console.log(`setCityRef AdFrom`);
    setCityRef(town);
  }, [town]);

  return (
    <form className={`ad-form`} method="post" encType="multipart/form-data"
      action="https://js.dump" autoComplete="off" ref={formRef}>

      <fieldset className="ad-form__element ad-form__element--wide">
        <p>{`Маршурт от города ${city} до города ${endPointRoute}`}</p>
      </fieldset>
      <fieldset className="ad-form__element">
        <label className="ad-form__label" htmlFor="City">Город: </label>
        <select id="type" name="type" value={town}
          onChange={() => {
            setCityRef(cityRef.current.value);
          }}
          ref={cityRef}
          // onClick={() => {
          //   setCityRef(cityRef.current.value); // если тут не прописанть онклик то менять не будет приклике
          // }}
        >
          <option value="Москва">Москва</option>
          <option value="Saint-Petersburg">Saint-Petersburg</option>
          <option value="Екатеринбург">Екатеринбург</option>
        </select>
      </fieldset>
      <fieldset className="ad-form__element ad-form__element--submit">
        <p>Дистанция маршрута {length}</p>
        <p>Длительность маршрута {time}</p>
      </fieldset>
    </form>
  );
};

export default AdFrom;
