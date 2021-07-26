import * as Types from "../actionTypes/memoTypes";
import axios from "axios";
import { GET_MEMO_LIST } from "../../fetch/apiConfig";

export const setMemoList = (payload) => ({
  type: Types.SET_MEMO_LIST,
  payload,
});

export const getMemoList = () => async (dispatch) => {
  try {
    const res = await axios.post(GET_MEMO_LIST);
    if (res.data.sData) {
      dispatch({ type: Types.GET_MEMO_LIST, payload: res.data });
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteMemo = (payload) => ({ type: Types.DELETE_MEMO, payload });
