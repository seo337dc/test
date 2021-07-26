import * as Types from "../actionTypes/alertMessageTypes";

export const pushAlertMessage = (payload) => ({
  type: Types.PUSH_ALERT_MESSAGE,
  payload,
});

export const shiftAlertMessage = () => ({
  type: Types.SHFIT_ALERT_MESSAGE,
});

export const deleteAlertMessage = (payload) => ({
  type: Types.DELETE_ALERT_MESSAGE,
  payload,
});
