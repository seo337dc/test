import { useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import SubLayout from "../components/Layout/SubLayout";
import checkToken from "../utils/common/checkToken";
import useSubTimer from "../utils/customHook/useSubTimer";
import useUprismInit from "../utils/customHook/useUprismInit";
import axios from "axios";
import { START_TEST } from "../utils/fetch/apiConfig";
import { Notice } from "../components/Info/InfoMain";
import styles from "./ready.module.scss";

const Ready = dynamic(() => import("../components/Ready/Ready"), {
  ssr: false,
});

const ready = ({ token, confirmData, now }) => {
  useUprismInit(confirmData.External_Code, confirmData.Room_ID);
  const router = useRouter();
  const time = useSubTimer(confirmData.SSDate, now);

  const startTest = async () => {
    try {
      await axios.post(START_TEST);
      router.push("/main");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["token"] = token;
    }
  }, []);

  useEffect(() => {
    if (router.pathname === "/ready" && time === 0) {
      startTest();
    }
  }, [time, router]);

  return (
    <div className={styles.wrap}>
      <SubLayout time={time}>
        <Ready time={time} Notice={Notice} />
      </SubLayout>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  return await checkToken(ctx);
};

export default ready;
