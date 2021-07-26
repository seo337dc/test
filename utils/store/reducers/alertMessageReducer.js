import * as Types from "../actionTypes/alertMessageTypes";

const initialState = [];

const alertMessageReducer = (state = initialState, action) => {
  const tmpAry = [...state];
  switch (action.type) {
    case Types.PUSH_ALERT_MESSAGE:
      tmpAry.push({ id: Math.random(), type: action.payload });
      return tmpAry;

    case Types.SHFIT_ALERT_MESSAGE:
      tmpAry.shift();
      return tmpAry;

    case Types.DELETE_ALERT_MESSAGE:
      return tmpAry.filter((data) => data.id !== action.payload);

    default:
      return state;
  }
};

export default alertMessageReducer;
