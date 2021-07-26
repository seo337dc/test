import * as Types from "../actionTypes/modalStateTypes";

const initialState = {
  focus: undefined,
  isMessengerOpen: false,
  isMemoOpen: false,
  isTodoOpen: false,
  isPtEditorOpen: false,
};

const modalStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_IS_MESSENGER_OPEN:
      return { ...state, isMessengerOpen: action.payload };
    case Types.SET_IS_MEMO_OPEN:
      return { ...state, isMemoOpen: action.payload };
    case Types.SET_IS_CALC_OPEN:
      return { ...state, isCalcOpen: action.payload };
    case Types.SET_IS_TODO_OPEN:
      return { ...state, isTodoOpen: action.payload };
    case Types.SET_IS_PT_EDITOR_OPEN:
      return { ...state, isPtEditorOpen: action.payload };
    case Types.SET_FOCUS:
      return { ...state, focus: action.payload };
    default:
      return state;
  }
};

export default modalStateReducer;
