import styles from "./ItemBoxBtn.module.scss";

const ItemBoxBtn = ({ onClick, children, ditinct }) => {
  return (
    <div className={!ditinct ? styles.wrap : styles[ditinct]} onClick={onClick}>
      {children}
    </div>
  );
};

export default ItemBoxBtn;
