import * as Types from "../actionTypes/mailTypes";

const initialState = { listData: [] };

export const mailListReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_MAIL_LIST:
      return action.payload;
    case Types.SET_MAIL_LIST_DEFAULT:
      return state;
    case Types.SET_READ_MAIL:
      const readMailList = state.listData.map((mail) => {
        if (mail.list_no === action.payload && mail.read_yn === "N") {
          return { ...mail, read_yn: "Y" };
        } else {
          return mail;
        }
      });
      return { ...state, listData: readMailList };
    default:
      return state;
  }
};

export const mailToListReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_MAIL_TO_LIST:
      return action.payload;
    case Types.SET_MAIL_LIST_DEFAULT:
      return state;
    default:
      return state;
  }
};

export const mailTempListReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_MAIL_TEMP_LIST:
      return action.payload;
    case Types.SET_MAIL_LIST_DEFAULT:
      return state;
    default:
      return state;
  }
};

const addressListInitialState = { teamListData: [] };

export const addressListReducer = (state = addressListInitialState, action) => {
  switch (action.type) {
    case Types.SET_ADDRESS_LIST:
      return action.payload;

    case Types.CHECK_ADDRESS_LIST:
      const newTeamList = state.teamListData.map((teamData) => {
        if (teamData.team_no === action.payload.teamData.team_no) {
          return {
            ...teamData,
            addrListData: teamData.addrListData.map((addr) => {
              if (addr.addr_no === action.payload.selectData.addr_no) {
                return { ...addr, checked: !addr.checked };
              } else {
                return addr;
              }
            }),
          };
        } else {
          return teamData;
        }
      });
      return { ...state, teamListData: newTeamList };

    case Types.RESET_ADDRESS_LIST:
      return {
        ...state,
        teamListData: state.teamListData.map((teamData) => {
          return {
            ...teamData,
            addrListData: teamData.addrListData.map((addr) => {
              return { ...addr, checked: false };
            }),
          };
        }),
      };
    default:
      return state;
  }
};
