import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  GET_MESSENGER_ROOM_DETAIL,
  SEND_MESSAGE,
} from "../../../utils/fetch/apiConfig";
import { getMessengerRoomList } from "../../../utils/store/actions/messengerAction";
import { parsedJson, removeHtml } from "../../../utils/common/fomatter";
import MessengerTo from "../MessengerTemplate/MessengerTo/MessengerTo";
import MessengerTextOnly from "../MessengerTemplate/MessengerTextOnly/MessengerTextOnly";
import MessengerChooseAnswer from "../MessengerTemplate/MessengerChooseAnswer/MessengerChooseAnswer";
import MessengerVoice from "../MessengerTemplate/MessengerVoice/MessengerVoice";
import FileAttachment from "../../FileAttachment/FileAttachment";
import Scrollbar from "react-scrollbars-custom";
import nextAction from "../../../utils/common/nextAction";
import styles from "./MessengerDetail.module.scss";

// selectedQues = { quesId: Number,  msg: String}

//textOnly, choose, voice

const maxSubTextLength = 35;

const adminType = "A";

const makeToMessage = (text, answer) => `
<div class="messenger_to_top">
  <div class="messenger_top_text">${text}</div>
  <div class="messenger_sub_text">에 대한 답장</div>
</div>
<div class="messenger_hr"></div>
${answer}
`;

