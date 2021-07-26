import { useState } from "react";
import parser from "react-html-parser";
import styles from "./InfoList.module.scss";

const InfoList = ({ data }) => {
  const [isItemOpen, setItemOpen] = useState(false);

  return (
    <div className={styles.wrap} onClick={() => setItemOpen((prev) => !prev)}>
      <div className={styles.title}>
        <i
          className="xi-angle-up"
          style={{ transform: isItemOpen ? "rotate(180deg)" : "" }}
        />
        {parser(data.Q)}
      </div>
      <div
        className={styles.container}
        style={{ height: isItemOpen ? "" : 0, padding: isItemOpen ? "" : 0 }}
      >
        {parser(data.A)}
      </div>
    </div>
  );
};

export default InfoList;
