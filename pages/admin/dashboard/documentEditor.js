import { useEffect } from "react";
import dynamic from "next/dynamic";
import checkAdminToken from "../../../utils/fetch/checkAdminToken";
import axios from "axios";
import styles from "./allEditor.module.scss";

const AdminBoard = dynamic(
  () => import("../../../components/Admin/AdminBoard/AdminBoard"),
  {
    ssr: false,
  }
);

const boardEditor = ({ token }) => {
  useEffect(() => {
    axios.defaults.headers.common["token"] = token;
  }, []);

  return (
    <div className={styles.wrap}>
      <AdminBoard />
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  return await checkAdminToken(ctx);
};

export default boardEditor;
