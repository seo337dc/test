import moment from "moment";

const themeConfig = {
  "common.border": "1px solid #eeeeee",
  "common.holiday.color": "#da291c",
  "common.saturday.color": "#222222",
  "common.dayname.color": "#222222",
  "common.today.color": "#222222",
  "month.dayname.height": "60px",
  "month.dayname.borderLeft": "0px",
  "month.dayname.fontSize": "20px",
  "month.dayname.fontWeight": "400",
  "week.dayGridSchedule.borderRadius": "0px",
  "week.timegridSchedule.borderRadius": "0px",
  "month.schedule.borderRadius": "0px",
  "month.schedule.marginTop": "5px",
  "month.schedule.height": "24px",
  "month.moreView.border": "1px solid #303030",
};

const config = (today) => ({
  defaultView: "month",
  month: {
    daynames: ["일", "월", "화", "수", "목", "금", "토"],
    startDayOfWeek: 0,
    isAlways6Week: false,
  },
  taskView: true,
  theme: themeConfig,
  isReadOnly: true,
  disableDblClick: true,
  disableClick: true,
  template: {
    time: (schedule) => {
      return (
        '<strong class="d-none d-md-inline">' +
        moment(schedule.start.getTime()).format("HH:mm") +
        "</strong> " +
        schedule.title
      );
    },
    monthMoreTitleDate: function (date, dayname) {
      var day = date.split(".")[2];

      return '<span class="tui-full-calendar-month-more-title-day">' + day;
    },
    monthMoreClose: function () {
      return '<span class="tui-full-calendar-icon tui-full-calendar-ic-close"></span>';
    },
    monthGridHeaderExceed: function (hiddenSchedules) {
      return (
        '<span class="tui-full-calendar-weekday-grid-more-schedules weekday-grid-more-schedules">+' +
        hiddenSchedules +
        "</span>"
      );
    },
    monthGridHeader: function (dayModel) {
      var date = parseInt(dayModel.date.split("-")[2], 10);
      var classNames = ["tui-full-calendar-weekday-grid-date"];
      /* 최준영 수정 사항 : 오늘 날짜 색 표시 관련 (나중에 주석 해제) */
      if (dayModel.date === today.slice(0, 10)) {
        classNames.push("tui-full-calendar-weekday-grid-date-decorator");
      }

      return '<span class="' + classNames.join(" ") + '">' + date + "</span>";
    },
  },
  calendars: [
    {
      id: "0",
      name: "공휴일",
      color: "#f54f3d",
      bgColor: "transparent",
      dragBgColor: "transparent",
      borderColor: "transparent",
    },
    {
      id: "1",
      name: "업무",
      color: "#222222",
      bgColor: "transparent",
      dragBgColor: "transparent",
      borderColor: "#D58984",
    },
    {
      id: "2",
      name: "회의실",
      color: "#222222",
      bgColor: "transparent",
      dragBgColor: "transparent",
      borderColor: "#877669",
    },
    {
      id: "3",
      name: "업무차량",
      color: "#222222",
      bgColor: "transparent",
      dragBgColor: "transparent",
      borderColor: "#76C881",
    },
    {
      id: "4",
      name: "장비대여",
      color: "#222222",
      bgColor: "transparent",
      dragBgColor: "transparent",
      borderColor: "#8484D5",
    },
  ],
});

/**
 * @param {number} x mouse x
 * @param {number} y mouse y
 * @param {number} modalWidth modal width
 * @param {number} modalHeight modal height
 * @returns {object} { x: number, y: number}
 */
export const modalPosition = (x, y, modalWidth, modalHeight) => {
  const correctionValue = 10;
  const position = {
    top: y,
    left: x,
  };
  const screenWidth = document.body.clientWidth;
  const screenHeight = document.body.clientHeight;
  const isOverFlowX = x + modalWidth > screenWidth;
  const isOverFlowY = y + modalHeight > screenHeight;

  if (isOverFlowX) {
    position.left = screenWidth - (modalWidth + correctionValue);
  }

  if (isOverFlowY) {
    position.top = screenHeight - (modalHeight + correctionValue);
  }

  return position;
};

const setMainCalendar = (
  idStr,
  { setDetailShow, setModalPosition, modalWidth, modalHeight, today }
) => {
  const Calendar = require("tui-calendar");

  const calendar = new Calendar(idStr, config(today));

  calendar.setDate(today);

  calendar.on("clickSchedule", function (e) {
    calendar.toggleSchedules(e.schedule.id, true, true);

    setModalPosition(
      modalPosition(e.event.clientX, e.event.clientY, modalWidth, modalHeight)
    );
    setDetailShow({
      id: e.schedule.id,
      clNo: e.schedule.calendarId.split("_")[0],
    });
  });

  return calendar;
};

export default setMainCalendar;
