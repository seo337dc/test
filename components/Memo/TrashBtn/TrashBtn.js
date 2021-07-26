import { useState } from "react";
import MemoTrash from "../../SVGIcons/MemoTrash";
import styles from "./TrashBtn.module.scss";

const TrashBtn = ({ onClick }) => {
  const [isHover, setHover] = useState(false);

  return (
    <div
      className={`${styles.wrap} ${isHover ? styles.hover : ""}`}
      onClick={onClick}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <MemoTrash color={isHover ? "#000000" : "#ffffff"} />
    </div>
  );
};

export default TrashBtn;
