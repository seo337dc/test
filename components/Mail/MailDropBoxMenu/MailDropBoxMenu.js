import { useSelector } from "react-redux";
import DropBox from "../../Dropbox/DropBox";
import styles from "./MailDropBoxMenu.module.scss";

const MailDropBoxMenu = ({
  setDropBoxOpen,
  config,
  setConfig,
  setInnerConfig,
  setViewData,
  menuList,
  style,
}) => {
  const fromCount = useSelector((state) => state.mailList.listData.length);
  const toCount = useSelector((state) => state.mailToList.listData.length);
  const tempCount = useSelector((state) => state.mailTempList.listData.length);

  const clickMenu = (str) => {
    setConfig(str);
    setDropBoxOpen(false);
    setViewData(false);
    setInnerConfig("view");
  };

  return (
    <DropBox setDropBoxOpen={setDropBoxOpen} style={style}>
      <div className={styles.item} onClick={() => clickMenu("from")}>
        <div className={config === "from" ? "" : styles.item_disable}>
          {menuList[0]}
        </div>
        <div className={styles.from}>{fromCount}</div>
      </div>
      <div className={styles.item} onClick={() => clickMenu("to")}>
        <div className={config === "to" ? "" : styles.item_disable}>
          {menuList[1]}
        </div>
        <div className={styles.to}>{toCount}</div>
      </div>
      <div className={styles.item} onClick={() => clickMenu("temp")}>
        <div className={config === "temp" ? "" : styles.item_disable}>
          {menuList[2]}
        </div>
        <div className={styles.temp}>{tempCount}</div>
      </div>
      {/* <div
        className={`${styles.item} ${styles.write}`}
        onClick={() => clickMenu("send")}
      >
        새 메일 쓰기
      </div> */}
    </DropBox>
  );
};

export default MailDropBoxMenu;
