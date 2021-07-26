import { useEffect } from "react";
import dynamic from "next/dynamic";
import checkAdminToken from "../../../utils/fetch/checkAdminToken";
import axios from "axios";
import styles from "./messengerEditor.module.scss";

const MessengerEditorBoard = dynamic(
  () =>
    import(
      "../../../components/Admin/MessengerEditorBoard/MessengerEditorBoard"
    ),
  { ssr: false }
);

const MessengerEditor = ({ token }) => {
  useEffect(() => {
    axios.defaults.headers.common["token"] = token;
  }, []);

  return (
    <div className={styles.wrap}>
      <MessengerEditorBoard />
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  return await checkAdminToken(ctx);
};

export default MessengerEditor;
