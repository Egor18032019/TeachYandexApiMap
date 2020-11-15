// import {
//   onLoadForm
// } from "../components/backend.js";

// Определяем действия(actions)
const ActionType = {
  NORMILISE_BASA: `NORMILISE_BASA`,
  GET_SERVER_STATUS: `GET_SERVER_STATUS`,
};


// Объект начального состояния(state):
const initialState = {
  page: `mainPage`,
  isDataLoaded: false,
  isDataPost: false,
  placesNormilse: {},
  errorMessage: ``,
};


const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.NORMILISE_BASA:
      return Object.assign({}, state, {
        page: `answerPage`,
        placesNormilse: action.payload,
      });
  }
  return state;
};


const ActionActive = {
  setValidationData: (newDataObj) => ({
    type: ActionType.NORMILISE_BASA, // обязательно поле type
    payload: newDataObj // именовать файл как город ?
  })
};

// запрос на сервер
const Operation = {
  postData: (places) => (dispatch, getState, api) => {
    // TODO подумать о загруки именно по городам- тарифный план более дешевый
    // return api.post(`/russia/${places.id}`, {})
    return api.post(`/check/`, {
      places
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch(Operation.loadData(places));
          // тут добавить отображение ошибок или если все хорошо
        }
      })
      .catch((err) => {
        dispatch(ActionActive.setValidationData(places));
        console.log(err);
      });
  },
  loadData: (places) => (dispatch, getState, api) => {
    return api.get(`/mistakes`)
      .then((response) => {
        console.log(response);
        dispatch(setIdDataLoaded(true, ``));
        dispatch(ActionActive.setValidationData(places));
        // тут добавить отображение ошибок или если все хорошо
      });
  },

};
/**
 * @param {status} status bool-ево значение.
 * @param {err} err ошибка.
 * @return{isDataLoaded} статус загрузки(позже за диспатчим его в загрузчик(по другому не придумал))
 */
const setIdDataLoaded = (status, err) => {
  return {
    type: ActionType.GET_SERVER_STATUS,
    isDataPost: status,
    errorMessage: err
  };
};

export {
  dataReducer,
  setIdDataLoaded,
  ActionType,
  ActionActive,
  Operation,
};
