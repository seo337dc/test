import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUprismInit } from "../store/actions/uprismStateAction";

const useUprismInit = (External_Code, Room_ID) => {
  const uprismState = useSelector((state) => state.uprismState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (uprismState.state === "BEFORE_INIT" || uprismState.state === "FAIL") {
      dispatch(setUprismInit(External_Code, Room_ID));
    }
  }, []);
};

export default useUprismInit;