const MessengerDetail = ({ messengerState }) => {
  const container = useRef();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [isFileModalOpen, setFileModalOpen] = useState(false);
  const [selectedQues, setSelectedQues] = useState(false);
  const [lastMessageList, setLastMessageList] = useState([]);
  const [lastMessage, setLastMessage] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const isLoading = useRef(false);

  const getDetailData = async () => {
    try {
      const res = await axios.post(GET_MESSENGER_ROOM_DETAIL, {
        roomIdx: messengerState.id,
      });

      setLastMessageList(res.data.lastMessageSeq);
      setMessageList(res.data.sData);

      dispatch(getMessengerRoomList());
    } catch (error) {
      console.error(error);
    }
  };

  const sendFileAnswer = async (filtList) => {
    try {
      const res = await axios.post(SEND_MESSAGE, {
        msg: makeToMessage(
          removeHtml(parsedJson(selectedQues?.Message).text).slice(
            0,
            maxSubTextLength
          ),
          "파일 전송이 완료되었습니다.<br />" +
            filtList
              .map((d) => `[${d.list_kind}] ${d.list_name}`)
              .join("<br />")
        ),
        answer: filtList.map((d) => d.intern_quest_id).join(", "),
        roomIdx: selectedQues.Room_IDX,
        internQuestId: selectedQues.Intern_Quest_ID,
        questIdx: selectedQues.Quest_IDX,
      });

      await nextAction(res.data.nextAction, dispatch);

      setLastMessageList(res.data.lastMessageSeq);
      setMessageList(res.data.sData);

      getDetailData();

      setFileModalOpen(false);
      setSelectedQues(false);
    } catch (error) {
      console.error(error);
    }
  };

  const sendChooseAnswer = async (
    answer,
    mainText,
    subText,
    roomIdx,
    internQuestId,
    questIdx
  ) => {
    try {
      const res = await axios.post(SEND_MESSAGE, {
        msg: makeToMessage(
          removeHtml(mainText).slice(0, maxSubTextLength),
          subText
        ),
        answer,
        roomIdx,
        internQuestId,
        questIdx,
      });

      await nextAction(res.data.nextAction, dispatch);

      setLastMessageList(res.data.lastMessageSeq);
      setMessageList(res.data.sData);

      getDetailData();
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!input) {
      return;
    }

    if (isLoading.current) {
      return;
    }

    try {
      isLoading.current = true;

      if (selectedQues) {
        const res = await axios.post(SEND_MESSAGE, {
          msg: makeToMessage(
            removeHtml(parsedJson(selectedQues?.Message).text).slice(
              0,
              maxSubTextLength
            ),
            input
          ),
          answer: input,
          roomIdx: selectedQues.Room_IDX,
          internQuestId: selectedQues.Intern_Quest_ID,
          questIdx: selectedQues.Quest_IDX,
        });

        await nextAction(res.data.nextAction, dispatch);

        setLastMessageList(res.data.lastMessageSeq);
        setMessageList(res.data.sData);

        getDetailData();

        setInput("");
        setSelectedQues(false);
        isLoading.current = false;
      } else {
        isLoading.current = false;
        return;
      }
    } catch (error) {
      isLoading.current = false;
      console.error(error);
    }
  };

  useEffect(() => {
    if (container.current) {
      container.current.scrollToBottom();
    }
  }, [messageList]);

  useEffect(() => {
    const tmpAry = [];
    lastMessageList?.forEach(({ lastSeq }) => {
      tmpAry.push(lastSeq);
    });
    setLastMessage(tmpAry);
  }, [lastMessageList]);

  useEffect(() => {
    getDetailData();
  }, []);

  return (
    <div
      className={styles.wrap}
      onCopy={(e) => {
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        return false;
      }}
    >
      <div
        className={styles.container}
        style={{ height: selectedQues ? "calc(100% - 150px)" : "" }}
      >
        <Scrollbar
          noDefaultStyles
          disableTracksWidthCompensation
          trackYProps={{ style: { right: -14 } }}
          ref={container}
        >
          {messageList?.map((data, idx) => {
            if (data.Gubun === adminType) {
              const parsedData = parsedJson(data.Message);
              if (parsedData.type === "textOnly") {
                return (
                  <MessengerTextOnly
                    key={`message_detail_${data.Seq}_${idx}`}
                    data={data}
                    setSelectedQues={setSelectedQues}
                  />
                );
              } else if (parsedData.type === "choose") {
                return (
                  <MessengerChooseAnswer
                    key={`message_detail_${data.Seq}_${idx}`}
                    data={data}
                    sendChooseAnswer={sendChooseAnswer}
                  />
                );
              } else if (parsedData.type === "voice") {
                return (
                  <MessengerVoice
                    key={`message_detail_${data.Seq}_${idx}`}
                    data={data}
                  />
                );
              } else {
                return (
                  <MessengerTextOnly
                    key={`message_detail_${data.Seq}_${idx}`}
                    data={data}
                    setSelectedQues={setSelectedQues}
                  />
                );
              }
              //마지막 else type이 들어온다면 필요없음.
            } else {
              return (
                <MessengerTo
                  key={`message_detail_${data.Seq}_${idx}`}
                  isLast={lastMessage.includes(data.Seq)}
                  data={data}
                />
              );
            }
          })}
        </Scrollbar>
      </div>
      <form
        className={styles.input_wrap}
        onSubmit={sendMessage}
        style={{
          height: selectedQues ? "130px" : "",
          backgroundColor: selectedQues ? "#ffffff" : "#dddddd",
          cursor: selectedQues ? "" : "not-allowed",
        }}
      >
        {selectedQues && (
          <div className={styles.selected_message_wrap}>
            <div
              className={styles.selected_message}
              onClick={() => setSelectedQues(false)}
            >
              <div className={styles.text}>
                <i className="xi-reply" />
                <div className={styles.ctx}>
                  {removeHtml(parsedJson(selectedQues?.Message).text)}
                </div>
                <div className={styles.sub_ctx}>에 대한 답장</div>
              </div>
              <div className={styles.del}>
                <i className="xi-close-thin" />
              </div>
            </div>
          </div>
        )}
        <div className={styles.input_container}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={selectedQues ? "답장 입력" : ""}
            readOnly={!selectedQues}
            style={{
              backgroundColor: selectedQues ? "#ffffff" : "#dddddd",
              cursor: selectedQues ? "" : "not-allowed",
            }}
            type={
              parsedJson(selectedQues?.Message)?.numberOnly == "true"
                ? "number"
                : ""
            }
            step={0.000000001}
          />
          <div className={styles.btns_wrap}>
            <i
            // className="xi-paperclip"
            // style={{
            //   color: "#acacac",
            //   cursor: selectedQues ? "" : "not-allowed",
            // }}
            // onClick={() => (selectedQues ? setFileModalOpen(true) : null)}
            />
            <i
              className="xi-location-arrow"
              style={{
                color: "#da291C",
                cursor: selectedQues ? "" : "not-allowed",
              }}
              onClick={sendMessage}
            />
          </div>
        </div>
      </form>
      {isFileModalOpen && (
        <FileAttachment
          setModalOpen={setFileModalOpen}
          onClick={sendFileAnswer}
        />
      )}
    </div>
  );
};

export default MessengerDetail;
