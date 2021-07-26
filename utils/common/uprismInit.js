import {
  setCheck,
  setIsWaitingToLeave,
} from "../store/actions/userStateAction";
import {
  setUprismSuccess,
  setUprismFail,
  setIdCard,
  setChat,
  setChatOpen,
} from "../store/actions/uprismStateAction";
import { chatTimeFomatter } from "./fomatter";

const setChatObj = (message) => ({
  message,
  type: "one",
  date: chatTimeFomatter(),
});

const connectionHandler = () => {
  const netStr = navigator.connection.effectiveType;

  if (netStr === "3g" || netStr === "2g" || netStr === "'slow-2g") {
    uprism.chat.sendChat({
      message: "[알림] 응시자의 네트워크 상태가 원활하지 않습니다.",
    });
  }
};

const moniorHide = (dispatch, addChatMessage, setChatOpen) => {
  if (document.visibilityState === "hidden") {
    //화면 탈출
    uprism.chat.sendChat({
      message: "[알림] 화면 전환 감지(최소화/다른 화면 전환)",
    });
    dispatch(
      addChatMessage(
        setChatObj(
          "[경고] 화면 전환이 감지되었습니다. 계속하여 화면 전환이 감지될 경우 진단 프로그램이 강제 종료될 수 있으며, 강제 종료 시 재접속이 불가한 점 유의하시기 바랍니다."
        )
      )
    );
    dispatch(setChatOpen(true));
  }
};

const sendSomeKeys = (e, dispatch, addChatMessage, setChatOpen) => {
  if ((e.metaKey && e.shiftKey) || (e.ctrlKey && e.shiftKey)) {
    //캡쳐시도
    uprism.chat.sendChat({
      message: "[알림] Ctrl+Shift(Cmd + Shift) 키 입력 감지",
    });
    dispatch(
      addChatMessage(
        setChatObj(
          "[경고] 진단 진행에 불필요한 키 입력이 발생하였습니다. 계속하여 진단에 불필요한 키를 입력하는 경우 진단 프로그램이 강제 종료될 수 있으며, 강제 종료 시 재접속이 불가한 점 유의하시기 바랍니다."
        )
      )
    );
    dispatch(setChatOpen(true));
  } else if (e.metaKey && !window.navigator.userAgent.includes("Mac")) {
    //윈도우키 혹은 커맨드
    uprism.chat.sendChat({
      message: "[알림] Window 키 입력 감지",
    });
    dispatch(
      addChatMessage(
        setChatObj(
          "[경고] 진단 진행에 불필요한 키 입력이 발생하였습니다. 계속하여 진단에 불필요한 키를 입력하는 경우 진단 프로그램이 강제 종료될 수 있으며, 강제 종료 시 재접속이 불가한 점 유의하시기 바랍니다."
        )
      )
    );
    dispatch(setChatOpen(true));
  }
};

const sendSomeKeysUp = (e, dispatch, addChatMessage, setChatOpen) => {
  if (e.keycode === 44) {
    //프린트스크린 키
    uprism.chat.sendChat({
      message: "[알림] PrtScn 키 입력 감지",
    });
    dispatch(
      addChatMessage(
        setChatObj(
          "[경고] 진단 진행에 불필요한 키 입력이 발생하였습니다. 계속하여 진단에 불필요한 키를 입력하는 경우 진단 프로그램이 강제 종료될 수 있으며, 강제 종료 시 재접속이 불가한 점 유의하시기 바랍니다."
        )
      )
    );
    dispatch(setChatOpen(true));
  }
};

/**
 * @param {function} uprismState uprism의 state를 저장할 setState
 * @param {function} dispatch dispatch
 * @param {Element} adminDom 감독위원 화면 DOM
 * @param {Element} camDom 응시자 캠화면 DOM
 * @param {Element} screenDom 화면공유 화면 DOM
 * @param {Element} mixingDom 응시자, 캠, 화면공유 병합 DOM
 * @param {function} router next router
 * @returns {void}
 */

const uprismInit = ({
  uprismState,
  dispatch,
  adminDom,
  camDom,
  screenDom,
  mixingDom,
  router,
}) => {
  if (uprismState.state === "INIT") {
    uprism
      .init({
        accessInfo: {
          roomId: uprismState.Room_ID,
          externalCode: uprismState.External_Code,
        },
        serviceView: {
          enable: false,
          defaultView: "presenter",
          parent: adminDom.current,
        },
        selfVideo: {
          visibility: false,
          parent: camDom.current,
        },
        screenShareVideo: {
          visibility: true,
          parent: screenDom.current,
        },
        mixingVideo: {
          visibility: false,
          parent: mixingDom.current,
        },
      })
      .then(() => {
        uprism.addEventCallback((eventName, data) => {
          // console.log("[FROM ADMIN]", eventName, data);

          if (eventName === "registerIdCard") {
            //base64 encode
            dispatch(setIdCard(data));
            uprism.id.closeIdCardPopup();
          } else if (eventName === "attendUser") {
            //true, false
            dispatch(setCheck(data));
          } else if (eventName === "receiveChat") {
            // {userId: "tid:EAED7DFF-EED7-4E82-9612-50B210E50294", userName: "admin", message: "마", type: "one"}
            // type: one, all
            dispatch(setChatOpen(true));
            dispatch(setChat({ ...data, date: chatTimeFomatter() }));
          } else if (eventName === "waitingToLeave") {
            dispatch(setIsWaitingToLeave(data));
          } else if (eventName === "receiveVoiceChat") {
            uprism.voiceChat.response();
          } else if (eventName === "connectedVoiceChat") {
            dispatch(setChatOpen(true));
            dispatch(
              setChat({
                message: "감독위원과 음성 대화가 연결되었습니다.",
                type: "one",
                date: chatTimeFomatter(),
              })
            );
          } else if (eventName === "disconnectedVoiceChat") {
            dispatch(setChatOpen(true));
            dispatch(
              setChat({
                message: "감독위원과 음성 대화 연결이 종료되었습니다.",
                type: "one",
                date: chatTimeFomatter(),
              })
            );
          } else if (eventName === "logout") {
            router.push({
              pathname: "/cheat",
              query: {
                memo: "duplicateLogin",
              },
            });
          } else if (eventName === "lefted") {
            //서버 연결이 끊어졌을 경우,
            // 진행자에 의해 회의방이 종료됐을 경우,
            // 모니터링 전 화면에서 유저 퇴장을 눌렀을 때
            dispatch(setCheck(false));
          } else if (eventName === "isExistManager") {
            if (!data) {
              //감독위원이 없을 때
              dispatch(setCheck(false));
            }
          }
        });

        if (window.navigator.userAgent.includes("Mac")) {
          uprism.chat.sendChat({
            message: "[MAC OS 사용자입니다.]",
          });
        }
        navigator.connection.onchange = connectionHandler;
        document.addEventListener("visibilitychange", () =>
          moniorHide(dispatch, setChat, setChatOpen)
        );
        document.addEventListener("keydown", (e) =>
          sendSomeKeys(e, dispatch, setChat, setChatOpen)
        );
        document.addEventListener("keyup", (e) =>
          sendSomeKeysUp(e, dispatch, setChat, setChatOpen)
        );

        dispatch(setUprismSuccess());
      })
      .catch(() => {
        dispatch(setUprismFail());
      });
  }
};

export default uprismInit;
