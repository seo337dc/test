import axios from "axios";
import { useEffect, useState } from "react";
import { ADMIN_ADDR_LOAD } from "../../../../utils/fetch/apiConfig";
import styles from "./AdminEmailReplyModal.module.scss";

const AdminEmailReplyModal = ({ setIsModal, setReply }) => {
  const [addresList, setAddresList] = useState([]);
  const [sendList, setSendList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post(ADMIN_ADDR_LOAD, {
          TEST_IDX: 1,
        });
        const tempAry = [];

        res.data.teamListData.forEach((d) =>
          d.addrListData.forEach((a) => tempAry.push(a))
        );

        setAddresList(tempAry);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const onHandleAdd = (item) => {
    setAddresList(
      addresList.filter((nowItem) => nowItem.addr_no !== item.addr_no)
    );
    setSendList(sendList.concat(item));
  };

  const onHandleDel = (item) => {
    setSendList(sendList.filter((nowItem) => nowItem.addr_no !== item.addr_no));

    setAddresList(addresList.concat(item));
  };

  const onHandleSubmit = () => {
    setReply((prev) => {
      return { ...prev, CC_Name: sendList };
    });
    setIsModal(false);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <i className="xi-close" onClick={() => setIsModal(false)} />
      </div>
      <div className={styles.body}>
        <div className={styles.address}>
          {addresList.map((item, index) => {
            return (
              <div
                className={styles.list}
                key={index}
                onClick={() => {
                  onHandleAdd(item);
                }}
              >
                <span>{`${item.u_name} ${item.u_position}`}</span>
                <i className="xi-arrow-right" />
              </div>
            );
          })}
        </div>
        <div className={styles.send}>
          {sendList.map((item, index) => {
            return (
              <div
                key={index}
                className={styles.list}
                onClick={() => onHandleDel(item)}
              >
                <i className="xi-arrow-left" />
                <span>{`${item.u_name} ${item.u_position}`}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.foot}>
        <div className={styles.btn} onClick={onHandleSubmit}>
          확인
        </div>
      </div>
    </div>
  );
};

export default AdminEmailReplyModal;
