import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { setChat } from "../../utils/store/actions/uprismStateAction";
import { chatTimeFomatter } from "../../utils/common/fomatter";
import Scrollbar from "react-scrollbars-custom";
import styles from "./Chat.module.scss";

const Chat = ({ setModalClose, chat }) => {
  const dispatch = useDispatch();
  const container = useRef(null);
  const [input, setInput] = useState("");

  const send = (e) => {
    e.preventDefault();
    if (uprism && input !== "") {
      uprism.chat.sendChat({
        message: input,
      });
      dispatch(
        setChat({
          message: input,
          type: "to",
          date: chatTimeFomatter(),
        })
      );
      setInput("");
    }
  };

  useEffect(() => {
    if (container.current) {
      container.current.scrollToBottom();
    }
  }, [chat]);

  return (
    <div className={styles.wrap}>
      <div className={styles.main_title}>감독위원</div>
      <i className="xi-close-thin" onClick={() => setModalClose()} />
      <div className={styles.container}>
        <Scrollbar
          noDefaultStyles
          disableTracksWidthCompensation
          trackYProps={{ style: { right: -10 } }}
          ref={container}
        >
          {chat.list?.map((data, idx) => {
            if (data.type === "to") {
              return (
                <div className={styles.to_wrap} key={`chat_with_admin_${idx}`}>
                  <div className={styles.to}>
                    {data.message}
                    <div className={styles.date}>
                      {data.date.h}:{data.date.m}
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  className={styles.from_wrap}
                  key={`chat_with_admin_${idx}`}
                >
                  <div className={styles.title}>감독위원</div>
                  <div className={styles.from}>
                    {data.type === "all" && (
                      <>
                        <span style={{ fontWeight: 500 }}>[전체공지]</span>
                        <br />
                      </>
                    )}
                    {data.message}
                    <div className={styles.date}>
                      {data.date.h}:{data.date.m}
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </Scrollbar>
      </div>
      <form className={styles.input_wrap}>
        <input
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
        />
        <button className={styles.send_btn} onClick={send}>
          전송
        </button>
      </form>
    </div>
  );
};

export default Chat;
