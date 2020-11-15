
// import history from "../../history";

// Определяем действия(actions)
const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  AUTHORIZATION: `AUTHORIZATION`,
};

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
  LOAD: `LOAD`,
};

// Объект начального состояния(state):
const initialState = {
  authorizationStatus: AuthorizationStatus.LOAD,
  users: ``,
};


const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        authorizationStatus: action.payload,
      });
    case ActionType.AUTHORIZATION:
      return Object.assign({}, state, {
        authorizationStatus: AuthorizationStatus.AUTH,
        users: action.users,
      });
    default:
      return state;
  }
};
interface Props {
  checkStatusAuth: any;
  login: any;
}

const ActionCreator = {
  // этот сработал когда пришла ошибка
  setAuthStatus: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status
    };
  },
  //  этот срабатывает когда всё хорошо
  setAuthData: (data) => {
    return {
      type: ActionType.AUTHORIZATION,
      users: data
    };
  },
};

// запрос на сервер
const Operation: Props = {
  checkStatusAuth: () => (dispatch, getState, api) => {
    return dispatch(ActionCreator.setAuthStatus(AuthorizationStatus.AUTH));
  },
  login: (authData) => (dispatch, getState, api) => {
    return dispatch(ActionCreator.setAuthData("test"));
  }
};

export {
  usersReducer,
  ActionType,
  AuthorizationStatus,
  ActionCreator,
  Operation
};
