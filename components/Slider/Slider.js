import { useState } from "react";
import styles from "./Slider.module.scss";

const Slider = ({ title = "", children }) => {
  const [isSliderOpen, setSliderOpen] = useState(false);

  return (
    <div className={styles.wrap}>
      <div
        className={`${styles.header} ${isSliderOpen ? styles.header_down : ""}`}
        onClick={() => setSliderOpen((prev) => !prev)}
      >
        <i className={`xi-angle-down ${isSliderOpen ? styles.down : ""}`} />
        {title}
      </div>
      <div
        className={`${styles.container} ${
          isSliderOpen ? styles.open : styles.close
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Slider;
