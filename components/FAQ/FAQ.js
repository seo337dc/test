import { useState } from "react";
import InfoSlide from "../InfoSlide/InfoSlide";
import Contact from "../Contact/Contact";
import styles from "./FAQ.module.scss";

const FAQ = ({ fixed, top, left, right, bottom, reverse, disableContact }) => {
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [isFAQOpen, setFAQOpen] = useState(false);
  const [isHover, setHover] = useState(false);

  return (
    <div
      className={`${styles.wrap} ${reverse ? styles.reverse : ""}`}
      style={{ position: fixed ? "fixed" : "", top, left, right, bottom }}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={styles.ctx}>
        <img src="/img/faq1.svg" alt="faq" />
        <div className={styles.text}>문제가 있나요?</div>
        {isHover && (
          <div
            className={`${styles.container} ${reverse ? styles.con_re : ""}`}
          >
            <div className={`${styles.inner} ${reverse ? styles.i_re : ""}`}>
              <div className={styles.menu} onClick={() => setFAQOpen(true)}>
                FAQ 확인하기
              </div>
              {!disableContact && (
                <>
                  <div
                    className={`${styles.hr} ${reverse ? styles.hr_re : ""}`}
                  />
                  <div
                    className={styles.menu}
                    onClick={() => setContactModalOpen(true)}
                  >
                    1:1 문의 작성하기
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {isFAQOpen && <InfoSlide isFAQ setModalOpen={setFAQOpen} />}
      {isContactModalOpen && <Contact setModalOpen={setContactModalOpen} />}
    </div>
  );
};

export default FAQ;
