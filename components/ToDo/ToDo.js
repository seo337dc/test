import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToDoList } from "../../utils/store/actions/todoAction";
import Modal from "../Modal/Modal";
import ProgressBar from "./ProgressBar/ProgressBar";
import styles from "./ToDo.module.scss";

const ToDo = ({ setModalOpen, style }) => {
  const dispatch = useDispatch();
  const listData = useSelector((state) => state.todo.todo);
  const container = useRef();

  const handleClickOutside = (e) => {
    if (container.current) {
      setModalOpen(container.current.contains(e.target));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    () => document.removeEventListener("mousedown", handleClickOutside);
  }, [container.current]);

  useEffect(() => {
    dispatch(getToDoList());
  }, []);

  return (
    <Modal setModalOpen={setModalOpen} style={{ borderRadius: 10, ...style }}>
      <div className={styles.wrap} ref={container}>
        {listData?.map((data, idx) => (
          <ProgressBar
            key={`todo_list_${idx}`}
            title={data.AREA}
            current={data.TODO_Y}
            total={data.TODO_TOTAL}
          />
        ))}
      </div>
    </Modal>
  );
};

export default ToDo;
