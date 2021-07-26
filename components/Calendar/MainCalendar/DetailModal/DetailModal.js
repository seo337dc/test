import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setMainCalendarData } from "../../../../utils/store/actions/calendarAction";
import Modal from "../../../Modal/Modal";
import axios from "axios";
import {
  VIEW_CALENDAR_ITEM,
  SCHEDULE_DELETE,
} from "../../../../utils/fetch/apiConfig";
import ConfirmModal from "../../../Modal/ConfirmModal/ConfirmModal";
import moment from "moment";
import styles from "./DetailModal.module.scss";

const DetailModal = ({
  id,
  clNo,
  setModalOpen,
  modalWidth,
  modalHeight,
  modalPosition: { top, left },
  setRegOpen,
}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const isLoading = useRef(false);

  const deleteSchedule = async () => {
    if (isLoading.current) {
      return;
    }

    try {
      isLoading.current = true;
      await axios.post(SCHEDULE_DELETE, {
        seq: id,
        internQuestId: data.internQuestId,
      });
      dispatch(setMainCalendarData());
      isLoading.current = false;
      setModalOpen(false);
    } catch (error) {
      console.error(error);
      isLoading.current = false;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        isLoading.current = true;
        const res = await axios.post(VIEW_CALENDAR_ITEM, {
          seq: id,
          clNo,
        });
        setData(res.data.data[0]);

        isLoading.current = false;
      } catch (error) {
        isLoading.current = false;
        setData(false);
      }
    })();
  }, []);

  return (
    <Modal style={{ top, left, zIndex: 10002 }} setModalOpen={setModalOpen}>
      {data && (
        <div
          className={styles.wrap}
          style={{
            width: modalWidth,
            height: modalHeight,
            border: `1px solid ${data.borderColor}`,
          }}
        >
          <div className={styles.header}>
            <div className={styles.title} style={{ color: data.borderColor }}>
              {data.writer}
            </div>
            <i className="xi-close" onClick={() => setModalOpen(false)} />
          </div>
          <div className={styles.container}>
            <div className={styles.sub}>{data.title}</div>
            <div className={styles.date}>
              {`${moment(data.start).format("YYYY.MM.DD HH:mm")} - ${moment(
                data.end
              ).format("YYYY.MM.DD HH:mm")}`}
              {/* <br />
              <span style={{ color: "#ACACAC" }}>
                {`${moment(data.start).format("HH:mm")} ~ ${moment(
                  data.end
                ).format("HH:mm")}`}
              </span> */}
            </div>
            <div className={styles.contents}>
              <div className={styles.cont_i}>
                {data.place && <i className="xi-maker" />}
                {data.place}
              </div>
              <div className={styles.cont_i}>
                {data.target && <i className="xi-users" />}
                {data.target}
              </div>
              {data.desc}
            </div>
          </div>
          {!data.isReadOnly && (
            <div className={styles.utils}>
              <img
                src="/img/pen_small.svg"
                alt="pen"
                onClick={() => {
                  setRegOpen(id);
                  setModalOpen(false);
                }}
              />
              <img
                src="/img/trash_small.svg"
                alt="trash"
                onClick={() => setDeleteModalOpen(true)}
              />
            </div>
          )}
        </div>
      )}
      {isDeleteModalOpen && (
        <ConfirmModal
          setModalOpen={setDeleteModalOpen}
          yesText="삭제"
          yesStyle={{
            border: "1px solid #DA291C",
            color: "#ffffff",
            backgroundColor: "#DA291C",
          }}
          noText="취소"
          noStyle={{
            border: "1px solid #ACACAC",
            color: "#ACACAC",
            backgroundColor: "#ffffff",
          }}
          onYesClick={() => deleteSchedule()}
          onNoClick={() => setDeleteModalOpen(false)}
        >
          <div className={styles.del_wrap}>
            <img src="/img/memo_modal_trash.svg" alt="trash" />
            해당 일정을 삭제하시겠습니까?
          </div>
        </ConfirmModal>
      )}
    </Modal>
  );
};

export default DetailModal;
