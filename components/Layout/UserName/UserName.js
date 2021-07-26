import { useDispatch, useSelector } from "react-redux";
import { setChatOpen } from "../../../utils/store/actions/uprismStateAction";
import Chat from "../../Chat/Chat";
import styles from "./UserName.module.scss";

const UserName = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const chat = useSelector((state) => state.chat);

  return (
    <>
      <div
        className={styles.wrap}
        onClick={() => dispatch(setChatOpen(!chat.isOpen))}
      >
        <i className="xi-user" />
        {userInfo.Tester_Name}님
      </div>
      {chat.isOpen && (
        <Chat setModalClose={() => dispatch(setChatOpen(false))} chat={chat} />
      )}
    </>
  );
};

export default UserName;
