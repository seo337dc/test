import React from "react";
import AdminNav from "../AdminNav/AdminNav";
import AdminMenu from "../AdminMenu/AdminMenu";
import styles from "./AdminLayout.module.scss";

const AdminLayout = ({ children }) => {
  return (
    <div className={styles.wrap}>
      <AdminNav />
      <AdminMenu>
        <div className={styles.container}>{children}</div>
      </AdminMenu>
    </div>
  );
};

export default AdminLayout;
