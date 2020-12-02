import React, {useContext, useReducer} from 'react';
import PropTypes from "prop-types";

const TownContext = React.createContext();


const ActionType = {
  CHOISE_TOWN: `CHOISE_TOWN`,
  GET_SERVER_STATUS: `GET_SERVER_STATUS`,
};


const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.CHOISE_TOWN: return Object.assign({}, state, {
      town: action.town,
    });
    case ActionType.GET_SERVER_STATUS: return Object.assign({}, state, {
      isDataLoaded: true
    });
    default: return state;
  }
};

const TownProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer,
      { // первоначальный стайт
        page: `mainPage`,
        isDataLoaded: false,
        isDataPost: false,
        town: `Москва`,
        errorMessage: ``,
      });

  const setTown = (town) => dispatch({type: ActionType.CHOISE_TOWN, town});
  const setDataLoaded = () => dispatch({type: ActionType.GET_SERVER_STATUS});

  return (
    <TownContext.Provider value={{
      town: state.town,
      setTown,
      setDataLoaded
    }}>
      { children}
    </TownContext.Provider>
  );
};

TownProvider.propTypes = {
  children: PropTypes.array.isRequired
};

const useTown = () => {
  return useContext(TownContext);
};

export {
  TownProvider,
  useTown
};
