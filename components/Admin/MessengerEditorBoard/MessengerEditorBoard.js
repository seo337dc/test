import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AdminEditorNav from "../AdminEditorNav/AdminEditorNav";
import MessengerTextOnly from "../../Messenger/MessengerTemplate/MessengerTextOnly/MessengerTextOnly";
import ChooseAnswerEditor from "./ChooseAnswerEditor/ChooseAnswerEditor";
import MessengerChooseAnswer from "../../Messenger/MessengerTemplate/MessengerChooseAnswer/MessengerChooseAnswer";
import MessengerVoice from "../../Messenger/MessengerTemplate/MessengerVoice/MessengerVoice";
import UploadVoice from "./UploadVoice/UploadVoice";
import axios from "axios";
import {
  ADMIN_ADDR_LOAD,
  INSERT_QUESTION,
  SELECT_QUESTION,
  UPDATE_QUESTION,
  GET_ADMIN_QUESTION_LIST,
} from "../../../utils/fetch/apiConfig";
import uploadImageCallBack from "../../../utils/common/uploadFiles";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { parsedJson } from "../../../utils/common/fomatter";
import htmlToDraft from "html-to-draftjs";
import { regDQ } from "../../../utils/common/dataConfig";
import LoadingAdminFullScreen from "../LoadingAdminFullScreen/LoadingAdminFullScreen";
import { doubleQuotes } from "../../../utils/common/dataConfig";
import styles from "./MessengerEditorBoard.module.scss";

const initialData = {
  type: "textOnly",
  iCode: "",
  qCode: "",
  qIdx: "",
  from: "",
  answer: "",
  numberOnly: "false",
  setLeft: false,
};

const initialChooseData = [
  {
    id: "",
    text: "",
  },
];

const initialVoiceData = "";

