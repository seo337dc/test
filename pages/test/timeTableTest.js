import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { pushAlertMessage } from "../../utils/store/actions/alertMessageAction";
import axios from "axios";
import useTimer from "../../utils/customHook/useTimer";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import styles from "./timeTableTest.module.scss";

const gettestTimeTableData = "http://lotte.insahr.co.kr/common/timeTableTest";
const returnTesTimeTabletResultData =
  "http://lotte.insahr.co.kr/common/returnResult";

const timeTableTest = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [time, setTime, timeStart, timeStop] = useTimer({
    initailTime: 0,
    debug: true,
    reverse: true,
  });
  const [timeTableData, setTimeTableData] = useState([]);
  const [log, setLog] = useState([]);

  const getItemDirectly = async (iqid) => {
    const res = await axios.post(
      returnTesTimeTabletResultData,
      { internQuestId: iqid },
      { headers: { token } }
    );

    console.log("%c%s", "color:#006ebd", "get api response", res.data);

    setLog((prev) => [...prev, res.data]);

    dispatch(pushAlertMessage(res.data.kindCd));
  };

  const nextItem = () => {
    const result = timeTableData.filter(
      (data) => data.After_LoginTime_Sec == time
    );

    return result;
  };

  const getToken = async () => {
    let cookieValue = null;
    if (document.cookie) {
      const array = document.cookie.split(escape("token") + "=");
      if (array.length >= 2) {
        const arraySub = array[1].split(";");
        cookieValue = unescape(arraySub[0]);
      }
    }
    if (cookieValue) {
      setToken(cookieValue);

      setLoading(true);
      try {
        console.log("%c%s", "color:#00bd13", "send get time table api");
        const res = await axios.post(gettestTimeTableData, null, {
          headers: {
            token: cookieValue,
          },
        });
        console.log("%c%s", "color:#006ebd", "get time table data", res.data);

        setTimeTableData(res.data.timeTable);
      } catch (error) {
        console.error(error);
        console.log(
          "%c%s",
          "color:#bd4800",
          "get error from get time table data",
          "\n",
          error
        );
      }
      setLoading(false);
    } else {
      alert("토큰이 없습니다. 로그인을 하세요.");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if (nextItem().length > 0) {
          for (let i = 0; i < nextItem().length; i++) {
            await getItemDirectly(nextItem()[i].Intern_Quest_ID);
          }
        }
      } catch (error) {
        console.error(error);
        // console.log(
        //   "%c%s",
        //   "color:#bd4800",
        //   "get error and stop time",
        //   error.config.data,
        //   "\n",
        //   error
        // );

        timeStop(true);
      }
    })();
  }, [time, timeTableData]);

  useEffect(() => {
    if (!token) return;

    (async () => {
      setLoading(true);
      try {
        console.log("%c%s", "color:#00bd13", "send get time table api");

        axios.defaults.headers.common["token"] = token;

        const res = await axios.post(gettestTimeTableData);
        console.log("%c%s", "color:#006ebd", "get time table data", res.data);

        setTimeTableData(res.data.timeTable);
      } catch (error) {
        console.error(error);
        console.log(
          "%c%s",
          "color:#bd4800",
          "get error from get time table data",
          "\n",
          error
        );
      }
      setLoading(false);
    })();
  }, [token]);

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className={styles.token_wrap}>
          <div className={styles.title}>token</div>
          <input value={token} onChange={(e) => setToken(e.target.value)} />
          <div className={styles.button} onClick={() => getToken()}>
            GET TOKEN
          </div>
          <div className={styles.button} onClick={() => timeStart()}>
            START
          </div>
          <div className={styles.button} onClick={() => timeStop()}>
            STOP
          </div>
          <div className={styles.time}>timeLeft: {time} sec</div>
        </div>
        {isLoading ? (
          "Loading..."
        ) : (
          <div className={styles.table_wrap}>
            {timeTableData?.map((data, idx) => (
              <div
                key={"list" + idx}
                className={styles.table_item}
                style={{
                  backgroundColor:
                    data.After_LoginTime_Sec < time ? "#f5f5f5" : "#ffffff",
                }}
                onClick={() => getItemDirectly(data.Intern_Quest_ID)}
              >
                <div>{data.Intern_Quest_ID}</div>
                <div>{data.Area}</div>
                <div>{data.After_LoginTime_Sec} sec</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.log}>
        {log?.map((data, idx) => (
          <div key={"log" + idx}>{JSON.stringify(data)}</div>
        ))}
      </div>
      <AlertMessage />
    </div>
  );
};

export default timeTableTest;
