import { useState } from "react";
import styles from "./AngleBtn.module.scss";

const AngleBtn = ({ onClick, isOpen }) => {
  const [isHover, setHover] = useState(false);

  return (
    <div
      className={styles.slide}
      onClick={onClick}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <i className={`xi-angle-left ${isOpen ? "" : styles.close}`} />
      {isHover && (
        <div className={styles.toggle}>
          {isOpen ? "목록을 숨길 수 있습니다." : "목록을 펼칠 수 있습니다."}
          <div className={styles.angle} />
        </div>
      )}
    </div>
  );
};

export default AngleBtn;
