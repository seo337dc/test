import axios from "axios";
import * as Types from "../actionTypes/mailTypes";
import {
  MAIL_LIST_DATA,
  MAIL_TO_LIST_DATA,
  MAIL_TEMP_DATA,
  ADDRESS_LIST_DATA,
} from "../../fetch/apiConfig";

export const setMailList =
  (str = "from", token) =>
  async (dispatch) => {
    let data;
    let result;

    try {
      if (str === "from") {
        data = await axios.post(
          MAIL_LIST_DATA,
          token && {
            headers: {
              token,
            },
          }
        );

        result = {
          type: Types.SET_MAIL_LIST,
          payload: data.data,
        };
      } else if (str === "to") {
        data = await axios.post(MAIL_TO_LIST_DATA);

        let newData = data.data.listData
          ? data.data.listData.map((obj) => {
              let reMailJsonList = JSON.parse(obj.re_mail_contents);
              let returnReMailContent = "";
              for (let i = 0; i < reMailJsonList.length; i++) {
                if (
                  reMailJsonList[i].type === "text" ||
                  reMailJsonList[i].type === "textarea"
                ) {
                  returnReMailContent = reMailJsonList[i].content;
                  break;
                } else if (reMailJsonList[i].type === "question") {
                  returnReMailContent = `${reMailJsonList[i].content["editTextArea0"]} ${reMailJsonList[i].content["editTextArea1"]}
                ${reMailJsonList[i].content["editTextArea2"]}${reMailJsonList[i].content["editTextArea3"]}
                `;
                  break;
                }
              }

              return { ...obj, show_content: returnReMailContent };
            })
          : [];

        data.data.listData = newData; //show_content 추가

        result = {
          type: Types.SET_MAIL_TO_LIST,
          payload: data.data,
        };
      } else if (str === "temp") {
        data = await axios.post(MAIL_TEMP_DATA);

        let newData = [];

        if (data.data.listData) {
          newData = data.data.listData.map((obj) => {
            let reMailJsonList = JSON.parse(obj.Re_Mail_Contents);
            let returnReMailContent = "";
            for (let i = 0; i < reMailJsonList.length; i++) {
              if (
                reMailJsonList[i].type === "text" ||
                reMailJsonList[i].type === "textarea"
              ) {
                returnReMailContent = reMailJsonList[i].content;
                break;
              } else if (reMailJsonList[i].type === "question") {
                returnReMailContent = `${reMailJsonList[i].content["editTextArea0"]} ${reMailJsonList[i].content["editTextArea1"]}
              ${reMailJsonList[i].content["editTextArea2"]}${reMailJsonList[i].content["editTextArea3"]}
              `;
                break;
              }
            }

            return {
              list_no: obj.Mail_No,
              mail_cd: obj.Category_CD,
              mail_contents: obj.Mail_Contents,
              mail_kornm: obj.Mail_KORNM,
              mail_subject: obj.Mail_Subject,
              mail_sentNo: obj.Send_MailNo,
              show_content: returnReMailContent,
            };
          });
        }

        data.data.listData = newData; //show_content 추가

        result = {
          type: Types.SET_MAIL_TEMP_LIST,
          payload: data.data,
        };
      } else {
        return dispatch({ type: Types.SET_MAIL_LIST_DEFAULT });
      }
      if (data.data.result === "ERROR") {
        return dispatch({ type: Types.SET_MAIL_LIST_DEFAULT });
      }

      return dispatch(result);
    } catch (error) {
      console.error(error);
    }
  };

export const setReadMail = (payload) => {
  return {
    type: Types.SET_READ_MAIL,
    payload,
  };
};

export const setAddressList = (token) => async (dispatch) => {
  try {
    const data = await axios.post(
      ADDRESS_LIST_DATA,
      token && {
        headers: {
          token,
        },
      }
    );
    if (data.data.result === "ERROR") {
      return;
    }
    return dispatch({ type: Types.SET_ADDRESS_LIST, payload: data.data });
  } catch (error) {
    console.error(error);
  }
};

export const setCheckAddressList = (payload) => {
  return {
    type: Types.CHECK_ADDRESS_LIST,
    payload,
  };
};

export const resetAddressList = (payload) => {
  return {
    type: Types.RESET_ADDRESS_LIST,
    payload,
  };
};
