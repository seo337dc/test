import { useRouter } from "next/router";
import styles from "./AdminMenu.module.scss";

const Menu = ({ children }) => {
  const router = useRouter();
  return (
    <div className={styles.wrap}>
      <div className={styles.side}>
        <div className={styles.side_container}>
          <div
            className={styles.menu}
            onClick={() => {
              router.push(`/admin/dashboard/?menu=email`);
            }}
            style={{
              backgroundColor: router.query.menu === "email" ? "#eeeeee" : "",
            }}
          >
            메일함
          </div>
          <div
            className={styles.menu}
            onClick={() => {
              router.push(`/admin/dashboard/?menu=document`);
            }}
            style={{
              backgroundColor:
                router.query.menu === "document" ? "#eeeeee" : "",
            }}
          >
            자료실
          </div>
          <div
            className={styles.menu}
            onClick={() => {
              router.push(`/admin/dashboard/?menu=messenger`);
            }}
            style={{
              backgroundColor:
                router.query.menu === "messenger" ? "#eeeeee" : "",
            }}
          >
            메신저
          </div>
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Menu;
