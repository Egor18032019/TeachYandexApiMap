import * as React from 'react';
import { useContext, useReducer } from 'react';

type ContextProps = {
  town: string,
  endPointRoute: string,
  time: string,
  length: string,
  setTown: (town: string) => void,
  setLength: (length: string) => void,
  setTime: (time: string) => void,
  setDataLoaded: (isDataLoaded: boolean) => void,
  setEndPointRoute: (endPointRoute: string) => void,
};

interface stateTownProvider {
  page: string,
  isDataLoaded: boolean,
  isDataPost: boolean,
  town: string,
  endPointRoute: string,
  errorMessage: string,
  length: string,
  time: string,
}

interface reduceAction {
  type: string,
  payload: string | boolean
}
const TownContext = React.createContext<Partial<ContextProps>>({}); //передаем пустой обьект

enum ActionType {
  CHOISE_TOWN = "CHOISE_TOWN",
  CHOISE_ENDPOINTROUTE = "CHOISE_ENDPOINTROUTE",
  CHOISE_LENGTH = "CHOISE_LENGTH",
  CHOISE_TIME = "CHOISE_TIME",
  GET_SERVER_STATUS = "GET_SERVER_STATUS"
};


const reducer = (state: stateTownProvider, action: reduceAction) => {
  switch (action.type) {
    case ActionType.CHOISE_TOWN: return Object.assign({}, state, {
      town: action.payload,
    });
    case ActionType.CHOISE_ENDPOINTROUTE: return Object.assign({}, state, {
      endPointRoute: action.payload,
    });
    case ActionType.CHOISE_LENGTH: return Object.assign({}, state, {
      length: action.payload,
    });
    case ActionType.CHOISE_TIME: return Object.assign({}, state, {
      time: action.payload,
    });
    case ActionType.GET_SERVER_STATUS: return Object.assign({}, state, {
      isDataLoaded: action.payload
    });
    default: return state;
  }
};

const TownProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer,
    { // первоначальный стайт
      page: `mainPage`,
      isDataLoaded: false,
      isDataPost: false,
      town: `Екатеринбург`,
      endPointRoute: `Казань`,
      errorMessage: ``,
      length: "",
      time: ""
    });

  const setTown = (payload: string) => dispatch({ type: ActionType.CHOISE_TOWN, payload });
  const setEndPointRoute = (payload: string) => dispatch({ type: ActionType.CHOISE_ENDPOINTROUTE, payload });
  const setLength = (payload: string) => dispatch({ type: ActionType.CHOISE_LENGTH, payload });
  const setTime = (payload: string) => dispatch({ type: ActionType.CHOISE_TIME, payload });
  const setDataLoaded = (payload: boolean) => dispatch({ type: ActionType.GET_SERVER_STATUS, payload });

  return (
    <TownContext.Provider
      value={{
        town: state.town,
        endPointRoute: state.endPointRoute,
        length: state.length,
        time: state.time,
        setTown,
        setLength,
        setTime,
        setDataLoaded,
        setEndPointRoute
      }}>
      { children}
    </TownContext.Provider>
  );
};



const useContextMap = () => {
  return useContext(TownContext);
};

export {
  TownProvider,
  useContextMap
};
