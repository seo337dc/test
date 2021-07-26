import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToDoList } from "../../utils/store/actions/todoAction";
import { setTestStateFinish } from "../../utils/store/actions/userStateAction";
import ConfirmModal from "../Modal/ConfirmModal/ConfirmModal";
import AlertIcon from "../SVGIcons/AlertIcon";
import styles from "./EndTest.module.scss";

const EndTest = ({ setModalOpen }) => {
  const dispatch = useDispatch();
  const [isSure, setSure] = useState(false);
  const unfinishedTask = useSelector((state) => {
    let unfinishedCount = 0;
    state.todo.todo?.forEach(
      (task) => (unfinishedCount += parseInt(task.TODO_N))
    );
    return unfinishedCount;
  });

  const setFinish = () => {
    setModalOpen(false);
    dispatch(setTestStateFinish());
  };

  useEffect(() => {
    dispatch(getToDoList());
  }, []);

  return (
    <ConfirmModal
      setModalOpen={setModalOpen}
      onYesClick={() =>
        isSure
          ? setFinish()
          : unfinishedTask === 0
          ? setFinish()
          : setSure(true)
      }
      onNoClick={() => setModalOpen(false)}
      colorReverse
    >
      {isSure ? (
        <div className={styles.wrap}>
          <AlertIcon color="#DA291C" />
          <div className={styles.text}>
            <span>아직 완료되지 않은 업무</span>
            가 남아있습니다.
            <br />
            (남은 업무 <span>{unfinishedTask}</span>개)
            <br />
            (좌측 상단 <span>"할 일"</span> 버튼으로 확인 가능)
            <br />
            그래도 업무를 종료하시겠습니까?
          </div>
        </div>
      ) : (
        <div className={styles.wrap}>
          <AlertIcon color="#000000" />
          <div className={styles.text}>
            업무를 종료하시겠습니까?
            <br />
            종료 후 재시작은 불가능합니다.
          </div>
        </div>
      )}
    </ConfirmModal>
  );
};

export default EndTest;
