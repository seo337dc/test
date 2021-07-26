import { useRouter } from "next/router";
import styles from "./AdminEditorNav.module.scss";

const AdminEditorNav = ({ onHandleSubmit, title, loc, setIsCopy }) => {
  const router = useRouter();

  return (
    <div className={styles.wrap}>
      <div className={styles.title_wrap}>
        <i
          className="xi-angle-left"
          onClick={() =>
            router.push(`/admin/dashboard?menu=${loc ? loc : "email"}`)
          }
        />
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.btn_wrap}>
        <i className="xi-save" onClick={onHandleSubmit} />
        {(loc === "email" || loc === "document") && (
          <i className="xi-copyright" onClick={() => setIsCopy(true)} />
        )}
      </div>
    </div>
  );
};

export default AdminEditorNav;
