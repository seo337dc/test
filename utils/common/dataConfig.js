//login
export const backgroundImageConfig = ["/img/BG01.jpg", "/img/BG02.jpg"];

// mail
export const listMap = {
  from: "mailList",
  to: "mailToList",
  temp: "mailTempList",
  send: "mailList",
};

export const kornmStyleMap = {
  6: { type: "gold", kronm: "회신요청" },
  7: { type: "gray", kronm: "공지사항" },
  8: { type: "gold_reverse", kronm: "회신완료" },
  12: { type: "silver", kronm: "임시보관" },
};

export const menuList = ["받은 메일함", "보낸 메일함", "임시 보관함"];

export const mailTodivideString = "; ";

//docs
// export const tabHom = { type: "home", title: <i className="xi-home" /> };

//calendar
export const modalWidth = 330;

export const modalHeight = 280;

export const doubleQuotes = "@d@ub13Q0ut3@";

export const regDQ = new RegExp(doubleQuotes, "g");

export const hrRange = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
];

export const minRange = ["00", "10", "20", "30", "40", "50"];
