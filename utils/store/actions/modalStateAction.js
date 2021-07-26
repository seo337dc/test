import * as Types from "../actionTypes/modalStateTypes";

export const setIsMessengerOpen = (payload) => ({
  type: Types.SET_IS_MESSENGER_OPEN,
  payload,
});

export const setIsMemoOpen = (payload) => ({
  type: Types.SET_IS_MEMO_OPEN,
  payload,
});

export const setIsCalcOpen = (payload) => ({
  type: Types.SET_IS_CALC_OPEN,
  payload,
});

export const setIsTodoOpen = (payload) => ({
  type: Types.SET_IS_TODO_OPEN,
  payload,
});

export const setIsPtEditorOpen = (payload) => ({
  type: Types.SET_IS_PT_EDITOR_OPEN,
  payload,
});

export const setFocus = (payload) => ({
  type: Types.SET_FOCUS,
  payload,
});
