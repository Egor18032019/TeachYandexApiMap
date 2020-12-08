import * as React from 'react';
import { useContext, useReducer } from 'react';

type ContextProps = {
  town: string,
  setTown: (town: string) => void,
  setDataLoaded: (isDataLoaded: boolean) => void,
};

interface stateTownProvider {
  page: string,
  isDataLoaded: boolean,
  isDataPost: boolean,
  town: string,
  errorMessage: string,
}

interface reduceAction {
  type: string,
  payload: string | boolean
}
const TownContext = React.createContext<Partial<ContextProps>>({}); //передаем пустой обьект

enum ActionType {
  CHOISE_TOWN = "CHOISE_TOWN",
  GET_SERVER_STATUS = "GET_SERVER_STATUS"
};


const reducer = (state: stateTownProvider, action: reduceAction) => {
  switch (action.type) {
    case ActionType.CHOISE_TOWN: return Object.assign({}, state, {
      town: action.payload,
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
      errorMessage: ``,
    });

  const setTown = (payload: string) => dispatch({ type: ActionType.CHOISE_TOWN, payload });
  const setDataLoaded = (payload: boolean) => dispatch({ type: ActionType.GET_SERVER_STATUS, payload });

  return (
    <TownContext.Provider
      value={{
        town: state.town,
        setTown,
        setDataLoaded
      }}>
      { children}
    </TownContext.Provider>
  );
};



const useTown = () => {
  return useContext(TownContext);
};

export {
  TownProvider,
  useTown
};
