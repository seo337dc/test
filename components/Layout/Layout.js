import Head from "next/head";
import Nav from "../Nav/Nav";
import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>LOTTE</title>
      </Head>
      <div className={styles.wrap}>
        <Nav />
        <div className={styles.container}>{children}</div>
      </div>
    </>
  );
};

export default Layout;
