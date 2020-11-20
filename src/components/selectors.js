import NameSpace from "./name-space.js";

const getTown = (state) => {
  return state[NameSpace.DATA].town;
};


export {
  getTown
};
