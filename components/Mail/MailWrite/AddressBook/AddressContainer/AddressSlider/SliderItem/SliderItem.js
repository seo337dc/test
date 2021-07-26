import styles from "./SliderItem.module.scss";

const SliderItem = ({ innerData, data, idx, onClick }) => {
  return (
    <div
      key={`sliderItem_${innerData.addr_no}_${idx}`}
      className={styles.wrap}
      onClick={() => onClick(innerData, data)}
    >
      <div
        className={`${styles.check} ${innerData.checked ? styles.checked : ""}`}
      />
      <span style={{ color: innerData.u_name.includes(" ") && "red" }}>
        {innerData.u_name} {innerData.u_position}
      </span>
      <div className={styles.team_name}>
        <span style={{ color: innerData.u_name.includes(" ") && "red" }}>
          {data.team_name}
        </span>
      </div>
    </div>
  );
};

export default SliderItem;
