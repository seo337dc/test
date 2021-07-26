import { useEffect } from "react";
import dynamic from "next/dynamic";
import SubLayout from "../components/Layout/SubLayout";
import checkToken from "../utils/common/checkToken";
import useSubTimer from "../utils/customHook/useSubTimer";
import useUprismInit from "../utils/customHook/useUprismInit";
import axios from "axios";
import styles from "./info.module.scss";

const InfoMain = dynamic(() => import("../components/Info/InfoMain"), {
  ssr: false,
});

const info = ({ token, confirmData, now }) => {
  useUprismInit(confirmData.External_Code, confirmData.Room_ID);
  const time = useSubTimer(confirmData.SSDate, now);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["token"] = token;
    }
  }, []);

  return (
    <div className={styles.wrap}>
      <SubLayout time={time}>
        <InfoMain />
      </SubLayout>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  return await checkToken(ctx);
};

export default info;
