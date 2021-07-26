import styles from "./BusinessCard.module.scss";

const BusinessCard = ({ data }) => {
  return (
    <div className={styles.wrap}>
      <img className={styles.logo} src="/img/lotte_logo.svg" />
      <div className={styles.info_wrap}>
        <div className={styles.name}>
          <span>{data.U_NAME} </span>
          {data.U_POSITION} / {data.U_ENGPOSITION}
        </div>
        <div className={styles.info}>
          <p>롯데그룹 {data.TEAM_NAME}</p>
          LOTTE / {data.TEAM_ENGNAME}
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
