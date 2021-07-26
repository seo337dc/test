import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setIsMessengerOpen } from "../../utils/store/actions/modalStateAction";
import { getMessengerRoomList } from "../../utils/store/actions/messengerAction";
import useModalDrag from "../../utils/customHook/useModalDrag";
import MessengerList from "./MessengerList/MessengerList";
import MessengerDetail from "./MessengerDetail/MessengerDetail";
import styles from "./Messenger.module.scss";

const allInitail = { type: "all" };

const detailInitail = { type: "detail", id: undefined };

const Messenger = () => {
  const dispatch = useDispatch();
  const [messengerState, setMessengerState] = useState(allInitail);
  const [position, dragHandler, setFocus, options] = useModalDrag(
    20,
    480,
    "messenger"
  );

  const clickRoom = (data) => {
    setMessengerState({
      ...detailInitail,
      id: data.Room_IDX,
      from: data.From_User,
    });
  };

  useEffect(() => {
    if (messengerState.type === allInitail.type) {
      dispatch(getMessengerRoomList());
    }
  }, [messengerState]);

  return (
    <div
      className={styles.wrap}
      style={{
        right: position,
        zIndex: options.zIndex,
      }}
      onMouseDown={setFocus}
    >
      <div className={styles.nav} {...dragHandler}>
        {(() => {
          if (messengerState.type === allInitail.type) {
            return (
              <>
                <div />
                <div className={styles.title}>메신저</div>
              </>
            );
          } else if (messengerState.type === detailInitail.type) {
            return (
              <>
                <i
                  className="xi-angle-left-thin"
                  onClick={() => setMessengerState(allInitail)}
                />
                <div className={styles.title}>
                  {messengerState.from?.split(", ")[0]}
                  {messengerState.from?.split(", ").length > 1
                    ? `외 ${messengerState.from?.split(", ").length - 1}`
                    : ""}
                </div>
              </>
            );
          }
        })()}
        <i
          className="xi-close-thin"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => dispatch(setIsMessengerOpen(false))}
        />
      </div>
      <div className={styles.container}>
        {(() => {
          if (messengerState.type === allInitail.type) {
            return <MessengerList clickRoom={clickRoom} />;
          } else if (messengerState.type === detailInitail.type) {
            return <MessengerDetail messengerState={messengerState} />;
          }
        })()}
      </div>
    </div>
  );
};

export default Messenger;
