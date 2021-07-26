import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import htmlParser from "react-html-parser";
import { useRouter } from "next/router";
import getUserScreen from "../../utils/common/getUserScreen";
import ModalCommon from "../Modal/ModalCommon/ModalCommon";
import { setCheck } from "../../utils/store/actions/userStateAction";
import AlertIcon from "../SVGIcons/AlertIcon";
import styles from "./DeviceCheck.module.scss";

const screenText = {
  check:
    "PC 화면이 공유되는지 확인해 주세요.<br /><span class='red'>※ 추가 모니터 연결 시 프로그램 강제 종료 및 부정행위 처리</span>",
};

const DeviceCheck = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [focus, setFocus] = useState(1);
  const screenCheck = useRef(null);
  const videoCheck = useRef(null);
  const inputCheck = useRef(null);
  const testAudio = useRef(null);
  const [isPlayTestSound, setPlayTestSound] = useState(false);
  const [soundSize, setSoundSize] = useState(0);
  const [screenState, setScreenState] = useState({
    state: true,
    msg: screenText.check,
  });
  const [deviceList, setDeviceList] = useState({
    audioinput: [],
    audiooutput: [],
    videoinput: [],
  });
  const [checked, setChecked] = useState([false, false, false, false]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isInOpen, setInOpen] = useState(true);

  const goNext = () => {
    if (checked.includes(false)) {
      return;
    }
    //이동
    router.push("/info");
  };

  const soundBar = (e) => {
    setSoundSize(e / 1000);
  };

  const testPlaySoundBtn = () => {
    if (focus !== 4) {
      return;
    }
    if (isPlayTestSound) {
      testAudio.current.pause();
      setPlayTestSound(false);
    } else {
      testAudio.current.play();
      setPlayTestSound(true);
    }
  };

  useEffect(() => {
    if (!checked.includes(false)) {
      setModalOpen(true);
    }
  }, [checked]);

  useEffect(() => {
    if (router.query.mod === "test") {
      //사전 점검 출석체크
      dispatch(setCheck(true));
    }
  }, [router.query]);

  useEffect(() => {
    //화면 공유
    getUserScreen(screenCheck.current, setScreenState, screenText);

    //device init
    uprism.device.init({
      video: videoCheck.current,
      audio: inputCheck.current,
      volumeChangeCallback: soundBar,
    });

    uprism.device
      .getDeviceList()
      .then((deviceList) => setDeviceList(deviceList));
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div
          className={`${styles.item} ${
            focus < 1 ? styles.item_disable : focus === 1 ? styles.item_now : ""
          }`}
        >
          <div className={styles.item_title}>
            PC화면 공유
            <div
              className={`${styles.next} ${checked[0] ? styles.checked : ""}`}
              style={{
                backgroundColor: checked[0] ? "#DA291C" : "",
                color: checked[0] ? "#ffffff" : "",
                border: checked[0] ? `1px solid ${"#DA291C"}` : "",
              }}
              onClick={() => {
                if (focus !== 1 || !screenState.state) {
                  return;
                }
                setFocus(2);
                setChecked((prev) =>
                  prev.map((data, dataIdx) => (dataIdx === 0 ? !data : data))
                );
              }}
            >
              {checked[0] ? (
                <i className="xi-check" />
              ) : screenState.state ? (
                "확인"
              ) : (
                "!"
              )}
            </div>
          </div>
          <video ref={screenCheck} className={styles.video} muted />
          <div
            className={`${styles.ctx} ${screenState.state ? "" : styles.warn}`}
          >
            <div>{htmlParser(screenState.msg)}</div>
          </div>
        </div>
        <div
          className={`${styles.item} ${
            focus < 2 ? styles.item_disable : focus === 2 ? styles.item_now : ""
          }`}
        >
          <div className={styles.item_title}>
            웹캠
            <div
              className={`${styles.next} ${checked[1] ? styles.checked : ""}`}
              style={{
                backgroundColor: checked[1] ? "#DA291C" : "",
                color: checked[1] ? "#ffffff" : "",
                border: checked[1] ? `1px solid ${"#DA291C"}` : "",
              }}
              onClick={() => {
                if (focus !== 2 || !deviceList.videoinput.length) {
                  return;
                }
                setFocus(3);
                setChecked((prev) =>
                  prev.map((data, dataIdx) => (dataIdx === 1 ? !data : data))
                );
              }}
            >
              {checked[1] ? (
                <i className="xi-check" />
              ) : deviceList.videoinput.length ? (
                "확인"
              ) : (
                "!"
              )}
            </div>
          </div>
          <video ref={videoCheck} className={styles.video} muted />
          <div
            className={`${styles.ctx} ${
              deviceList.videoinput.length ? "" : styles.warn
            }`}
          >
            <div>
              {deviceList.videoinput.length ? (
                "화면에 본인의 상반신 모습이 나오도록 각도를 조절해주세요."
              ) : (
                <span className="red">※ 웹캠 연결을 확인해 주세요.</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div
          className={`${styles.item} ${
            focus < 3 ? styles.item_disable : focus === 3 ? styles.item_now : ""
          }`}
        >
          <div className={styles.item_title}>
            마이크
            <div
              className={`${styles.next} ${checked[2] ? styles.checked : ""}`}
              style={{
                backgroundColor: checked[2] ? "#DA291C" : "",
                color: checked[2] ? "#ffffff" : "",
                border: checked[2] ? `1px solid ${"#DA291C"}` : "",
              }}
              onClick={() => {
                if (focus !== 3 || !deviceList.audioinput.length) {
                  return;
                }
                setFocus(4);
                setChecked((prev) =>
                  prev.map((data, dataIdx) => (dataIdx === 2 ? !data : data))
                );
              }}
            >
              {checked[2] ? (
                <i className="xi-check" />
              ) : deviceList.audioinput.length ? (
                "확인"
              ) : (
                "!"
              )}
            </div>
          </div>
          <div className={styles.sound}>
            <div
              className={styles.bar}
              style={{
                width: `${soundSize}%`,
                backgroundColor: "#DA291C",
              }}
            />
          </div>
          <div
            className={`${styles.ctx} ${
              deviceList.audioinput.length && soundSize !== 0 ? "" : styles.warn
            }`}
          >
            <div>
              {deviceList.audioinput.length ? (
                soundSize === 0 ? (
                  <span className="red">※ 음소거 여부를 확인해 주세요.</span>
                ) : (
                  <>
                    소리를 내어 사운드바가 움직이는지 확인해 주세요.
                    <br />
                    <span className="red">※ 노트북: 내장마이크 사용 권장</span>
                  </>
                )
              ) : (
                <span className="red">※ 마이크 연결을 확인해 주세요.</span>
              )}
            </div>
          </div>
        </div>
        <div
          className={`${styles.item} ${
            focus < 4 ? styles.item_disable : focus === 4 ? styles.item_now : ""
          }`}
        >
          <div className={styles.item_title}>
            스피커
            <div
              className={`${styles.next} ${checked[3] ? styles.checked : ""}`}
              style={{
                backgroundColor: checked[3] ? "#DA291C" : "",
                color: checked[3] ? "#ffffff" : "",
                border: checked[3] ? `1px solid ${"#DA291C"}` : "",
              }}
              onClick={() => {
                if (focus !== 4 || !deviceList.audiooutput.length) {
                  return;
                }
                setFocus(5);
                setChecked((prev) =>
                  prev.map((data, dataIdx) => (dataIdx === 3 ? !data : data))
                );
              }}
            >
              {checked[3] ? (
                <i className="xi-check" />
              ) : deviceList.audiooutput.length ? (
                "확인"
              ) : (
                "!"
              )}
            </div>
          </div>
          <div className={styles.soundTest} onClick={testPlaySoundBtn}>
            {testAudio.current && !testAudio.current.paused ? (
              <i
                className="xi-spinner-5 xi-spin"
                style={{ color: "#DA291C" }}
              />
            ) : (
              <i className="xi-play" style={{ color: "#DA291C" }} />
            )}
            {testAudio.current && !testAudio.current.paused ? (
              <u>재생중</u>
            ) : (
              <u>사운드 테스트</u>
            )}
          </div>
          <audio src="/audio/soundTest.mp3" type="audio/mpeg" ref={testAudio} />
          <div
            className={`${styles.ctx} ${
              deviceList.audiooutput.length ? "" : styles.warn
            }`}
          >
            <div>
              {deviceList.audiooutput.length ? (
                <>
                  사운드 테스트를 클릭하여 소리가 잘 들리는지 확인해 주세요.
                  <br />
                  <span className="red">※ 노트북: 내장 스피커 사용 권장</span>
                </>
              ) : (
                <span className="red">
                  ※ 스피커/이어폰 연결을 확인해 주세요.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {isInOpen && (
        <ModalCommon setModalOpen={setInOpen} blockExit darkBg>
          <div className={styles.done_wrap}>
            <AlertIcon color="#da291c" />
            <br />
            PC를 권장 해상도로 설정하지 않은 응시자께서는
            <br />
            해상도 설정을 변경하신 후 재로그인 해주세요.
            <div className={`${styles.done}`} onClick={() => setInOpen(false)}>
              확인
            </div>
          </div>
        </ModalCommon>
      )}
      {isModalOpen && (
        <ModalCommon setModalOpen={setModalOpen} blockExit darkBg>
          {router.query.mod === "test" ? (
            <div className={styles.done_wrap}>
              <div className={styles.done_text}>
                <img src="/img/check.svg" alt="check" />
                시스템 점검 완료
              </div>
              <p>아래 확인 버튼을 클릭하면 예제 풀이 화면으로 이동합니다.</p>
              예제풀이는 휴식시간 없이 총 30분간 진행되며,
              <br />
              상단 종료 버튼 클릭 시 예제 풀이를 미리 종료할 수 있습니다.
              <br />
              예제 풀이 종료 후 사전점검 종료화면에서 반드시 확인 버튼을
              클릭해야
              <br />
              정상적으로 사전점검 완료 처리됩니다.
              <br />
              <br />
              <span>
                사전점검 미완료 시 본 진단 응시가 제한됩니다.
                <br />
                (로그인 불가)
              </span>
              <div
                className={`${styles.done} ${
                  checked.includes(false) ? styles.done_disable : ""
                }`}
                onClick={() => router.push("/main")}
              >
                확인
              </div>
            </div>
          ) : (
            <div className={styles.done_wrap}>
              <div className={styles.done_text}>
                <img src="/img/check.svg" alt="check" />
                시스템 점검 완료
              </div>
              버튼을 클릭하면
              <br />
              진단 준비 화면으로 이동합니다.
              <div
                className={`${styles.done} ${
                  checked.includes(false) ? styles.done_disable : ""
                }`}
                onClick={goNext}
              >
                확인
              </div>
            </div>
          )}
        </ModalCommon>
      )}
    </div>
  );
};

export default DeviceCheck;
