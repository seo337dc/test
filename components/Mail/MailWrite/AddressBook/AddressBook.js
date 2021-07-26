import { useState } from "react";
import { useSelector } from "react-redux";
import ModalCommon from "../../../Modal/ModalCommon/ModalCommon";
import AddresTab from "./AddressTab/AddressTab";
import AddresContainer from "./AddressContainer/AddressContainer";
import AddressInOutBox from "./AddressInOutBox/AddressInOutBox";
import CalendarInOutBox from "./CalendarInOutBox/CalendarInOutBox";
import BlockBtn from "../../../Buttons/BlockBtn/BlockBtn";
import styles from "./AddressBook.module.scss";

/**
 * @param {function} setModalOpen 주소록을 끄고 닫는 setState
 * @param {boolean} isCalendar 저장소가 참석자일 경우 true
 */

const AddresBook = ({ setModalOpen, isCalendar, viewData, setViewData }) => {
  const addressList = useSelector((state) => state.addressList.teamListData);
  const [type, setType] = useState("IN");

  const [cc, setCc] = useState(viewData.replyCC || []);
  const [hideCc, setHideCc] = useState(viewData.hideCc || []);
  const [att, setAtt] = useState([]);

  const onClick = () => {
    if (isCalendar) {
    } else {
      setViewData((prev) => {
        return { ...prev, replyCC: cc };
      });
    }
    setModalOpen(false);
  };

  return (
    <ModalCommon setModalOpen={setModalOpen} title="주소록">
      <div className={styles.wrap}>
        <div className={styles.left_wrap}>
          <AddresTab type={type} setType={setType} />
          <AddresContainer type={type} addressList={addressList} />
        </div>
        <div className={styles.right_wrap}>
          {isCalendar ? (
            <>
              <div className={styles.in_out_wrap}>
                <div className={styles.title}>참석자</div>
                <CalendarInOutBox
                  selectedItem={[]}
                  setSelectedItem={() => {}}
                  item={att}
                  setItem={setAtt}
                />
              </div>
            </>
          ) : (
            <>
              <div className={styles.in_out_wrap}>
                <div className={styles.title}>받는 사람</div>
                <AddressInOutBox
                  item={[
                    {
                      u_name: viewData.from_name.split(" ")[0],
                      u_position: viewData.from_name.split(" ")[1],
                    },
                  ]}
                  sender={true}
                />
              </div>
              <div className={styles.in_out_wrap}>
                <div className={styles.title}>참조</div>
                <AddressInOutBox
                  addressList={addressList}
                  item={cc}
                  setItem={setCc}
                />
              </div>
              <div className={styles.in_out_wrap}>
                <div className={styles.title}>숨은 참조</div>
                <AddressInOutBox
                  addressList={addressList}
                  item={hideCc}
                  setItem={setHideCc}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <BlockBtn
        color="gold"
        style={{ width: 210, height: 60, margin: "0 auto" }}
        onClick={onClick}
      >
        확인
      </BlockBtn>
    </ModalCommon>
  );
};

export default AddresBook;
