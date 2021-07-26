export const BASE_URL = "https://lotte.insahr.co.kr";

//login
export const SEND_PHONE_NUM = `${BASE_URL}/login/Verification`;
export const LOGIN = `${BASE_URL}/login/LoginProcess`;
export const CONFIRM = `${BASE_URL}/login/Confirm`;
export const SENDFAQ = `${BASE_URL}/board/write/process2`;

//test
export const END_PREV_TEST = `${BASE_URL}/login/PreCheckComplete`;
export const START_TEST = `${BASE_URL}/login/StartExam`;
export const END_TEST = `${BASE_URL}/login/EndExam`;
export const SEND_ID_CARD = `${BASE_URL}/login/SaveImage`;
export const SEND_AGREE = `${BASE_URL}/login/AgreeInfo`;
export const SEND_ATTEND = `${BASE_URL}/login/AttendanceCheck`;
export const SEND_CHEAT_MESSAGE = `${BASE_URL}/login/CheattingExam`;
export const SEND_WATCHED_VIDEO = `${BASE_URL}/login/whichUpdate`;

//time
export const SAVETIME = `${BASE_URL}/login/TimeSave`; //afterTime

//time table
export const GET_TIME_TABLE_RESULT = `${BASE_URL}/common/returnResult`;

//todo list
export const GET_TODO_LIST = `${BASE_URL}/common/returnTodoList`;

// mail data apis

export const MAIL_LIST_DATA = `${BASE_URL}/mail/inboxListLoad`; //all mail List
export const MAIL_TO_LIST_DATA = `${BASE_URL}/mail/sentboxListLoad`; // (sent) to mail List
export const MAIL_TEMP_DATA = `${BASE_URL}/mail/imsiBoxMailLoad`; // (save) imsi mail List

export const MAIL_VIEW_DATA = `${BASE_URL}/mail/inboxMailView`; //view-from mail
export const MAIL_VIEW_SENT_DATA = `${BASE_URL}/mail/sentboxMailView`; //view-to(sent) mail
export const MAIL_VIEW_TEMP_DATA = `${BASE_URL}/mail/imsiMailView`; //view-temp(imsi) mail

export const MAIL_SEND_DATA = `${BASE_URL}/mail/inboxMailSend`;
//send mail
export const MAIL_SEND_TEMP_DATA = `${BASE_URL}/mail/imsiboxMailSend`; //save mail(imsi)
export const MAIL_SEND_TEMP_SEND_DATA = `${BASE_URL}/mail/imsiMailSendBoxSend`; //send mail(imsi)

export const ADDRESS_LIST_DATA = `${BASE_URL}/mail/addrLoad`;
export const FILE_DOWINLOAD = `${BASE_URL}/mail/fileAllDownload/`;

//calendar data apis
export const MAIN_CALENDAR_DATA = `${BASE_URL}/calendar/defaultCalenderLoad`;
export const VIEW_CALENDAR_ITEM = `${BASE_URL}/calendar/selectCalender`;
export const SCHEDULE_SAVE = `${BASE_URL}/calendar/createCalender`;
export const SCHEDULE_EDIT = `${BASE_URL}/calendar/updateCalender`;
export const SCHEDULE_DELETE = `${BASE_URL}/calendar/deleteCalender`;
export const MODAL_CALENDAR = `${BASE_URL}/calendar/modalCalender`;
export const CALENDAR_SELECT_TITLE = `${BASE_URL}/calendar/selectTitle`;
export const CALENDAR_SELECT_PLACE = `${BASE_URL}/calendar/selectPlace`;

//memo data apis
export const GET_MEMO_LIST = `${BASE_URL}/memo/MemoListLoad`;
export const CREATE_NEW_MEMO = `${BASE_URL}/memo/MemoInsert`;
export const MODIFY_MEMO = `${BASE_URL}/memo/MemoUpdate`;
export const DELETE_MEMO = `${BASE_URL}/memo/MemoDelete`;

// messenger
export const GET_MESSENGER_ROOM_LIST = `${BASE_URL}/messenger/RoomListLoad`;
export const GET_MESSENGER_ROOM_DETAIL = `${BASE_URL}/messenger/Enter`;
export const SEND_MESSAGE = `${BASE_URL}/messenger/toInsert`;

//attach file list
export const GET_ATTACH_FILE_LIST = `${BASE_URL}/mail/attachListLoad`;

//doc file list
// export const GET_DOC_FILE_LIST = `${BASE_URL}/document/docListLoad`;
export const GET_DOC_FILE_LIST_NO = `${BASE_URL}/document/docListEnter`;
export const GET_DOC_FILE_DETAIL = `${BASE_URL}/document/docContentsLoad`;
export const DOC_BOOKMARK = `${BASE_URL}/document/docFavorites`;
export const SEND_FOLDER_PW = `${BASE_URL}/document/hiddenFolderOpenYN `;

//admin
export const ADMIN_LOGIN = `${BASE_URL}/admin/adminLogin`;
export const ADMIN_LOGIN_FIRST = `${BASE_URL}/admin/adminLoginFirst`;

export const GET_ADMIN_QUESTION_LIST = `${BASE_URL}/upload/questionList`;
export const UPLOAD_IMG = `${BASE_URL}/upload/insertFile`;
export const INSERT_QUESTION = `${BASE_URL}/upload/insertQuestion`;
export const QUESTION_DELETE = `${BASE_URL}/upload/deleteQuestion`;
export const SELECT_QUESTION = `${BASE_URL}/upload/selectQuestion`;
export const SELECT_DOCUMENT = `${BASE_URL}/upload/selectDocument`;
export const UPDATE_QUESTION = `${BASE_URL}/upload/updateQuestion`;
export const GET_ATTACHFILE_DOC_LIST = `${BASE_URL}/upload/listDocument`;
export const GET_ATTACHFILE_DOC_LIST_ALL = `${BASE_URL}/upload/listDocument2`;
export const UPLOAD_ATTACHFILE_DOC_LIST = `${BASE_URL}/upload/saveDocument`;
export const ADMIN_ADDR_LOAD = `${BASE_URL}/mail/questAddrLoad`;

//레포트용
export const GETREPORT = `${BASE_URL}/external/reportInfo`;
