import React, {useState, useRef, useEffect} from "react";
import {
  YMaps, Map, SearchControl, Placemark, ListBox, ListBoxItem, ObjectManager, GeoObject,
  Button, Circle, RouteEditor, RouteButton, Polyline, Rectangle, Polygon
} from "react-yandex-maps";
import POINTS from './points';

import data from './data.js';

// const myIcon = `img/avatars/user02.png`;,
const defaultTown = `Moscow`;
const mapState = {center: [55.750625, 37.626], zoom: 7};
const cities = [
  {
    data: {content: `Moscow`},
    options: {selectOnClick: false},
    coords: [55.753559, 37.609218],
  },
  {
    data: {content: `Saint-Petersburg`},
    options: {selectOnClick: false},
    coords: [59.93863, 30.31413],
  },
  {
    data: {content: `Ekaterinburg`},
    options: {selectOnClick: false},
    coords: [56.50, 60.35],
  },
];

let interval = null;
const error = `img/avatars/user02.png`;

function MapYandex() {
  const [text, setText] = useState(null);
  const [state, setState] = useState(mapState);
  const [town, setTown] = useState(defaultTown);
  const [show, setShow] = useState(true);
  const [noFlash, setNoFlash] = useState(null);
  const [flash, setflash] = useState(true);
  const [ymaps, setYmaps] = useState(null);
  const [bounds, setBounds] = useState(null);
  const routes = useRef();
  const mapRef = useRef(null);
  const searchRef = useRef(null);

  /**
   * при клике изменяет state - даёт город и координты города для отрисовки
   * @param {array} city массив с данными
   */
  const onItemClick = (city) => {
    setState({center: city.coords, zoom: 7});
    setTown(city.data.content);
    console.log(state);
  };
  const onButtonClick = () => {
    setNoFlash(`Press не мигающую кнопку`);
    console.log(noFlash);
  };
  const onFlashButtonClick = () => {
    setflash(!flash);
    console.log(flash);
  };
  useEffect(() => {
    console.log(` Я слежу за noFlash`);
  }, [noFlash]);

  useEffect(() => {
    console.log(`Я слежу жа flashing button`);
  }, [flash]);

  const onFlashRef = (ref) => {
    if (ref !== null) {
      interval = setInterval(() => {
        switch (ref.options.get(`size`)) {
          case `small`:
            ref.options.set(`size`, `medium`);
            break;
          case `medium`:
            ref.options.set(`size`, `large`);
            break;
          case `large`:
          default:
            ref.options.set(`size`, `small`);
            break;
        }
      }, 5000);
    } else {
      clearInterval(interval);
    }
  };
  const getRoute = () => {
    console.log(RouteButton);
    console.log(state);

  };

  const getState = () => {
    return state;
  };

  return (
    <div className="Map">
      <YMaps
        enterprise
        query={{
          apikey: `8520df8a-dfd5-4276-af26-f0b4ed98dd6e`,
        }}>
        <div id="map-basics">
          {show &&
            <Map
              width={500}
              height={500}
              modules={[
                `geocode`,
              ]}
              onLoad={// Теперь вы можете использовать обратный вызов события onLoad для компонентов, чтобы получить доступ к экземпляру ymaps.
                (ymaps) => console.log(ymaps)
              }
              state={state}
            >
              {/* строка поиска */}
              <SearchControl
                instanceRef={(ref) => {
                  if (ref) {
                    searchRef.current = ref;
                  }
                }}
                options={{
                  // float: `right`,
                  provider: `yandex#search`,
                  size: `large`
                }}
              />
              {/* кластер точек */}
              <ObjectManager
                options={{
                  clusterize: true,
                  gridSize: 32,
                }}
                objects={{
                  preset: `islands#redDotIcon`,
                }}
                clusters={{
                  preset: `islands#greenClusterIcons`,
                }}
                features={data.features}
              />
              {/* Координаты точек которые отрисовываем(сделать для каждого города свои) */}
              {POINTS[town].map((point, index) => (
                <Placemark
                  key={index}
                  geometry={point.coords}
                  properties={{
                    iconContent: point.iconContent,
                    hintContent: point.hintContent,
                    balloonContent: `Белое всплывающие окошко с описанием`
                  }}
                  onClick={() => setText(`Test ${index}`)}
                  options={{
                    // The placemark's icon will stretch to fit its contents.
                    preset: `islands#blackStretchyIcon`,
                    // // The placemark can be moved.
                    // draggable: true,
                    // // Если нужна другая картинка метки
                    // // Options. You must specify this type of layout.
                    // iconLayout: `default#image`,
                    // // Custom image for the placemark icon.
                    // iconImageHref: myIcon,
                    // // The size of the placemark.
                    // iconImageSize: [30, 42],
                    // // The offset of the upper left corner of the icon relative
                    // // to its "tail" (the anchor point).
                    // iconImageOffset: [-3, -42],
                  }}
                />
              ))}

              {/* Describing the geometry of the geo object. */}
              <GeoObject geometry={{
                // The "Polyline" geometry type.
                type: `LineString`,
                // Specifying the coordinates of the vertices of the polyline.
                coordinates: [[55.8, 37.5], [55.7, 37.4]],
              }}
              // Defining properties of the geo object.
              properties={{
                // The contents of the hint.
                hintContent: `Я геообъект`,
                // The contents of the balloon.
                balloonContent: `Меня можно перетащить. Если получиться`,
              }}
              // Setting the geo object options.
              options={{
                // Enabling drag-n-drop for the polyline.
                draggable: true,
                // The line color.
                strokeColor: `#FFFF00`,
                // Line width.
                strokeWidth: 5,
              }}
              />

              {/* <RouteEditor /> */}
              {/* Выбор города */}
              <ListBox data={{content: `Choose city`}}
                options={{float: `left`}}>
                {cities.map((city) =>
                  <ListBoxItem
                    data={city.data}
                    options={city.options}
                    onClick={() => onItemClick(city)}
                    key={city.data.content}
                  />
                )}
              </ListBox>
              {/* мигающая кнопка */}

              <Button
                data={{content: `Не мигающая кнопка`}}
                options={{size: `large`, maxWidth: `200px`}}
                onClick={() => onButtonClick()}
              />

              <Button
                data={{
                  // Setting the text and icon for a button.
                  content: `Adaptive button`,
                  // The icon is 16x16 pixels.
                  image: error,
                }}
                onClick={() => onFlashButtonClick()}
                /**
           * Because the button changes depending on the size of the map, we will give it
           * three different maxWidth values in the array.
           */
                options={{maxWidth: [28, 150, 178]}}
                instanceRef={onFlashRef}
              />
              <RouteButton
                data={{
                  arguments: `true`,
                  content: `FF`,
                  name: `aaa`
                }}
              />
            </Map>
          } </div>
        <button onClick={() => getRoute()}>Show route</button>
        {/* To destroy it, just unmount component */}
        <button onClick={() => setShow(!show)}>
          {show ? `Delete map` : `Show map`}
        </button>
      </YMaps>
    </div >
  );
}

export default MapYandex;

