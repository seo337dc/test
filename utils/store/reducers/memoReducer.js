import * as Types from "../actionTypes/memoTypes";

const initialState = { sData: [] };

const memoReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_MEMO_LIST:
      return { ...state, sData: action.payload };
    case Types.GET_MEMO_LIST:
      return action.payload;
    case Types.DELETE_MEMO:
      const tmpState = { ...state };
      tmpState.sData = state.sData.filter(
        (data) => data.Seq !== action.payload
      );
      return tmpState;
    default:
      return state;
  }
};

export default memoReducer;
