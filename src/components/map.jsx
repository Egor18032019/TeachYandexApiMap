import React, {useState, useRef, useEffect, useCallback} from "react";

import {useContextMap} from "./town-provider.tsx";


import {
  YMaps, Map, SearchControl, Placemark, ListBox, ListBoxItem, ObjectManager, GeoObject,
  Button, ZoomControl, RouteEditor, Modal, RouteButton,
} from "react-yandex-maps";
import POINTS from './points';

import data from './data.js';
import cities from './cities.js';

let interval = null;
const error = `img/avatars/user02.png`;

function MapYandex() {
  const {town, endPointRoute, setTown, setLength, setTime} = useContextMap(); // тащит данные из контекста
  const searchRef = useRef(null);
  const [text, setText] = useState(null);
  const [city, setCity] = useState(town);
  const [show, setShow] = useState(true);
  const [noFlash, setNoFlash] = useState(null);
  const [flash, setflash] = useState(true);
  const getTown = cities.find((item) => {
    return item.data.content === city;
  });
  const mapState = {center: getTown.coords, zoom: getTown.zoom};
  const [state, setState] = useState(mapState);
  const [ymaps, setYmaps] = useState({});
  const [map, setMap] = useState(null);

  const [defaultRoute, setdefaultRoute] = useState(null);
  const [clickRoute, setClickRoute] = useState(null);
  const [userRoute, setUserRoute] = useState(null);
  const [p, setP] = useState(null);


  const computed = useCallback(() => setTown(city), [city]);
  useEffect(() => {
    console.log(`handleApiAvaliable0`);
    _handleApiAvaliable(ymaps, map);
  }, [map]);

  useEffect(() => {
    _handleApiAvaliable();
    setCity(town);
  }, [town]);
  useEffect(() => {
    _handleApiAvaliable(ymaps, map);
    computed(city);
    console.log(`handleApiAvaliable1`);
    if (clickRoute) {
      map.geoObjects.remove(clickRoute);
    }
  }, [city]);
  useEffect(() => {
    _handleApiAvaliable();
    setState(mapState);
  }, [city]);
  /**
   * при клике изменяет state - даёт город и координты города для отрисовки
   * @param {array} el обьект с данными
   */
  const onItemClick = (el) => {
    setState({center: el.coords, zoom: el.zoom});
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

  const _handleApiAvaliable = (ymapsInst, mapInst) => {
    if (ymapsInst && mapInst) {
      const balloonContentBodyLayout = ymapsInst.templateLayoutFactory.createClass(
          `<div style = {color:"orange" }>"Gde eto ??"</div>`
      );
      ymapsInst
        .route(
            [
              city, // откуда
              // {type: `viaPoint`, point: [56.800584, 60.675637]}, // заехать
              endPointRoute, // куда
            // {type: `wayPoint`, point: [56.716733, 60.589989]}// куда
            ],
            {balloonContentBodyLayout}

        )
        .then((newRoute) => {
          mapInst.geoObjects.remove(defaultRoute);
          setdefaultRoute(newRoute);
          const lengthRoute = Math.floor(newRoute.getLength() / 1000) + ` км`;
          setLength(lengthRoute);
          const timeRoute = Math.floor(newRoute.getJamsTime() / 3600) + ` часов`;
          setTime(timeRoute);
          const balloonContentLayout = ymapsInst.templateLayoutFactory.createClass(
              `<span class="map-asd"> Расстояние: ` + `Почему не отрисовываеться?` + `.</span><br/>`);
          newRoute.getPaths().options.set({
            // в балуне выводим только информацию о времени движения с учетом пробок = сделал как в примере но неработает
            balloonContentBodyLayout: balloonContentLayout,
            // можно выставить настройки графики маршруту
            strokeColor: `#000`,
            opacity: 0.9,
            mapStateAutoApply: true,
            avoidTrafficJams: true,
          });
          // добавляем маршрут на карту
          mapInst.geoObjects.add(newRoute);
        });
    }
  };

  const addRoute = (ymapsInst, mapInst) => {
    if (ymapsInst && mapInst) {
      const arrayPoint = POINTS[city].map((i) => {
        return i.coords;
      });
      ymapsInst.route(
          arrayPoint
          , {
            multiRoute: true
          })
        .then((routeNew) => {
          mapInst.geoObjects.remove(clickRoute);
          setClickRoute(routeNew);
          mapInst.geoObjects.add(routeNew);// добавляем этот маршурт на карту
        });
    }
  };

  return (
    <div className="Map">
      <YMaps
        query={{
          apikey: `8520df8a-dfd5-4276-af26-f0b4ed98dd6e`,
        }}
        onApiAvaliable={() => {
          console.log(`onApiAvaliable`);
        }}
      >
        <div id="map-basics">
          {show &&
            <Map
              state={state}
              width={500}
              height={460}
              instanceRef={(ref) => {

                setMap(ref);
                console.log(`instanceRef`);
              }}

              onLoad={(ymapsNew) => {
                setYmaps(ymapsNew);
                console.log(`onLoad`);
              }}

              onClick={(e) => {
                let coords = e.get(`coords`);
                console.log(coords);
              }}
              modules={[`templateLayoutFactory`, `layout.ImageWithContent`, `route`]}
            >
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
              <ZoomControl />
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
                features={data[city]}
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
                    balloonContent: `Белое всплывающие окошко с описанием которое почему то не отображаеться если есть ниже следующие`,
                    balloonContentHeader: `<strong>Какой то заголовок</strong>`,
                    balloonContentBody: `Содержимое <em>балуна</em>`,
                    balloonContentFooter: `<p><strong>Веб-сайт:</strong> <a rel="nofollow" href="#" target="_blank">перейти</a></p>`
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
                coordinates: [POINTS[city][0].coords, POINTS[city][1].coords],
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
                }} />
              {/* Выбор города */}
              <ListBox data={{content: `${city}       `}}// хз почему но без пробелов не меняет город
                options={{float: `left`}}>
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
                data={{content: `Не мигающая кнопка`}}
                options={{size: `large`, maxWidth: `200px`}}
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
                options={{maxWidth: [28, 150, 178]}}
                instanceRef={onFlashRef}
              />
              <RouteButton
                data={{
                  image: error,
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
        <button onClick={() => addRoute(ymaps, map)}>Show route</button>
        {/* To destroy it, just unmount component */}
        <button onClick={() => setShow(!show)}>
          {show ? `Delete map` : `Show map`}
        </button>
      </YMaps>
    </div >
  );
}

export default MapYandex;

