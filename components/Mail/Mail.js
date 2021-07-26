import { Fragment, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  MAIL_VIEW_DATA,
  MAIL_VIEW_SENT_DATA,
  MAIL_VIEW_TEMP_DATA,
} from "../../utils/fetch/apiConfig";
import { initialReplyContents } from "../../utils/common/formatterRemail";
import { setReadMail } from "../../utils/store/actions/mailActions";
import CircleLoader from "../Loader/CircleLoader";
import MailTo from "./MailWrite/MailTo";
import MailNav from "./MailNav/MailNav";
import MailList from "./MailList/MailList";
import MailContents from "./MailContents/MailContents";
import MailWrite from "./MailWrite/MailWrite";
import styles from "./Mail.module.scss";

const mailAPI = {
  from: MAIL_VIEW_DATA, //받은 메일 View
  to: MAIL_VIEW_SENT_DATA, //보낸 메일 View
  temp: MAIL_VIEW_TEMP_DATA, // 임시 저장 메일 View
};

const Mail = ({ idx }) => {
  const dispatch = useDispatch();
  const [mailType, setMailType] = useState("from"); //from, to, temp
  const [isListOpen, setListOpen] = useState(true);
  const [viewData, setViewData] = useState();

  const isLoading = useRef(false);

  //메일 리스트 클릭 이벤트
  const onHandleClickMailCard = async (data) => {
    if (isLoading.current) return;

    try {
      if (mailType === "from") {
        isLoading.current = true;
        const fromMail = await axios.post(mailAPI[mailType], {
          mailNo: data.list_no,
        });

        if (fromMail.data.result === "OK") {
          isLoading.current = false;

          setViewData({
            ...fromMail.data,
            writeType: false,
            re_mail_contents: initialReplyContents(
              JSON.parse(fromMail.data.re_mail_contents)
            ),
            cc_name: fromMail.data.cc_name
              ? fromMail.data.cc_name.split(";").map((cc) => {
                  return {
                    u_name: cc.split(" ")[0],
                    u_position: cc.split(" ")[1],
                  };
                })
              : [],
            replyCC: [],
            replyFile: [],
          });

          dispatch(setReadMail(data.list_no));
        }
      } else if (mailType === "to") {
        isLoading.current = true;
        const toMail = await axios.post(mailAPI[mailType], {
          mailNo: data.list_no,
        });

        if (toMail.data.result === "OK") {
          isLoading.current = false;

          setViewData({
            ...toMail.data,
            writeType: "to",
            re_mail_contents: JSON.parse(toMail.data.re_mail_contents),
            from_name: toMail.data.from_name,
            cc_name: toMail.data.cc_name
              ? toMail.data.cc_name.split(";").map((cc) => {
                  if (cc.indexOf("  ") > -1) {
                    return {
                      u_name: cc.split(" ")[0] + " ",
                      u_position: cc.split(" ")[2],
                    };
                  } else {
                    return {
                      u_name: cc.split(" ")[0],
                      u_position: cc.split(" ")[1],
                    };
                  }
                })
              : [],
            attach_file_list: toMail.data.attach_file,
          });
        }
      } else if (mailType === "temp") {
        isLoading.current = true;
        const tempMail = await axios.post(mailAPI[mailType], {
          mailNo: data.list_no,
          mail_sentNo: data.mail_sentNo,
        });

        if (tempMail.data.result === "OK") {
          isLoading.current = false;

          setViewData({
            ...tempMail.data,
            writeType: "temp",
            re_mail_contents: JSON.parse(tempMail.data.re_mail_contents),
            from_name: tempMail.data.inboxTo,
            cc_name: tempMail.data.cc_name
              ? tempMail.data.cc_name.split(";").map((cc) => {
                  if (cc.indexOf("  ") > -1) {
                    return {
                      u_name: cc.split(" ")[0] + " ",
                      u_position: cc.split(" ")[2],
                    };
                  } else {
                    return {
                      u_name: cc.split(" ")[0],
                      u_position: cc.split(" ")[1],
                    };
                  }
                })
              : [],
            replyCC: tempMail.data.cc_name
              ? tempMail.data.cc_name.split(";").map((cc) => {
                  if (cc.indexOf("  ") > -1) {
                    return {
                      u_name: cc.split(" ")[0] + " ",
                      u_position: cc.split(" ")[2],
                    };
                  } else {
                    return {
                      u_name: cc.split(" ")[0],
                      u_position: cc.split(" ")[1],
                    };
                  }
                })
              : [],
            replyFile: tempMail.data.attach_file_list.map((file) => {
              return {
                list_no: file.FILE_NO,
                list_kind: file.FILE_KIND,
                list_name: file.FILE_NAME,
                intern_quest_id: file.INTERN_QUEST_ID,
              };
            }),
          });
          setListOpen(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={styles.wrap}
      onCopy={(e) => {
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        return false;
      }}
    >
      <MailNav
        idx={idx}
        mailType={mailType}
        setMailType={setMailType}
        isListOpen={isListOpen}
        setListOpen={setListOpen}
      />

      <div className={styles.container}>
        <MailList
          mailType={mailType}
          isListOpen={isListOpen}
          setListOpen={setListOpen}
          onHandleClickMailCard={onHandleClickMailCard}
        />
        {isLoading.current ? (
          <div className={styles.loader_wrap}>
            <CircleLoader />
            {mailType === "from" && "메일 내용 불러오는 중"}
            {mailType === "to" && "보낸 메일 내용 불러오는 중"}
            {mailType === "temp" && "보관 메일 불러오는 중"}
          </div>
        ) : (
          <Fragment>
            {!viewData && (
              <div className={styles.empty}>
                좌측의 메일 항목을 클릭하면 메일 내용이 표시됩니다.
              </div>
            )}
            {viewData && !viewData.writeType && (
              <MailContents
                viewData={viewData}
                setViewData={setViewData}
                isListOpen={isListOpen}
                setListOpen={setListOpen}
              />
            )}

            {viewData && ["reply", "temp"].includes(viewData.writeType) && (
              <MailWrite
                viewData={viewData}
                setViewData={setViewData}
                setMailType={setMailType}
                setListOpen={setListOpen}
              />
            )}

            {viewData && viewData.writeType === "to" && (
              <MailTo viewData={viewData} setViewData={setViewData} />
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Mail;
