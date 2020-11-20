// import {
//   onLoadForm
// } from "../components/backend.js";

// Определяем действия(actions)
const ActionType = {
  CHOISE_TOWN: `CHOISE_TOWN`,
  GET_SERVER_STATUS: `GET_SERVER_STATUS`,
};


// Объект начального состояния(state):
const initialState = {
  page: `mainPage`,
  isDataLoaded: false,
  isDataPost: false,
  town: `Москва`,
  errorMessage: ``,
};


const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHOISE_TOWN:
      return Object.assign({}, state, {
        town: action.payload,
      });
  }
  return state;
};

// запрос на сервер
const Operation = {
  postData: (places) => (dispatch, getState, api) => {
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
        throw err;
      });
  },
  loadData: (places) => (dispatch, getState, api) => {
    return api.get(`/town`)
      .then((response) => {
        console.log(response);
        dispatch(ActionCreator.setIdDataLoaded(true, ``));
        dispatch(ActionCreator.setTown(places));
        // тут добавить отображение ошибок или если все хорошо
      });
  },

};

const ActionCreator = {
  setIdDataLoaded: (status, err) => {
    return {
      type: ActionType.GET_SERVER_STATUS,
      isDataPost: status,
      errorMessage: err
    };
  },
  setTown: (town) => {
    return {
      type: ActionType.CHOISE_TOWN,
      payload: town || ``
    };
  }
};


export {
  dataReducer,
  ActionType,
  ActionCreator,
  Operation,
};
