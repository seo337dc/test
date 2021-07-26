import dynamic from "next/dynamic";
import { useEffect } from "react";
import checkAdminToken from "../../../utils/fetch/checkAdminToken";
import axios from "axios";
import styles from "./allEditor.module.scss";

const AdminEmail = dynamic(
  () => import("../../../components/Admin/AdminEmail/AdminEmail"),
  {
    ssr: false,
  }
);

const emailEditor = ({ token }) => {
  useEffect(() => {
    axios.defaults.headers.common["token"] = token;
  }, []);

  return (
    <div className={styles.wrap}>
      <AdminEmail />
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  return await checkAdminToken(ctx);
};

export default emailEditor;
