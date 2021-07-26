import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import SubLayout from "../components/Layout/SubLayout";
import ModalCommon from "../components/Modal/ModalCommon/ModalCommon";
import InfoModal from "../components/Modal/InfoModal/InfoModal";
import AlertIcon from "../components/SVGIcons/AlertIcon";
import { SEND_WATCHED_VIDEO } from "../utils/fetch/apiConfig";
import checkToken from "../utils/common/checkToken";
import styles from "./prevInfo.module.scss";

const prevInfo = ({ confirmData }) => {
  const router = useRouter();
  const videoTime = useRef(0);
  const [isInfoOpen, setInfoOpen] = useState(false);
  const [isNoticeOn, setNoticeOn] = useState(true);
  const [isVideoEnd, setVideoEnd] = useState(false);
  const [fullOpen, setFullOpen] = useState(true);
  const [isHoverShow, setHoverShow] = useState(false);

  const canGo = confirmData.Tester_Which == "Y" || isVideoEnd;

  const sendWatched = () => {
    try {
      axios.post(SEND_WATCHED_VIDEO);
    } catch (error) {
      console.error(error);
    }
  };

  const go = () => {
    if (canGo) {
      router.push({
        pathname: "/device",
        query: {
          mod: "test",
        },
      });
    }
  };

  const fullscreenHandler = (e) => {
    setFullOpen(e.target.webkitDisplayingFullscreen);
  };

  useEffect(() => {
    document.addEventListener("webkitfullscreenchange", fullscreenHandler);
    return () => {
      document.removeEventListener("webkitfullscreenchange", fullscreenHandler);
    };
  }, [fullOpen]);

  return (
    <SubLayout isTest>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.title}>문항 풀이 안내 영상</div>
          <div className={styles.sub_title}>
            아래 영상을 <span>필수 시청</span>해주시길 바랍니다.
            <br />
            영상을 끝까지 시청해야 사전점검을 시작할 수 있습니다.
            <br />
            영상은 <span>전체 화면</span>으로도 크게 시청 가능합니다.
            <br />
            <br />
            ※안내 영상은 <span>무음</span>입니다. 다음 단계에서 스피커 등 주변
            기기 점검을 진행하실 수 있습니다.
          </div>

          <video
            className={styles.video}
            controls
            controlsList="nodownload"
            disablePictureInPicture
            onEnded={(e) => {
              sendWatched();
              setVideoEnd(true);
              if (confirmData.Tester_Which == "Y") {
                return;
              }
              e.target.webkitExitFullScreen();
            }}
            onSeeking={(e) => {
              if (confirmData.Tester_Which == "Y") {
                return;
              }

              if (e.target.currentTime - videoTime.current > 0.01) {
                e.target.currentTime = videoTime.current;
              }
            }}
            onTimeUpdate={(e) => {
              if (confirmData.Tester_Which == "Y") {
                return;
              }

              if (!e.target.seeking) {
                //현재 위치까지 저장
                videoTime.current < e.target.currentTime
                  ? (videoTime.current = e.target.currentTime)
                  : null;
              }
            }}
            onPlay={(e) => {
              if (fullOpen) {
                e.target.webkitRequestFullscreen();
              }
            }}
          >
            <source src="/info.webm" type="video/webm" />
          </video>

          <div className={styles.btn_wrap}>
            <div
              className={styles.show}
              onClick={() => setInfoOpen(true)}
              onMouseOver={() => setHoverShow(true)}
              onMouseLeave={() => setHoverShow(false)}
            >
              <img src="/img/file.svg" alt="file" />
              <span>응시자 안내 사항 확인 가능</span>
            </div>
            <div
              className={`${styles.go} ${canGo ? styles.able : ""}`}
              onClick={() => go()}
            >
              사전점검 시작하기
              <i className="xi-arrow-right" />
            </div>
          </div>
        </div>
      </div>
      {isInfoOpen && <InfoModal setModalOpen={setInfoOpen} />}
      {isNoticeOn && (
        <ModalCommon darkBg blockExit>
          <div className={styles.notice}>
            <AlertIcon color="#da291c" />
            <p>사전점검은 1회만 실시할 수 있습니다.</p>
            <span>
              사전점검 진행 중 추가모니터 연결, 진단 프로그램 외 다른 프로그램
              실행 시<br />
              부정행위로 간주되어 본 진단에 응시하실 수 없으니 유의하시기
              바랍니다.
            </span>
            <span>아래 확인 버튼을 클릭하면 사전점검이 시작됩니다.</span>
            <div
              className={styles.notice_ok}
              onClick={() => setNoticeOn(false)}
            >
              확인
            </div>
          </div>
        </ModalCommon>
      )}
    </SubLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  return await checkToken(ctx);
};

export default prevInfo;
