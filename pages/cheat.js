import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SubLayout from "../components/Layout/SubLayout";
import AlertIcon from "../components/SVGIcons/AlertIcon";
import checkToken from "../utils/common/checkToken";
import axios from "axios";
import { SEND_CHEAT_MESSAGE } from "../utils/fetch/apiConfig";
import styles from "./cheat.module.scss";
import exit from "../utils/common/exit";

const exitSec = 10;

const memoText = {
  monitor: "추가 모니터가 감지되었습니다.",
  program: "허용되지 않은 프로그램이 감지되었습니다.",
  duplicateLogin: "중복 로그인이 감지되었습니다.",
};

const cheat = ({ token }) => {
  const router = useRouter();
  const [time, setTime] = useState(exitSec);

  useEffect(() => {
    (async () => {
      if (token) {
        try {
          await axios.post(
            SEND_CHEAT_MESSAGE,
            {
              MEMO: router.query.memo
                ? memoText[router.query.memo]
                : "잘못된 접근",
            },
            {
              headers: {
                token,
              },
            }
          );
        } catch (error) {
          console.error(error);
        }
      }
    })();
    const intv = setInterval(() => {
      setTime((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    setTimeout(() => exit(router), 10000);
    return () => clearInterval(intv);
  }, []);

  if (token) {
    return (
      <SubLayout>
        <div className={styles.wrap}>
          <AlertIcon color="#DA291C" />
          <div className={styles.title}>
            {router.query.memo ? memoText[router.query.memo] : ""}
          </div>
          <div className={styles.text}>
            부정행위가 감지되어 진단이 자동 종료됩니다.
          </div>
          <div className={styles.count}>{time}</div>
        </div>
      </SubLayout>
    );
  } else {
    return (
      <SubLayout>
        <div className={styles.wrap}>
          <AlertIcon color="#DA291C" />
          <div className={styles.title}>
            {router.query.memo ? memoText[router.query.memo] : ""}
          </div>
          <div className={styles.text}>
            사전점검 및 본 진단 로그인 후 추가 모니터 연결, 타인과의 소통, 문항
            유출 시도 시
            <br />
            진단 프로그램이 강제 종료될 수 있으며,
            <span> 재접속이 불가</span>한 점 유의하시기 바랍니다.
            <br />
            {router.query.memo === "monitor" && (
              <>
                추가 <span>모니터 연결을 해제한 후</span> 재로그인 하시기
                바랍니다.
              </>
            )}
            {router.query.memo === "program" && (
              <>
                <span>진단 프로그램을 제외한 모든 프로그램을 종료한 후 </span>
                재로그인 하시기 바랍니다.
              </>
            )}
          </div>
          <div className={styles.count}>{time}</div>
        </div>
      </SubLayout>
    );
  }
};

export const getServerSideProps = async (ctx) => {
  return await checkToken(ctx, { isCheatPage: true });
};

export default cheat;
