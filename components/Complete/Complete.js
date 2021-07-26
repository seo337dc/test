import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import exit from "../../utils/common/exit";
import styles from "./Complete.module.scss";

const waitSec = 10;

const Complete = () => {
  const router = useRouter();
  const userState = useSelector((state) => state.userState);
  const userInfo = useSelector((state) => state.userInfo);
  const [completeState, setCompleteState] = useState("WAIT"); //WAIT, COMPLETE, PENDING, SET

  useEffect(() => {
    if (completeState === "WAIT") {
      return;
    }

    if (userState.isWaitingToLeave) {
      setCompleteState("PENDING");
    } else {
      setCompleteState("COMPLETE");
    }
  }, [userState, completeState]);

  useEffect(() => {
    setTimeout(() => {
      setCompleteState("SET");
    }, waitSec * 1000);
  }, []);

  if (completeState === "COMPLETE") {
    return (
      <div className={styles.wrap}>
        <div className={styles.container}>
          <img
            src="/img/clapping.svg"
            alt="waiting finish"
            className={styles.img}
          />
          <div className={styles.ctx_done}>
            {userInfo.isPreCheck ? (
              <>
                수고하셨습니다. 모든 사전점검이 완료되었습니다.
                <br />
                아래 사전점검 종료 버튼을 클릭하여 프로그램을 종료해주세요.
              </>
            ) : (
              <>
                수고하셨습니다. 모든 진단이 완료되었습니다.
                <br />
                아래 종료 버튼을 클릭하여 프로그램을 종료해주세요.
              </>
            )}
          </div>
          <div className={styles.exit} onClick={() => exit(router)}>
            {userInfo.isPreCheck ? "사전점검 종료" : "진단 종료"}
          </div>
        </div>
      </div>
    );
  }

  if (completeState === "PENDING") {
    return (
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.ctx}>
            감독위원이 확인 중입니다. 종료확인 버튼이 나올 때까지 기다려주세요.
          </div>
          <div className="loaderSpinner" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className={styles.ctx}>
          {userInfo.isPreCheck ? (
            <>사전점검이 종료되었습니다. 잠시 대기해주세요.</>
          ) : (
            <>
              업무가 종료되었습니다. <br />
              감독위원이 최종 확인하기 전까지 자리에 앉아 잠시 대기해주세요.
            </>
          )}
        </div>
        <div className="loaderSpinner" />
      </div>
    </div>
  );
};

export default Complete;
