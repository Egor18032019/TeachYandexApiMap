const forCompanyFilter = (place, filter) => {
  return place.company === filter.company || filter.company === `any`;
};
const forDepartamensFilter = (place, filter) => {
  return place.departmens === filter.departmens || filter.departmens === `any`;
};
const forOtdelFilter = (place, filter) => {
  return place.otdel === filter.otdel || filter.otdel === `any`;
};
const forGenderFilter = (place, filter) => {
  return place.gender === filter.gender || filter.gender === `any`;
};
const forNotebookFilter = (place, filter) => {
  return place.notebook === filter.notebook || filter.notebook === false;
};
const forApllebookFilter = (place, filter) => {
  return place.apllebook === filter.apllebook || filter.apllebook === false;
};
const forSistemnikFilter = (place, filter) => {
  return place.sistemnik === filter.sistemnik || filter.sistemnik === false;
};
const forTelephoneFilter = (place, filter) => {
  return place.telephone === filter.telephone || filter.telephone === false;
};
const forSpaceFilter = (place, filter) => {
  if (filter.space < 1) {
    return place.titlle === ``;
  } else if (filter.space > 0) {
    return place.titlle.length > 1;
  }
  return place;
};

/**
 * Поиск по ФИО
 * @param {array} places массив с данными
 * @param {string} filter
 * @return {array}
 */
const forTitleFilter = (places, filter) => {
  return places.filter((place) => {
    return place.titlle === filter || filter === false;
  });
};

// TODO: сделать тест на функцию сортировки

/**
 * Функция сортировки
 * @param {*} data массив с данными
 * @param {*} filter массив с фильтрами
 * @return {Array} массив отфильтрованых данных
 */
const onSortPins = (data, filter) => {
  return data.filter((place) => {
    return forCompanyFilter(place, filter) && forDepartamensFilter(place, filter) &&
      forOtdelFilter(place, filter) && forSpaceFilter(place, filter) && forGenderFilter(place, filter) &&
      forNotebookFilter(place, filter) && forApllebookFilter(place, filter) && forSistemnikFilter(place, filter) &&
      forTelephoneFilter(place, filter);
  });
};

const adapter = function (data) {
  let result = [];
  if (data) {
    let dataArray = data.result;
    for (let i = 0; i < dataArray.length; i++) {
      let nextArray = dataArray[i];
      let adapterArray = {
        id: nextArray[0],
        titlle: nextArray[1],
        company: nextArray[2],
        departmens: nextArray[3],
        otdel: nextArray[4],
        gender: nextArray[5],
        coordinateX: nextArray[6],
        coordinateY: nextArray[7],
        avatar: nextArray[8],
        timein: nextArray[9],
        timeout: nextArray[10],
        description: nextArray[11],
        photo: nextArray[12],
        notebook: nextArray[13],
        apllebook: nextArray[14],
        sistemnik: nextArray[15],
        telephone: nextArray[16],
      };
      result.push(adapterArray);
    }
  }
  return result;
};

export {
  onSortPins,
  adapter,
  forTitleFilter
};
