import { Fragment, useState } from "react";
import ModalCommon from "../Modal/ModalCommon/ModalCommon";
import InfoList from "./InfoList";
import faqData from "../../utils/data/faqData";
import helpData from "../../utils/data/helpData";
import styles from "./InfoSlide.module.scss";

const InfoSlide = ({ setModalOpen, isFAQ }) => {
  const [picked, setPicked] = useState("전체");
  const [FAQListData, setFAQListData] = useState(isFAQ ? faqData : helpData);

  return (
    <ModalCommon
      bigTitle
      title={isFAQ ? "FAQ" : "도움말"}
      setModalOpen={setModalOpen}
      style={{ borderRadius: 10 }}
    >
      <div className={styles.wrap}>
        <div className={styles.menu_wrap}>
          {FAQListData.map((data) => (
            <div
              className={`${styles.menu} ${
                picked === data.index ? styles.picked : ""
              }`}
              onClick={() => setPicked(data.index)}
              key={`faq_${data.index}`}
            >
              {data.index}
            </div>
          ))}
        </div>
        <div className={styles.container}>
          {picked === "전체"
            ? FAQListData.map(
                (data, idx) =>
                  data.items.length !== 0 && (
                    <Fragment key={`faq_all_wrap_${data.index}_${idx}`}>
                      <div className={styles.title}>{data.index}</div>
                      {data.items.map((itemsData, idx) => (
                        <InfoList
                          key={`faq_all_ctx${data.index}_${idx}`}
                          data={itemsData}
                        />
                      ))}
                    </Fragment>
                  )
              )
            : FAQListData.filter((data) => data.index === picked).map((data) =>
                data.items.map((itemData, idx) => (
                  <InfoList
                    key={`faq_ctx_${data.index}_${idx}`}
                    data={itemData}
                  />
                ))
              )}
        </div>
      </div>
    </ModalCommon>
  );
};

export default InfoSlide;
