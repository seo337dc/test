import { useSelector } from "react-redux";
import MessengerListItem from "../MessengerListItem/MessengerListItem";
import Scrollbar from "react-scrollbars-custom";
import styles from "./MessengerList.module.scss";

const MessengerList = ({ clickRoom }) => {
  const roomList = useSelector((state) => state.messenger.sData);

  return (
    <div className={styles.wrap}>
      <Scrollbar
        noDefaultStyles
        disableTracksWidthCompensation
        trackYProps={{ style: { right: -16 } }}
      >
        {roomList?.map((data, idx) => (
          <MessengerListItem
            data={data}
            clickRoom={clickRoom}
            key={`message_list_${data.Seq}_${idx}`}
          />
        ))}
      </Scrollbar>
    </div>
  );
};

export default MessengerList;
