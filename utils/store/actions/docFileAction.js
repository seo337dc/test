import * as Types from "../actionTypes/docFileType";
import axios from "axios";
import { GET_DOC_FILE_LIST_NO } from "../../fetch/apiConfig";

export const getDocFileList = (payload) => async (dispatch) => {
  try {
    const res = await axios.post(GET_DOC_FILE_LIST_NO, {
      categoryCD: payload,
    });

    return dispatch({ type: Types.GET_DOC_FILE_LIST, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};
