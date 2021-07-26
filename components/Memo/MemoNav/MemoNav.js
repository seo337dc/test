import styles from "./MemoNav.module.scss";

const MemoNav = ({
  dragHandler,
  icon,
  setFocus,
  clickNavLeftIcon,
  clickClose,
}) => {
  return (
    <div className={styles.wrap} {...dragHandler}>
      <i
        className={icon}
        onClick={clickNavLeftIcon}
        onMouseDown={(e) => {
          setFocus();
          e.stopPropagation();
        }}
      />
      메모
      <i
        className="xi-close-thin"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={clickClose}
      />
    </div>
  );
};

export default MemoNav;
