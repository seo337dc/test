import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setCookie } from "nookies";
import axios from "axios";
import useTimer from "../utils/customHook/useTimer";
import { setUserInfo } from "../utils/store/actions/userInfoAction";
import { setTimeTable } from "../utils/store/actions/timeTableAction";
import { phoneFomatter, timerFomatter } from "../utils/common/fomatter";
import { SEND_PHONE_NUM, LOGIN, CONFIRM } from "../utils/fetch/apiConfig";
import FAQ from "../components/FAQ/FAQ";
import Exit from "../components/Exit/Exit";
import Logo from "../components/Logo/Logo";
import styles from "./index.module.scss";

const errorMsg = "관리자에게 문의하세요.";

const Index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [sendedInfo, setSendedInfo] = useState(false);
  const [time, setTime, timeStart, timeStop] = useTimer();
  const [input, setInput] = useState("");
  const [comment, setComment] = useState("");
  // const [isPerAgOpen, setPerAgOpen] = useState("");

  const checkLoginState = (res) =>
    res.data.result === "preCheckTest" ||
    res.data.result === "firstTest" ||
    res.data.result === "secondTest";

  const sendAuthNum = async () => {
    try {
      const res = await axios.post(LOGIN, {
        phoneNum: sendedInfo,
        confirmNo: input,
      });

      if (checkLoginState(res)) {
        dispatch(setUserInfo(res.data.Tester));
        dispatch(setTimeTable(res.data.TimeTable));

        axios.defaults.headers.common["token"] = res.data.token;

        setCookie(null, "token", res.data.token, {
          path: "/",
          maxAge: 99999,
        });

        if (res.data.result === "preCheckTest") {
          router.push("/prevInfo");
        } else if (res.data.result === "firstTest") {
          router.push("/device");
        } else if (res.data.result === "secondTest") {
          router.push("/ready");
        }
      } else {
        setComment(res.data.msg);
      }
    } catch (error) {
      setComment(errorMsg);
      console.error(error);
    }
  };

  const sendPhoneNum = async () => {
    try {
      const res = await axios.post(SEND_PHONE_NUM, {
        phoneNum: input,
      });

      if (checkLoginState(res)) {
        setSendedInfo(input);
        setComment("");
        setInput("");
        timeStart();
      } else {
        setComment(res.data.msg);
      }
    } catch (error) {
      setComment(errorMsg);
      console.error(error);
    }
  };

  const sendInput = (e) => {
    e.preventDefault();

    if (sendedInfo) {
      sendAuthNum();
    } else {
      sendPhoneNum();
    }
  };

  useEffect(() => {
    if (time === 0) {
      setInput("");
      setSendedInfo(false);
      timeStop(true);
    }
  }, [time]);

  return (
    <div className={styles.wrap}>
      <video muted autoPlay loop playsInline>
        <source src="/img/lotte_login_bg.webm" type="video/webm" />
      </video>
      <Logo style={{ position: "fixed", top: 27, left: 32 }} />

      <div className={styles.login_wrap}>
        <div className={styles.title}>
          {router.query.c === "ac" ? "VAC" : "L-TAB"}
        </div>
        <form>
          <div className={styles.input_wrap}>
            <input
              placeholder={sendedInfo ? "인증 번호 입력" : "휴대전화 번호 입력"}
              maxLength={sendedInfo ? 6 : 13}
              value={sendedInfo ? input : phoneFomatter(input)}
              onChange={(e) => setInput(e.target.value.replace(/[^0-9]/g, ""))}
            />
            {sendedInfo && (
              <div className={styles.timer}>
                <i className="xi-time-o" />
                {timerFomatter(time)}
              </div>
            )}
          </div>
          <button onClick={(e) => sendInput(e)}>
            {sendedInfo ? "로그인" : "인증번호 발송"}
          </button>
        </form>

        {comment && (
          <div className={styles.comment}>
            <i className="xi-info" />
            {comment}
          </div>
        )}
        <div className={styles.hotspot}>
          {`사전 점검 및 본 진단 시, 휴대전화 통한 핫스팟 사용 금지`}
        </div>
      </div>

      <FAQ fixed top={25} right={100} />
      <Exit fixed top={21} right={30} />
    </div>
  );
};

export default Index;
