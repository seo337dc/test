import * as Types from "../actionTypes/attachFileListTypes";
import axios from "axios";
import { GET_DOC_FILE_LIST_NO } from "../../fetch/apiConfig";

export const getAttachFileList = (categoryCD) => async (dispatch) => {
  try {
    let res = await axios.post(GET_DOC_FILE_LIST_NO, {
      categoryCD,
    });

    if (res.data.result === "OK") {
      res.data.listData = res.data.listData.sort((a, b) => {
        return a.list_categoty < b.list_categoty
          ? -1
          : a.list_categoty > b.list_categoty
          ? 1
          : 0;
      });
    }
    dispatch({ type: Types.GET_ATTACH_FILE_LIST, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};
