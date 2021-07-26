import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import SubLayout from "../components/Layout/SubLayout";
import checkToken from "../utils/common/checkToken";
import useSubTimer from "../utils/customHook/useSubTimer";
import styles from "./device.module.scss";

const DeviceCheck = dynamic(
  () => import("../components/DeviceCheck/DeviceCheck"),
  {
    ssr: false,
  }
);

const device = ({ confirmData, now }) => {
  const router = useRouter();
  const time = useSubTimer(confirmData.SSDate, now);

  return (
    <div className={styles.wrap}>
      <SubLayout time={time} isTest={router.query.mod === "test"}>
        <DeviceCheck />
      </SubLayout>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  return await checkToken(ctx);
};

export default device;
