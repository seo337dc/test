import AdminEmailLayout from "../AdminEmailLayout/AdminEmailLayout";
import styles from "./AdminEmailEditBr.module.scss";

const AdminEmailEditBr = ({ onHandleEditDelete, data }) => {
  return (
    <AdminEmailLayout title={data.type === "br" ? "한줄 띄기" : "빈 공간"}>
      <div className={styles.wrap} onClick={() => onHandleEditDelete(data)}>
        <div className={styles.cancel}>삭제</div>
      </div>
    </AdminEmailLayout>
  );
};

export default AdminEmailEditBr;
