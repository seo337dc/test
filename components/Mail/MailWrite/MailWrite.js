import { Fragment, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Scrollbar from "react-scrollbars-custom";
import MailWriteBtns from "./MailWriteBtns/MailWriteBtns";
import MailWriteUserBox from "./MailWriteUserBox/MailWriteUserBox";
import MailWriteInfo from "./MailWriteInfo/MailWriteInfo";
import MailWriteContainer from "./MailWriteContainer/MailWriteContainer";
import ConfirmModal from "../../Modal/ConfirmModal/ConfirmModal";
import AlertIcon from "../../SVGIcons/AlertIcon";
import AlertModal from "../../Modal/AlertModal/AlertModal";
import CircleLoader from "../../Loader/CircleLoader";
import { sepAnswer } from "../../../utils/common/formatterRemail";
// import nextAction from "../../../utils/common/nextAction";
import { setMailList } from "../../../utils/store/actions/mailActions";
import {
  MAIL_SEND_DATA,
  MAIL_SEND_TEMP_DATA,
  MAIL_SEND_TEMP_SEND_DATA,
} from "../../../utils/fetch/apiConfig";
import styles from "./MailWrite.module.scss";

const alertModalTypeConfig = {
  saveTemp: (setModalOpen, onYesClick, onNoClick) => (
    <ConfirmModal
      setModalOpen={() => setModalOpen(false)}
      onYesClick={() => {
        onYesClick();
        setModalOpen(false);
      }}
      onNoClick={() => setModalOpen(false)}
    >
      <div className={styles.modal_wrap}>
        <AlertIcon color="#222222" />
        <div className={styles.modal_text_wrap}>
          변경 내용을 저장하시겠습니까?
        </div>
      </div>
    </ConfirmModal>
  ),
  checkSave: (setModalOpen, onYesClick, onNoClick) => (
    <ConfirmModal
      setModalOpen={() => setModalOpen(false)}
      onYesClick={() => {
        onYesClick();
        setModalOpen(false);
      }}
      onNoClick={() => setModalOpen(false)}
    >
      <div className={styles.modal_wrap}>
        <img src="/img/greenCheck.svg" alt="check" className={styles.check} />
        <div className={styles.modal_text_wrap}>
          보내신 메일은 수정이 불가능합니다.
          <br />
          메일을 보내시겠습니까?
        </div>
      </div>
    </ConfirmModal>
  ),
  noSave: (setModalOpen, onYesClick, onNoClick) => (
    <ConfirmModal
      setModalOpen={() => setModalOpen(false)}
      onYesClick={() => {
        onYesClick();
        setModalOpen(false);
      }}
      onNoClick={() => setModalOpen(false)}
    >
      <div className={styles.modal_wrap}>
        <AlertIcon color="#da291c" />
        <div className={styles.modal_text_wrap}>
          이 페이지를 벗어나면 마지막 저장 후<br />
          수정된 내용은 저장되지 않습니다.
        </div>
      </div>
    </ConfirmModal>
  ),
  saveComplete: (setModalOpen, onClick) => (
    <AlertModal
      setModalOpen={() => setModalOpen(false)}
      onClick={() => {
        onClick();
        setModalOpen(false);
      }}
    >
      <div className={styles.modal_wrap}>
        <img src="/img/greenCheck.svg" alt="check" className={styles.check} />
        <div className={styles.modal_text_wrap}>
          메일을 성공적으로 보냈습니다.
        </div>
      </div>
    </AlertModal>
  ),

  checkTo: (setModalOpen, onClick) => (
    <AlertModal
      setModalOpen={() => setModalOpen(false)}
      onClick={() => setModalOpen(false)}
    >
      <div className={styles.modal_wrap}>
        <AlertIcon color="#da291c" />
        <div className={styles.modal_text_wrap}>
          받는 사람을 지정해야 합니다.
          <br />
          이름을 하나 이상 입력했는지 확인하세요.
        </div>
      </div>
    </AlertModal>
  ),
};

const MailWrite = ({ viewData, setViewData, setMailType, setListOpen }) => {
  const dispatch = useDispatch();
  const isLoading = useRef(false);
  const [alertModalType, setAlertModalType] = useState(); //false, saveTemp, noSave, saveComplete, checkTo, checkSave

  //onClick, yesClick
  const handleYesClick = async () => {
    if (isLoading.current) return;
    try {
      if (alertModalType === "checkSave") {
        isLoading.current = true;

        const resSaveEmail = await axios.post(
          viewData.mail_kornm === "회신요청"
            ? MAIL_SEND_DATA
            : MAIL_SEND_TEMP_SEND_DATA,
          {
            mailNo: viewData.mailNo,
            internQuestId: viewData.internQuestId,
            mailSubject: viewData.mail_subject,
            mailContents: viewData.mail_contents,
            reMailContents: JSON.stringify(viewData.re_mail_contents),
            hidInboxMailTo: viewData.from_name,
            hidInboxMailCc: viewData.replyCC
              .map((cc) => {
                return `${cc.u_name} ${cc.u_position}`;
              })
              .join(";"),
            hidInboxAttachFile: viewData.replyFile
              .map((file) => file.intern_quest_id)
              .join(";"),
            markAnswer: sepAnswer(
              viewData.re_mail_contents,
              viewData.replyCC,
              viewData.replyFile
            ),
          }
        );

        // if (mail_kornm === "회신요청" && internQuestId) {
        //   await nextAction(resSaveEmail.data.nextAction, dispatch);
        // }

        if (resSaveEmail.status === 200) {
          setMailType("to");
          dispatch(setMailList("to"));
          setListOpen(true);
          setViewData(false);
        }
        isLoading.current = false;
      } else if (alertModalType === "saveTemp") {
        isLoading.current = true;

        const resSaveTemp = await axios.post(MAIL_SEND_TEMP_DATA, {
          mailNo: viewData.mailNo,
          internQuestId: viewData.internQuestId,
          mailSubject: viewData.mail_subject,
          mailContents: viewData.mail_contents,
          reMailContents: JSON.stringify(viewData.re_mail_contents),
          hidInboxMailTo: viewData.from_name,
          hidInboxMailCc: viewData.replyCC
            .map((cc) => {
              return `${cc.u_name} ${cc.u_position}`;
            })
            .join(";"),
          hidInboxAttachFile: viewData.replyFile
            .map((file) => file.intern_quest_id)
            .join(";"),
          markAnswer: {},
        });

        if (resSaveTemp.status === 200) {
          setMailType("temp");
          dispatch(setMailList("temp"));
          setListOpen(true);
          setViewData(false);
        }
      }
      isLoading.current = false;
    } catch (error) {
      isLoading.current = false;
      console.error(error);
    }
  };

  if (isLoading.current) {
    return (
      <div className={styles.loader_wrap}>
        <CircleLoader />
        {alertModalType === "saveTemp" && `임시 저장 중....`}
        {alertModalType === "checkSave" && `메일 송신 중....`}
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <MailWriteBtns setAlertModalType={setAlertModalType} />
      <div className={styles.container_reply}>
        <Scrollbar noDefaultStyles disableTracksWidthCompensation>
          <div className={styles.inner_container}>
            <Fragment>
              <MailWriteUserBox viewData={viewData} setViewData={setViewData} />
              <MailWriteInfo viewData={viewData} setViewData={setViewData} />
            </Fragment>
            <MailWriteContainer viewData={viewData} setViewData={setViewData} />
          </div>
        </Scrollbar>
      </div>

      {alertModalType &&
        alertModalTypeConfig[alertModalType](setAlertModalType, handleYesClick)}
    </div>
  );
};

export default MailWrite;
