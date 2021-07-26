import { useDispatch, useSelector } from "react-redux";
import { removeScreen } from "../../../utils/store/actions/divisionActions";
import { setMailList } from "../../../utils/store/actions/mailActions";
import styles from "./MailNav.module.scss";

const typeList = [
  { key: "from", value: "받은 메일" },
  { key: "to", value: "보낸 메일" },
  { key: "temp", value: "임시 보관" },
];

const MailNav = ({ idx, mailType, setMailType, isListOpen, setListOpen }) => {
  const dispatch = useDispatch();
  const unReadCount = useSelector(
    (state) =>
      state.mailList.listData.filter((data) => data.read_yn === "N").length
  );

  const onClick = (key) => {
    setMailType(key);
    dispatch(setMailList(key));
    if (!isListOpen) setListOpen(true);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        {typeList.map((type) => (
          <div
            className={`${styles.menu} ${
              mailType === type.key && styles.selected
            }`}
            key={type.key}
            onClick={() => onClick(type.key)}
          >
            {type.value}
            {type.key === "from" && unReadCount !== 0 && (
              <div className={styles.count}>{unReadCount}</div>
            )}
          </div>
        ))}
      </div>
      <i
        className="xi-close-thin"
        onClick={() => dispatch(removeScreen(idx))}
      />
    </div>
  );
};

export default MailNav;
