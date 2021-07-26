import { useState } from "react";
import { useSelector } from "react-redux";
import BlockBtn from "../../Buttons/BlockBtn/BlockBtn";
import CalendarInOutBox from "../../Mail/MailWrite/AddressBook/CalendarInOutBox/CalendarInOutBox";
import AddresTab from "../../Mail/MailWrite/AddressBook/AddressTab/AddressTab";
import AddresContainer from "../../Mail/MailWrite/AddressBook/AddressContainer/AddressContainer";
import ModalCommon from "../../Modal/ModalCommon/ModalCommon";
import styles from "../../Mail/MailWrite/AddressBook/AddressBook.module.scss";

const CalendarAddressBook = ({
  setModalOpen,
  addrInfo,
  setAddrInfo,
  setCmt,
}) => {
  const addressList = useSelector((state) => state.addressList.teamListData);
  const [type, setType] = useState("IN");

  return (
    <ModalCommon setModalOpen={setModalOpen} title="주소록">
      <div className={styles.wrap}>
        <div className={styles.left_wrap}>
          <AddresTab type={type} setType={setType} />
          <AddresContainer type={type} addressList={addressList} />
        </div>
        <div className={styles.right_wrap}>
          <div className={styles.in_out_wrap}>
            <div className={styles.title}>참석자</div>
            <CalendarInOutBox
              selectedItem={[]}
              setSelectedItem={() => {}}
              item={[]} //{att}
              setItem={() => {}} //{setAtt}
            />
          </div>
        </div>
      </div>
      <BlockBtn
        color="gold"
        style={{ width: 210, height: 60, margin: "0 auto" }}
        onClick={() => {}} //{onClick}
      >
        확인
      </BlockBtn>
    </ModalCommon>
  );
};

export default CalendarAddressBook;
