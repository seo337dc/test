import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import styles from "./DivLayout.module.scss";

const Mail = dynamic(() => import("../Mail/Mail"), { ssr: false });
const Docs = dynamic(() => import("../Docs/Docs"), { ssr: false });
const Calendar = dynamic(() => import("../Calendar/Calendar"), { ssr: false });
const Complete = dynamic(() => import("../Complete/Complete"), { ssr: false });
const Pending = dynamic(() => import("../Pending/Pending"), { ssr: false });

const componentMap = {
  Mail: (idx) => <Mail idx={idx} />,
  Docs: (idx) => <Docs idx={idx} />,
  Calendar: (idx) => <Calendar idx={idx} />,
};

const DivLayout = () => {
  const userState = useSelector((state) => state.userState);
  const division = useSelector((state) => state.division);

  if (!userState.check) {
    return (
      <div className={styles.wrap}>
        <Pending />
      </div>
    );
  }

  if (userState.testState === "FINISH") {
    return (
      <div className={styles.wrap}>
        <Complete />
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      {division.length > 0 ? (
        division.map(({ component, id }, idx) => (
          <div
            key={`${component}_${id}`}
            className={styles.container}
            style={{ width: `${100 / division.length}%` }}
          >
            {component ? (
              componentMap[component](idx, id)
            ) : (
              <div className={styles.empty}>
                상단 메뉴 앱을 클릭해주세요.
                <br />
                (메모장, 메신저, 계산기는 해당되지 않습니다.)
              </div>
            )}
          </div>
        ))
      ) : (
        <div className={styles.empty}>
          상단 메뉴 앱을 클릭해주세요.
          <br />
          (메모장, 메신저, 계산기는 해당되지 않습니다.)
        </div>
      )}
    </div>
  );
};

export default DivLayout;
