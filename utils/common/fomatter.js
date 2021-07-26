export const phoneFomatter = (str) => {
  let tmp = "";
  if (str.length < 4) {
    return str;
  } else if (str.length < 7) {
    tmp += str.substr(0, 3);
    tmp += "-";
    tmp += str.substr(3);
    return tmp;
  } else if (str.length < 11) {
    tmp += str.substr(0, 3);
    tmp += "-";
    tmp += str.substr(3, 3);
    tmp += "-";
    tmp += str.substr(6);
    return tmp;
  } else {
    tmp += str.substr(0, 3);
    tmp += "-";
    tmp += str.substr(3, 4);
    tmp += "-";
    tmp += str.substr(7);
    return tmp;
  }
};

export const timerFomatter = (time, pares) => {
  if (pares) {
    return {
      m: parseInt(time / 60),
      s: `${time % 60 < 10 ? "0" : ""}${time % 60}`,
    };
  }
  return `${parseInt(time / 60)}:${time % 60 < 10 ? "0" : ""}${time % 60}`;
};

export const mailWriteFomatter = (data) =>
  Array.isArray(data) ? data.map((item) => item.u_name).join("; ") : data;

export const parsedJson = (data, isMessageList) => {
  if (typeof data === "string") {
    try {
      const tmpStr = data
        .replace(/\r/g, "")
        .replace(/\n/g, "")
        .replace(/\t/g, "")
        .replace(/\f/g, "");

      return JSON.parse(tmpStr);
    } catch (error) {
      if (isMessageList) {
        return { text: removeHtml(data) };
      }
      console.error(error);
      return {};
    }
  } else {
    return data;
  }
};

export const removeHtml = (oriText) => {
  if (oriText) {
    return String(oriText)
      .replace(/(<([^>]+)>)/gi, "")
      .replace(/&nbsp;/g, " ");
  } else {
    return oriText;
  }
};

export const replaceNewline = (str) => {
  return str
    .replace(/\r/g, "")
    .replace(/\n/g, "")
    .replace(/\t/g, "")
    .replace(/\f/g, "");
};

export const chatTimeFomatter = () => {
  const dateObj = new Date();
  return {
    h: dateObj.getHours() < 10 ? "0" + dateObj.getHours() : dateObj.getHours(),
    m:
      dateObj.getMinutes() < 10
        ? "0" + dateObj.getMinutes()
        : dateObj.getMinutes(),
  };
};
