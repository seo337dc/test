const today = new Date();
let year = today.getFullYear(); // 년도
let month =
  (today.getMonth() + 1 + "").length === 1
    ? "0" + (today.getMonth() + 1)
    : today.getMonth() + 1; // 월
let date =
  (today.getDate() + "").length === 1 ? "0" + today.getDate() : today.getDate(); // 날짜

export const TODAY_TIME = year + "-" + month + "-" + date;
