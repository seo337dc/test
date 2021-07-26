import * as Types from "../actionTypes/todoTypes";

const initialState = {};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_TODO_LIST:
      return action.payload;
    default:
      return state;
  }
};

export default todoReducer;
