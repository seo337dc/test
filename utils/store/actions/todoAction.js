import * as Types from "../actionTypes/todoTypes";
import { GET_TODO_LIST } from "../../fetch/apiConfig";
import axios from "axios";

export const setTodoList = (payload) => ({
  type: Types.SET_TODO_LIST,
  payload,
});

export const getToDoList = () => async (dispatch) => {
  try {
    const res = await axios.post(GET_TODO_LIST);
    dispatch(setTodoList(res.data));
  } catch (error) {
    console.error(error);
  }
};
