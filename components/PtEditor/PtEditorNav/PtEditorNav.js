import styles from "./PtEditorNav.module.scss";

const PtEditorNav = ({
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
      에디터
      <i
        className="xi-close-thin"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={clickClose}
      />
    </div>
  );
};

export default PtEditorNav;
