import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteAlertMessage } from "../../utils/store/actions/alertMessageAction";
import parser from "react-html-parser";
import styles from "./AlertMessage.module.scss";

//{"result":"OK","msg":"받은메일함에 새로운 메시지가 도착했습니다.","kindCd":"EM"}
//{"result":"OK","msg":"메신저에 새로운 대화가 도착했습니다.","kindCd":"MS"}

// EM, MS, 5M

const showingMessageDelay = 10000;

const NoticeCard = ({ data }) => {
  const dispatch = useDispatch();

  const setColor = () => {
    switch (data.type) {
      case "90M":
        return "#DA291C";
      case "60M":
        return "#DA291C";
      case "30M":
        return "#DA291C";
      case "5M":
        return "#DA291C";
      case "1M":
        return "#DA291C";
      default:
        return false;
    }
  };

  const setText = () => {
    switch (data.type) {
      case "90M":
        return "<span>종료 90분 전입니다.</span><br />제한 시간 내 주어진 업무들을 완료해 주시기 바랍니다.<b>(제한 시간 종료 후 업무 진행 불가)</b>";
      case "60M":
        return "<span>종료 60분 전입니다.</span><br />제한 시간 내 주어진 업무들을 완료해 주시기 바랍니다.<b>(제한 시간 종료 후 업무 진행 불가)</b>";
      case "30M":
        return "<span>종료 30분 전입니다.</span><br />제한 시간 내 주어진 업무들을 완료해 주시기 바랍니다.<b>(제한 시간 종료 후 업무 진행 불가)</b>";
      case "5M":
        return "<span>종료 5분 전입니다.</span><br />제한 시간 내 주어진 업무들을 완료해 주시기 바랍니다.<b>(제한 시간 종료 후 업무 진행 불가)</b>";
      case "1M":
        return "<span>종료 1분 전입니다.</span><br />제한 시간 내 주어진 업무들을 완료해 주시기 바랍니다.<b>(제한 시간 종료 후 업무 진행 불가)</b>";
      default:
        return false;
    }
  };

  useEffect(() => {
    setTimeout(
      () => dispatch(deleteAlertMessage(data.id)),
      showingMessageDelay
    );
  }, []);

  return (
    <div
      className={styles.notice}
      style={{ border: `2px solid ${setColor()}` }}
    >
      <i
        className="xi-close"
        onClick={() => dispatch(deleteAlertMessage(data.id))}
      />
      {parser(setText())}
    </div>
  );
};

const Card = ({ data }) => {
  const dispatch = useDispatch();

  const setImg = () => {
    switch (data.type) {
      case "EM":
        return "new_email.svg";
      case "MS":
        return "new_message.svg";
      default:
        return false;
    }
  };

  const setText = () => {
    switch (data.type) {
      case "EM":
        return "새 메일이 도착했습니다.";
      case "MS":
        return "새 메시지가 도착했습니다.";
      default:
        return false;
    }
  };

  useEffect(() => {
    setTimeout(
      () => dispatch(deleteAlertMessage(data.id)),
      showingMessageDelay
    );
  }, []);

  return (
    <div className={styles.card}>
      <i
        className="xi-close"
        onClick={() => dispatch(deleteAlertMessage(data.id))}
      />
      <img src={`/img/${setImg()}`} alt="alert" />
      {setText()}
    </div>
  );
};

const checkDataMessage = (type) => type === "EM" || type === "MS";

const checkTimeMessage = (type) =>
  type === "90M" ||
  type === "60M" ||
  type === "30M" ||
  type === "5M" ||
  type === "1M";

// alert modal filter
const AlertMessage = () => {
  const alertMessageList = useSelector((state) => state.alertMessage);

  return (
    <div className={styles.wrap}>
      {alertMessageList
        ?.filter((f) => checkDataMessage(f.type) || checkTimeMessage(f.type))
        .map((data, idx) => {
          if (checkDataMessage(data.type)) {
            return (
              <Card data={data} key={`alert_message_list_${data.id}_${idx}`} />
            );
          } else if (checkTimeMessage(data.type)) {
            return (
              <NoticeCard
                data={data}
                key={`alert_message_list_${data.id}_${idx}`}
              />
            );
          }
        })}
    </div>
  );
};

export default AlertMessage;
