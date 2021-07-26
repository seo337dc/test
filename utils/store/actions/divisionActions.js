import * as Types from "../actionTypes/divisionTypes";

export const addScreen = (payload) => ({
  type: Types.ADD_SCREEN,
  payload,
});

export const addEmptyScreen = () => ({ type: Types.ADD_EMPTY_SCREEN });

export const removeScreen = (payload) => ({
  type: Types.REMOVE_SCREEN,
  payload,
});
