import { SortableHandle } from "react-sortable-hoc";
import styles from "./AdminEmailLayout.module.scss";

const SortableHandler = SortableHandle(() => (
  <i className="xi-arrows" alt="cancel" />
));

const AdminEmailLayout = ({ children, title }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        <p className={styles.title_name}>{title}</p>
        <div className={styles.title_button}>
          <SortableHandler />
        </div>
      </div>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default AdminEmailLayout;
