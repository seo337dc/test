import * as Types from "../actionTypes/messengerTypes";
import axios from "axios";
import { GET_MESSENGER_ROOM_LIST } from "../../fetch/apiConfig";

export const getMessengerRoomList = () => async (dispatch) => {
  try {
    const res = await axios.post(GET_MESSENGER_ROOM_LIST);
    dispatch({ type: Types.GET_ROOM_LIST, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};
