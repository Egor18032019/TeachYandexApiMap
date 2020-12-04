import React, { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import { useTown } from "./town-provider.tsx";


import {
  YMaps, Map, SearchControl, Placemark, ListBox, ListBoxItem, ObjectManager, GeoObject,
  Button, Circle, RouteEditor, Modal, RouteButton, MultiRoute, TrafficControl, Polyline, Rectangle, Polygon
} from "react-yandex-maps";
import POINTS from './points';

import data from './data.js';
import cities from './cities.js';

const myIcon = `img/avatars/user02.png`;

let interval = null;
const error = `img/avatars/user02.png`;

function MapYandex() {
  const { town, setTown } = useTown();
  const searchRef = useRef(null);
  const [text, setText] = useState(null);
  const [city, setCity] = useState(town);
  const [show, setShow] = useState(true);
  const [noFlash, setNoFlash] = useState(null);
  const [flash, setflash] = useState(true);
  const [ymaps, setYmaps] = useState(null);
  const [map, setMap] = useState(null);
  const [route, setRoute] = useState(null);
  const [p, setP] = useState(null);

  useEffect(() => {
    setCity(town);
  }, [town]);
  const computed = useCallback(() => setTown(city), [city]);

  useEffect(() => {
    computed(city);
  }, [city]);

  const getTown = cities.find((item) => {
    return item.data.content === city;
  });
  const mapState = { center: getTown.coords, zoom: getTown.zoom };
  const [state, setState] = useState(mapState);

  /**
   * при клике изменяет state - даёт город и координты города для отрисовки
   * @param {array} el обьект с данными
   */
  const onItemClick = (el) => {
    setState({ center: el.coords, zoom: el.zoom });
    setCity(el.data.content);
  };
  const onButtonClick = () => {
    setNoFlash(`Press не мигающую кнопку`);
    console.log(noFlash);
  };
  const onFlashButtonClick = () => {
    setflash(!flash);
  };
  useEffect(() => {
    console.log(` Я слежу за noFlash`);
  }, [noFlash]);

  useEffect(() => {
    console.log(`Я слежу жа flashing button`);
  }, [flash]);

  useEffect(() => {
    setState(mapState);
  }, [city]);

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


  const addRoute = () => {
    console.log(state);
    console.log(searchRef);
    console.log(map);
    console.log(ymaps);
    console.log(searchRef);
  };

  function initMap(ymap, mapRef) {
    if (ymap) {
      setYmaps(ymap);
    }
    if (mapRef) {
      setMap(mapRef);
    }
    if (!ymap || !mapRef) {
      return;
    }
    console.log(`multiRoute`);
    let multiRoute = new ymap.multiRouter.MultiRoute({
      referencePoints: POINTS[city]
    });// Подписка на событие готовности маршрута.
    multiRoute.model.events.add(`requestsuccess`, function () {
      // Получение ссылки на активный маршрут.
      let activeRoute = multiRoute.getActiveRoute();
      // Получение коллекции путей активного маршрута.
      let activeRoutePaths = activeRoute.getPaths();
      // Проход по коллекции путей.
      activeRoutePaths.each(function (path) {
        console.log(`Длина пути: ` + path.properties.get(`distance`).text);
        console.log(`Время прохождения пути: ` + path.properties.get(`duration`).text);
      });
    });
    multiRoute.editor.stop();
    mapRef.geoObjects.add(multiRoute);
  }

  return (
    <div className="Map">
      <YMaps
        query={{
          apikey: `8520df8a-dfd5-4276-af26-f0b4ed98dd6e`,
        }}>
        <div id="map-basics">
          {show &&
            <Map
              state={state}
              width={500}
              height={460}
              instanceRef={(ref) => setMap(ref)}
              onLoad={(ymap) => setYmaps(ymap)}
              modules={[
                `geocode`,
              ]}
              onClick={(e) => {
                let coords = e.get(`coords`);
                console.log(coords);
              }} >
              <div
                open={false}>
                <h2>Карта для тестов</h2>
              </div>
              {/* строка поиска */}
              <SearchControl
                state={`exli tut to tam malo)S`}
                instanceRef={(ref) => {
                  setP(ref);
                }}
                options={{
                  // float: `right`,
                  provider: `yandex#search`,
                  size: `large`
                }}
                onClick={
                  (e) => {
                    console.log(`SearchControl`);
                    console.log(p);
                  }
                } />

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
                onMouseLeave={() => {
                  console.log(`onMouseEnter ObjectManager`);
                }}
              />
              {/* Координаты точек которые отрисовываем(сделать для каждого города свои) */}
              {POINTS[city].map((point, index) => (
                <Placemark
                  key={index}
                  geometry={point.coords}
                  properties={{
                    iconContent: point.iconContent,
                    hintContent: point.hintContent,
                    balloonContent: `Белое всплывающие окошко с описанием`
                  }}
                  onClick={() => setText(`Test ${index}`)}
                  onMouseEnter={() => {
                    console.log(`onMouseEnter`);
                  }}
                  onMouseLeave={() => {
                    console.log(`onMouseEnter`);
                  }}
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

              <RouteEditor
                onClick={() => {
                  console.log(`ddddaaaaa`);
                  initMap(map, null);
                }} />
              {/* Выбор города */}
              <ListBox data={{ content: `${city}       ` }}// хз почему но без пробелов не меняет город
                options={{ float: `left` }}>
                {cities.map((el) =>
                  <ListBoxItem
                    data={el.data}
                    options={el.options}
                    onClick={() => onItemClick(el)}
                    key={el.data.content}
                  />
                )}
              </ListBox>
              {/* мигающая кнопка */}
              <Button
                data={{ content: `Не мигающая кнопка` }}
                options={{ size: `large`, maxWidth: `200px` }}
                onClick={() => onButtonClick()}
              />
              <Button
                data={{
                  // Setting the text and icon for a button.
                  content: `${city} + мигающая кнопка`,
                  // The icon is 16x16 pixels.
                  image: error,
                }}
                onClick={() => onFlashButtonClick()}
                /**
           * Because the button changes depending on the size of the map, we will give it
           * three different maxWidth values in the array.
           */
                options={{ maxWidth: [28, 150, 178] }}
                instanceRef={onFlashRef}
              />
              <RouteButton
                data={{
                  image: myIcon,
                  title: `титул`,
                }}
                options={{
                  adjustMapMargin: true,
                  floatIndex: 100,
                  maxWidth: `55px`,
                  size: `large`,
                  position: {
                    top: `80px`
                  }
                }}
              />

            </Map>
          } </div>
        <button onClick={() => addRoute()}>Show route</button>
        {/* To destroy it, just unmount component */}
        <button onClick={() => setShow(!show)}>
          {show ? `Delete map` : `Show map`}
        </button>
      </YMaps>
    </div >
  );
}
MapYandex.propTypes = {
  city: PropTypes.string.isRequired,
};
export default MapYandex;

