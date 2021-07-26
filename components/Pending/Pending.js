import styles from "./Pending.module.scss";

const Pending = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className="loaderSpinner" style={{ borderTopColor: "#222222" }} />
        <div className={styles.text}>
          감독위원이 응시자의 상태를 확인하고 있습니다.
          <br />
          감독위원의 안내가 5분 동안 없을 경우,
          <br />
          휴대전화 전원을 켠 후 비상연락처로 연락 주시기 바랍니다.
        </div>
      </div>
    </div>
  );
};

export default Pending;
