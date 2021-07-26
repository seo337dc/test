import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import axios from "axios";
import checkToken from "../../utils/common/checkToken";
import {
  setAddressList,
  setMailList,
} from "../../utils/store/actions/mailActions";
import useUprismInit from "../../utils/customHook/useUprismInit";
import useTimer from "../../utils/customHook/useTimer";
import Layout from "../../components/Layout/Layout";
import DivLayout from "../../components/DivLayout/DivLayout";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import Memo from "../../components/Memo/Memo";

const Messenger = dynamic(
  () => import("../../components/Messenger/Messenger"),
  { ssr: false }
);

const Calculator = dynamic(
  () => import("../../components/Calculator/Calculator"),
  { ssr: false }
);

const PtEditor = dynamic(() => import("../../components/PtEditor/PtEditor"), {
  ssr: false,
});

const Main = ({ token, confirmData }) => {
  const dispatch = useDispatch();
  useUprismInit(confirmData.External_Code, confirmData.Room_ID);
  const { isMessengerOpen, isMemoOpen, isCalcOpen, isPtEditorOpen } =
    useSelector((state) => state.modalState);
  const userState = useSelector((state) => state.userState);
  const [startTimer, stopTimer] = useTimer({
    redux: true,
    reverse: true,
    mainOps: {
      startTime: confirmData.Virtual_Date,
      afterTime: confirmData.After_Time,
      timeLimit: confirmData.Limited_Time,
    },
  });

  useEffect(() => {
    if (userState.check) {
      startTimer();
    } else {
      stopTimer();
    }
  }, [userState.check]);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["token"] = token;
      dispatch(setAddressList(token));
      dispatch(setMailList("from", token));
    }
  }, [token]);

  return (
    <Layout>
      <DivLayout />
      {isMessengerOpen && <Messenger />}
      {isMemoOpen && <Memo />}
      {isCalcOpen && <Calculator />}
      {isPtEditorOpen && <PtEditor />}
      <AlertMessage />
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  return await checkToken(ctx);
};

export default Main;
