import { useState } from "react";
import styles from "./Ready.module.scss";
import ModalCommon from "../Modal/ModalCommon/ModalCommon";
import Modal from "../Modal/Modal";

const Ready = ({ time, Notice }) => {
  const [isShowingToggle, setShowingToggle] = useState(true);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [isVideoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <div className={styles.wrap}>
      {(() => {
        if (time <= 600) {
          return (
            <>
              <div className={styles.title}>
                잠시 후 진단이 시작될 예정입니다.
              </div>

              <div className={styles.sub_title}>
                좌측 상단의 <span>남은 시간</span>이 종료되면, 자동으로 진단이
                시작됩니다.
              </div>

              <div className={styles.ctx} style={{ marginBottom: 8 }}>
                진단은 별도의 쉬는 시간 없이{" "}
                <span className={styles.time}>120분간</span> 진행됩니다.
              </div>

              <div className={styles.ctx}>
                아래 사항을 필독하여 준수 바랍니다.
              </div>

              <div className={styles.infob}>
                <div className={styles.ii}>
                  <i className="xi-check" />
                </div>
                <div>
                  <span>휴대전화 전원을 종료</span>해주십시오.
                  <br />
                  진단 중 휴대전화가 켜져 있을 경우, 부정행위로 간주됩니다.
                  <br />
                  (개인용 네트워크 ‘모바일 핫스팟’ 사용 불가)
                </div>
              </div>

              <div className={styles.infob}>
                <div className={styles.ii}>
                  <i className="xi-check" />
                </div>
                <div>
                  <span>주변 환경을 정리해</span>주시기 바랍니다.
                  <br />
                  주변에 전자기기, 필기구 등 금지 물품들이 보일 시, 부정행위로
                  간주됩니다.
                </div>
              </div>

              <div className={styles.infob}>
                <div className={styles.ii}>
                  <i className="xi-check" />
                </div>
                <div>
                  지금부터 진단 종료까지
                  <span> 자리 이동이 금지</span>됩니다.
                </div>
              </div>

              <div className={styles.infob}>
                <div className={styles.ii}>
                  <i className="xi-check" />
                </div>
                <div>
                  진단 중 <span>연습장과 종이 메모지 사용 및 필기가 불가</span>
                  합니다.
                </div>
              </div>

              <div className={styles.infob}>
                <div className={styles.ii}>
                  <i className="xi-check" />
                </div>
                <div>
                  진단 중 감독위원의 요청에 따라
                  <br />
                  <span>
                    불시에 주변 환경 점검 및 휴대전화 On/Off 확인을 진행
                  </span>
                  할 수 있습니다.
                </div>
              </div>

              <div className={styles.infob}>
                <div className={styles.ii}>
                  <i className="xi-check" />
                </div>
                <div>
                  진단 중 확인이 필요한 <span>특이 상황 발생 시,</span>
                  <br />
                  감독위원의 판단에 따라 <span>진단이 일시적으로 중단</span>될
                  수 있습니다.
                  <br />
                  최대한 빠르게 상황을 확인한 후, 진단은 일시 정지된 시점
                  이후부터 연이어 진행됩니다.
                </div>
              </div>
            </>
          );
        } else {
          return (
            <>
              <div
                className={styles.sub_title}
                style={{ marginBottom: 32, textAlign: "center" }}
              >
                좌측 상단의 <span>남은 시간</span>이 종료되면, 자동으로 진단이
                시작됩니다.
              </div>

              <div
                className={styles.ctx}
                style={{ marginBottom: 16, textAlign: "center" }}
              >
                <span>지금부터 ‘남은 시간 10:00’ 전까지</span> 잠시 화장실에
                다녀오실 수 있습니다.
                <br />
                <span>‘남은 시간 10:00’ 후부터는</span> 자리 이동 없이 착석을
                유지해 주셔야 합니다.
              </div>

              <div
                className={styles.ctx}
                style={{ marginBottom: 16, textAlign: "center" }}
              >
                진단은 별도의 쉬는 시간 없이{" "}
                <span className={styles.time}>120분간</span> 진행됩니다.
              </div>

              <div
                className={styles.ctx}
                style={{ marginBottom: 32, textAlign: "center" }}
              >
                남은 시간 동안 아래 “응시자 유의사항”을 확인하고,
                <br />
                “안내 영상 시청”을 진행하여 진단을 준비해 주시길 부탁드립니다.
              </div>
            </>
          );
        }
      })()}
      <div style={{ display: "flex", marginTop: 16 }}>
        <div
          className={styles.btn}
          onClick={() => setInfoModalOpen(true)}
          style={{ marginRight: 16 }}
        >
          <img src="/img/file.svg" alt="file" style={{ width: 28 }} />
          응시자 유의사항
        </div>
        <div className={styles.btn} onClick={() => setVideoModalOpen(true)}>
          <img src="/img/play.svg" alt="play" style={{ width: 34 }} />
          안내 영상 시청
          {isShowingToggle && (
            <div className={styles.toggle}>
              안내 영상을 시청해 주세요.
              <div className={styles.angle} />
            </div>
          )}
        </div>
      </div>
      {isInfoModalOpen && (
        <ModalCommon setModalOpen={setInfoModalOpen} title="응시자 유의사항">
          <div
            style={{
              width: 840,
              height: 600,
              overflow: "auto",
            }}
          >
            <Notice />
          </div>
        </ModalCommon>
      )}
      {isVideoModalOpen && (
        <Modal center setModalOpen={setVideoModalOpen}>
          <div className={styles.vid}>
            <div className={styles.c_wrap}>
              <i
                className="xi-close"
                onClick={() => setVideoModalOpen(false)}
              />
            </div>
            <video
              controls
              controlsList="nodownload"
              disablePictureInPicture
              className={styles.video}
            >
              <source src="/info_main.webm" type="video/webm" />
            </video>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Ready;