const MessengerEditorBoard = () => {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [chooseData, setChooseData] = useState(initialChooseData);
  const [voiceDataSrc, setVoiceDataSrc] = useState(initialVoiceData);
  const [addList, setAddList] = useState([]);
  const [isFileAnswer, setIsFileAnswer] = useState(false);
  const [filsList, setFileList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const save = async () => {
    if (isLoading) {
      return;
    }

    if (!data.iCode || !data.qCode || !data.from || !data.qIdx) {
      alert("???????????? ?????? ????????? ????????????.");
      return;
    }

    const isModify = router.query.id && router.query.idx;

    if (confirm(isModify ? "?????????????????????????" : "?????????????????????????")) {
      try {
        setLoading(true);
        let Messenger_Contents;
        if (data.type === "textOnly") {
          Messenger_Contents = JSON.stringify({
            type: data.type,
            text: draftToHtml(convertToRaw(editorState.getCurrentContent()))
              .replace(/\"/g, doubleQuotes)
              .replace(/\'/g, ""),
            numberOnly: data.numberOnly,
          });
        } else if (data.type === "choose") {
          Messenger_Contents = JSON.stringify({
            type: data.type,
            text: draftToHtml(convertToRaw(editorState.getCurrentContent()))
              .replace(/\"/g, doubleQuotes)
              .replace(/\'/g, ""),
            chooseData,
            setLeft: data.setLeft,
          });
        } else if (data.type === "voice") {
          try {
            let voiceRes;

            if (typeof voiceDataSrc !== "string") {
              voiceRes = await uploadImageCallBack(voiceDataSrc);
            }

            Messenger_Contents = JSON.stringify({
              type: data.type,
              text: draftToHtml(convertToRaw(editorState.getCurrentContent()))
                .replace(/\"/g, doubleQuotes)
                .replace(/\'/g, ""),
              voiceDataSrc:
                typeof voiceDataSrc === "string"
                  ? voiceDataSrc
                  : voiceRes.data.url,
            });
          } catch (error) {
            console.error(error);
          }
        }

        const res = await axios.post(
          isModify ? UPDATE_QUESTION : INSERT_QUESTION,
          {
            App_Name: "messenger",
            Issue_ID: data.iCode,
            Intern_Quest_ID: data.qCode,
            Addr_No: data.from,
            Messenger_Contents,
            answer: data.answer
              ? data.answer
              : `?????? ??????_${parseInt(Math.random() * (100 - 1) + 1)}`,
            Quest_IDX: data.qIdx,
          }
        );
        if (
          confirm(
            `[${res.data.result}] ${res.data.msg} \n ????????? ????????? ???????????? ???????????????.`
          )
        ) {
          router.push("/admin/dashboard?menu=messenger");
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  const setCheckBox = (e) => {
    e.persist();
    const temp = { ...data };
    if (temp.numberOnly === "true") {
      temp.numberOnly = "false";
    } else {
      temp.numberOnly = "true";
    }
    setData(temp);
  };

  const filesOnchange = (e) => {
    if (data.answer == "") {
      setData((prev) => ({ ...prev, answer: e.target.value }));
      return;
    }

    const answer = data.answer.split(", ");
    answer.push(e.target.value);

    if (e.target.value) {
      setData((prev) => ({
        ...prev,
        answer: answer.join(", "),
      }));
    }
  };

  const dataOnchange = (e) => {
    e.persist();
    const temp = { ...data };
    temp[e.target.name] = e.target.value;
    setData(temp);
  };

  const getAddrList = async () => {
    try {
      const res = await axios.post(ADMIN_ADDR_LOAD, {
        TEST_IDX: 1,
      });
      const tempAry = [];

      res.data.teamListData.forEach((d) =>
        d.addrListData.forEach((a) => tempAry.push(a))
      );

      setAddList(tempAry);
    } catch (error) {
      alert("????????? ???????????? ???????????? ???????????????.");
      console.error(error);
    }
  };

  const getFileList = async () => {
    try {
      const res = await axios.post(GET_ADMIN_QUESTION_LIST, {
        App_Name: "document",
      });

      if (res.data.questionList) {
        setFileList(res.data.questionList);
      }
    } catch (error) {
      alert("?????? ???????????? ???????????? ???????????????.");
      console.error(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (router.query.id && router.query.idx) {
      (async () => {
        try {
          const res = await axios.post(SELECT_QUESTION, {
            App_Name: "messenger",
            Intern_Quest_ID: router.query.id,
            Quest_IDX: router.query.idx,
          });

          await getAddrList();

          await getFileList();

          if (res.data.selectQuestion.length === 0) {
            alert(
              `???????????? ???????????? ???????????????.\n????????? ????????? ???????????? ???????????????.`
            );

            router.push("/admin/dashboard?menu=messenger");
          }

          const {
            Addr_No,
            Intern_Quest_ID,
            Issue_ID,
            Messenger_Contents,
            Quest_IDX,
            ANSWER,
          } = res.data.selectQuestion[0];

          const parsedData = parsedJson(Messenger_Contents);

          setData({
            type: parsedData.type,
            iCode: Issue_ID,
            qCode: Intern_Quest_ID,
            qIdx: Quest_IDX ? Quest_IDX : "",
            from: Addr_No,
            answer: ANSWER,
            numberOnly: parsedData.numberOnly,
            setLeft: parsedData.setLeft,
          });

          if (parsedData.text) {
            const { contentBlocks, entityMap } = htmlToDraft(
              parsedData.text.replace(regDQ, '"')
            );

            if (contentBlocks) {
              const contentState = ContentState.createFromBlockArray(
                contentBlocks,
                entityMap
              );

              const convertedState = EditorState.createWithContent(
                contentState
              );

              setEditorState(convertedState);
            } else {
              setEditorState(EditorState.createEmpty());
            }
          }

          if (parsedData.type === "choose") {
            setChooseData(parsedData.chooseData);
          } else if (parsedData.type === "voice") {
            setVoiceDataSrc(parsedData.voiceDataSrc);
          }

          // alert(`[${res.data.result}] ${res.data.msg}`);

          setLoading(false);
        } catch (error) {
          alert("????????? ??????????????????. ???????????? ?????? ?????? ????????????.");
          setLoading(false);
          console.error(error);
        }
      })();
    } else {
      getAddrList();
      getFileList();
      setLoading(false);
    }
  }, [router.query.id]);

  return (
    <div className={styles.wrap}>
      <AdminEditorNav
        onHandleSubmit={save}
        createState={null}
        title="?????????"
        loc="messenger"
      />
      <div className={styles.container}>
        <div className={styles.ctx_wrap}>
          <div className={styles.ctx}>
            <span>????????????</span>
            <input
              onChange={dataOnchange}
              name="iCode"
              value={data.iCode}
              readOnly={router.query.id}
            />
            <span>????????????</span>
            <input
              onChange={dataOnchange}
              name="qCode"
              value={data.qCode}
              readOnly={router.query.id}
            />
            <span>????????????</span>
            <input
              onChange={dataOnchange}
              name="qIdx"
              value={data.qIdx}
              readOnly={router.query.id}
            />
          </div>
          <div className={styles.ctx}>
            <span>????????????</span>
            <select onChange={dataOnchange} name="from" value={data.from}>
              <option defaultValue value="">
                ??????
              </option>
              {addList?.map((eachAdd, idx) => (
                <option value={eachAdd.addr_no} key={`addrList_${idx}`}>
                  {eachAdd.u_name} {eachAdd.u_position}
                </option>
              ))}
            </select>
            <span>??????</span>
            <select onChange={dataOnchange} name="type" value={data.type}>
              <option value="textOnly">?????????</option>
              <option value="choose">?????????</option>
              <option value="voice">?????????</option>
            </select>
            {data.type === "textOnly" && (
              <>
                <input
                  type="checkbox"
                  className={styles.checkBox}
                  onChange={setCheckBox}
                  checked={data.numberOnly === "true" ? true : false}
                />
                <span>????????? ??????</span>
              </>
            )}
            <span>??????</span>
            <input
              type="checkbox"
              className={styles.checkBox}
              onChange={() => {
                setData((prev) => ({ ...prev, setLeft: !prev.setLeft }));
              }}
              checked={data.setLeft}
            />
            <span>?????? ?????? ??????</span>
            {isFileAnswer ? (
              <select onChange={filesOnchange} name="answer" value={0}>
                <option value="" defaultValue>
                  ??????
                </option>
                {filsList?.map((d, idx) => (
                  <option
                    key={`files_${idx}`}
                    value={d.Intern_Quest_ID}
                  >{`[${d.Intern_Quest_ID}] [${d.File_Kind}] [${d.File_Name}]`}</option>
                ))}
              </select>
            ) : (
              <input
                onChange={dataOnchange}
                name="answer"
                value={data.answer}
                placeholder="?????? ????????? ??????"
              />
            )}
            <input
              type="checkbox"
              className={styles.checkBox}
              onChange={() => {
                setIsFileAnswer((prev) => !prev);
                setData((prev) => ({ ...prev, answer: "" }));
              }}
              checked={isFileAnswer}
            />
            <span>???????????? ??????</span>
          </div>
          {isFileAnswer && (
            <div className={styles.files_wrap}>????????? ??????: {data.answer}</div>
          )}
          <div
            className={
              data.type === "textOnly" ? styles.div_none_wrap : styles.div_wrap
            }
          >
            <Editor
              wrapperClassName={
                data.type === "textOnly"
                  ? styles.nomal_wrapper
                  : styles.divide_wrapper
              }
              editorClassName={styles.editor}
              toolbarClassName={styles.toolbar}
              editorState={editorState}
              onEditorStateChange={setEditorState}
              toolbar={{
                options: ["image"],
                image: {
                  uploadCallback: uploadImageCallBack,
                  uploadEnabled: true,
                  previewImage: true,
                  defaultSize: {
                    height: "auto",
                    width: "auto",
                  },
                },
              }}
              placeholder="????????? ??????????????????."
              localization={{
                locale: "ko",
              }}
            />
            {(() => {
              if (data.type === "choose") {
                return (
                  <ChooseAnswerEditor
                    chooseData={chooseData}
                    setChooseData={setChooseData}
                  />
                );
              } else if (data.type === "voice") {
                return (
                  <UploadVoice file={voiceDataSrc} setFile={setVoiceDataSrc} />
                );
              }
            })()}
          </div>
        </div>
        <div className={styles.view}>
          {(() => {
            if (data.type === "textOnly") {
              return (
                <MessengerTextOnly
                  data={{
                    From_User: `${
                      addList.filter((d) => d.addr_no == data.from)[0]?.u_name
                    } ${
                      addList.filter((d) => d.addr_no == data.from)[0]
                        ?.u_position
                    }`,
                    Message: {
                      text: draftToHtml(
                        convertToRaw(editorState.getCurrentContent())
                      ),
                    },
                  }}
                  setSelectedQues={() => {}}
                />
              );
            } else if (data.type === "choose") {
              return (
                <MessengerChooseAnswer
                  data={{
                    From_User: `${
                      addList.filter((d) => d.addr_no == data.from)[0]?.u_name
                    } ${
                      addList.filter((d) => d.addr_no == data.from)[0]
                        ?.u_position
                    }`,
                    Message: {
                      text: draftToHtml(
                        convertToRaw(editorState.getCurrentContent())
                      ),
                      chooseData,
                      setLeft: data.setLeft,
                    },
                  }}
                  isEx
                />
              );
            } else if (data.type === "voice") {
              return (
                <MessengerVoice
                  data={{
                    From_User: `${
                      addList.filter((d) => d.addr_no == data.from)[0]?.u_name
                    } ${
                      addList.filter((d) => d.addr_no == data.from)[0]
                        ?.u_position
                    }`,
                    Message: {
                      text: draftToHtml(
                        convertToRaw(editorState.getCurrentContent())
                      ),
                      voiceDataSrc:
                        typeof voiceDataSrc === "object"
                          ? window.URL.createObjectURL(voiceDataSrc)
                          : voiceDataSrc,
                    },
                  }}
                />
              );
            }
          })()}
        </div>
      </div>
      {isLoading && <LoadingAdminFullScreen />}
    </div>
  );
};

export default MessengerEditorBoard;
