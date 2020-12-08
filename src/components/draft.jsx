// import React from "react";
// import {YMaps, Map} from "react-yandex-maps";

// const mapState = {center: [55.76, 37.64], zoom: 9, controls: []};

// class MapYandex extends React.Component {

//   constructor(props) {
//     super(props);
//     this.map = null;
//     this.ymaps = null;
//     this.route = null;
//     this.handleApiAvaliable = this.handleApiAvaliable.bind(this);
//   }


//   handleApiAvaliable(ymaps) {
//     console.log(`handleApiAvaliable`);

//     this.ymaps = ymaps;
//     const balloonContentBodyLayout = this.ymaps.templateLayoutFactory.createClass(
//         `<div>Test</div>`
//     );
//     this.ymaps
//       .route(
//           [
//             `Королев`,
//             {type: `viaPoint`, point: `Мытищи`},
//             `Химки`,
//             {type: `wayPoint`, point: [55.811511, 37.312518]}
//           ],
//           {balloonContentBodyLayout}
//       )
//       .then((route) => {
//         route.getPaths().options.set({
//           // в балуне выводим только информацию о времени движения с учетом пробок
//           // можно выставить настройки графики маршруту
//           strokeColor: `0000ffff`,
//           opacity: 0.9
//         });

//         // добавляем маршрут на карту
//         this.map.geoObjects.add(route);
//       });
//   }

//   addRoute() {
//     if (this.ymaps && this.map) {
//       this.ymaps
//         .route([`Южное Бутово`, `Москва, метро Парк Культуры`], {
//           multiRoute: true
//         })
//         .then((route) => {
//           this.route = route;
//           this.map.geoObjects.add(route);
//         });
//     }
//   }

//   removeRoute() {
//     if (this.map && this.route) {
//       this.map.geoObjects.remove(this.route);
//     }
//   }

//   render() {
//     return (
//       <div className="App">
//         <div className="layer">
//           <YMaps

//             query={{
//               apikey: `8520df8a-dfd5-4276-af26-f0b4ed98dd6e`,
//             }}

//             onApiAvaliable={(ymaps) => {
//               // this.handleApiAvaliable(ymaps);
//               console.log(`handleApiAvaliable`);
//             }}
//           >
//             <Map
//               state={mapState}
//               instanceRef={(ref) => {
//                 this.map = ref;
//                 console.log(`instanceRef`);
//                 console.log(ref);
//               }}
//               height="444px"
//               width="444px"
//               onLoad={(ymapsNew) => {
//                 console.log(`onLoad`);
//                 console.log(ymapsNew);
//                 this.handleApiAvaliable(ymapsNew);
//               }}
//               modules={[`templateLayoutFactory`, `layout.ImageWithContent`, `route`]}
//             />
//           </YMaps>
//           <button onClick={this.addRoute}>Add route draft</button>
//           <button onClick={this.removeRoute}>Delete route draft</button>
//         </div>
//       </div>
//     );
//   }
// }

// export default MapYandex;
