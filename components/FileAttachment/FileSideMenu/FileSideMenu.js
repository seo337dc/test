import styles from "./FileSideMenu.module.scss";

const SideMenu = ({ selected, onClick, data }) => {
  return (
    <div className={styles.wrap}>
      {data.map((innerData, idx) => (
        <div
          key={`attach_category_list_${idx}`}
          className={`${styles.item} ${
            selected === innerData.Category_CD ? styles.selected : ""
          }`}
          onClick={() => onClick(innerData.Category_CD)}
        >
          {innerData.Category_KORNM}
        </div>
      ))}
    </div>
  );
};

export default SideMenu;
