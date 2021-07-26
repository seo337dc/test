import * as Types from "../actionTypes/divisionTypes";

const initialState = [{ id: Math.random(), component: "Mail" }];

const divisionReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.ADD_SCREEN:
      return state.length === 2 ? [state[0], action.payload] : [action.payload];

    case Types.ADD_EMPTY_SCREEN:
      return state.length === 2 || state.length === 0 ? state : [state[0], ""];

    case Types.REMOVE_SCREEN:
      return state.filter((data, idx) => idx !== action.payload && data);
    default:
      return state;
  }
};

export default divisionReducer;
