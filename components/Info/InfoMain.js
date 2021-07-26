import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Scrollbar from "react-scrollbars-custom";
import { setIdCard } from "../../utils/store/actions/uprismStateAction";
import axios from "axios";
import {
  SEND_AGREE,
  SEND_ID_CARD,
  SEND_ATTEND,
} from "../../utils/fetch/apiConfig";
import {
  setChat,
  setChatOpen,
} from "../../utils/store/actions/uprismStateAction";
import { chatTimeFomatter } from "../../utils/common/fomatter";
import styles from "./InfoMain.module.scss";

export const Notice = () => {
  return (
    <div className={styles.ctx}>
      원활한 진단 진행을 위해 아래 내용을 충분히 숙지하시기 바랍니다.
      <div style={{ margin: "2em 0 0  1em", lineHeight: 2.4 }}>
        <b>
          <u>진단 유의사항</u>
        </b>
        <div style={{ display: "flex", wordBreak: "keep-all" }}>
          •
          <div style={{ marginLeft: "0.5em" }}>
            진단은 총 3시간 동안 진행됩니다. (진단 준비 1시간 + 본 진단 2시간)
          </div>
        </div>
        <div style={{ display: "flex" }}>
          •
          <div style={{ marginLeft: "0.5em", wordBreak: "keep-all" }}>
            화면 좌측 상단에 표시된 남은 시간 내 시스템 점검 및 진단 준비 단계를
            완료해야 본 진단을 응시할 수 있습니다.
          </div>
        </div>
        <div style={{ display: "flex" }}>
          •
          <div style={{ marginLeft: "0.5em", wordBreak: "keep-all" }}>
            화면 우측 상단에 표시된 응시자의 이름을 클릭하면 감독위원과 채팅 할
            수 있습니다.
          </div>
        </div>
        <div style={{ display: "flex" }}>
          •
          <div style={{ marginLeft: "0.5em", wordBreak: "keep-all" }}>
            본 진단을 시작하기 전, 유선 전화 문의 또는 감독위원 영상 통화 요청
            수락 등을 위해,
            <br />
            감독위원의 별도 안내가 있기 전까지는 휴대전화 전원을 켜 놓은 상태로
            유지해 주시기 바랍니다.
          </div>
        </div>
        <div style={{ display: "flex" }}>
          •
          <div style={{ marginLeft: "0.5em", wordBreak: "keep-all" }}>
            진단 중에는 휴대전화 사용이 불가하오니(부정행위 처리) 검사 시작 10분
            전부터 휴대전화 전원을 종료하여 주시기 바랍니다. (모바일 핫스팟 사용
            불가)
          </div>
        </div>
        <div style={{ display: "flex" }}>
          •
          <div style={{ marginLeft: "0.5em", wordBreak: "keep-all" }}>
            진단 시작 10분 전부터는 자리 이동이 불가하오니 미리 화장실을
            다녀오시기 바랍니다.
          </div>
        </div>
        <div style={{ display: "flex" }}>
          •
          <div style={{ marginLeft: "0.5em", wordBreak: "keep-all" }}>
            진단 중 연습장과 종이 메모지 사용 및 필기가 불가합니다.
          </div>
        </div>
        <div style={{ display: "flex" }}>
          •
          <div style={{ marginLeft: "0.5em", wordBreak: "keep-all" }}>
            응시자 PC 및 응시 영상은 실시간 감독 및 녹화되며, 진단 중에는 본인
            상반신이 보이는 자세를 유지해 주시기 바랍니다.
          </div>
        </div>
        <div style={{ display: "flex" }}>
          •
          <div style={{ marginLeft: "0.5em", wordBreak: "keep-all" }}>
            추가 모니터 연결, 문항 유출 시도, 감독위원 외 타인과의 소통 시 검사
            프로그램이 강제 종료되며 재로그인이 불가합니다.
          </div>
        </div>
        <div style={{ display: "flex" }}>
          •
          <div style={{ marginLeft: "0.5em", wordBreak: "keep-all" }}>
            응답 데이터는 실시간 저장됩니다.
            <br />
            진단 중 PC 네트워크 이상으로 재로그인 시 감독위원의 안내에 따라
            중단된 시점부터 검사를 진행할 수 있습니다.
          </div>
        </div>
        <div style={{ display: "flex" }}>
          •
          <div style={{ marginLeft: "0.5em", wordBreak: "keep-all" }}>
            진단 중 감독위원의 요청에 따라 불시에 주변 환경 점검 및 휴대전화
            On/Off 확인을 진행할 수 있습니다.
          </div>
        </div>
        <div style={{ display: "flex" }}>
          •
          <div style={{ marginLeft: "0.5em", wordBreak: "keep-all" }}>
            진단 중 확인이 필요한 특이 상황 발생 시, 감독위원의 판단에 따라
            진단이 일시적으로 중단될 수 있으며,
            <br />
            상황 확인 후, 진단은 일시 정지된 시점 이후부터 연이어 진행됩니다.
          </div>
        </div>
        <div style={{ display: "flex", marginTop: "1em" }}>
          ※비상연락망(02-549-5222)
        </div>
      </div>
      <br />
      <div style={{ marginLeft: "1em" }}>
        <b>
          <u>부정행위 유형 및 처리 방침</u>
        </b>
        <div style={{ wordBreak: "keep-all" }}>
          진단 진행 중 또는 진단 종료 후 감독위원의 확인 결과 부정행위가 적발된
          응시자는 해당 부정행위의 수준과 내용에 따라 결과를 원천 무효 처리하며,
          채용의 불이익이 있을 수 있습니다.
        </div>
      </div>
      <div style={{ margin: "1em 0 0  1em", lineHeight: 2.4 }}>
        <div style={{ display: "flex" }}>
          •
          <div style={{ marginLeft: "0.5em", wordBreak: "keep-all" }}>
            <b>신분증 및 증빙서류를 위·변조하여 진단을 치르는 경우</b>
          </div>
        </div>
      </div>
      <div style={{ margin: "1em 0 0  1em", lineHeight: 2.4 }}>
        <div style={{ display: "flex" }}>
          •
          <div style={{ marginLeft: "0.5em", wordBreak: "keep-all" }}>
            <b>대리시험을 의뢰하거나 대리로 진단에 응시하는 경우</b>
          </div>
        </div>
      </div>
      <div style={{ margin: "1em 0 0  1em", lineHeight: 2.4 }}>
        <div style={{ display: "flex" }}>
          •
          <div style={{ marginLeft: "0.5em", wordBreak: "keep-all" }}>
            <b>문제의 일부 혹은 전체를 유출하는 시도를 하는 경우</b>
          </div>
        </div>
      </div>
      <div style={{ margin: "1em 0 0  2em", lineHeight: 2.4 }}>
        <div style={{ display: "flex" }}>
          ·
          <div style={{ marginLeft: "0.5em", wordBreak: "keep-all" }}>
            <b>독립된 공간이 아닌 경우</b>
            <br />
            1인 1실 공간이 아닌 장소(타인의 방해를 받을 수 있는 장소)에서 응시
            불가
          </div>
        </div>
        <div style={{ display: "flex" }}>
          ·
          <div style={{ marginLeft: "0.5em", wordBreak: "keep-all" }}>
            <b>소지 불가 물품을 지니고 있거나 사용하는 경우</b>
            <br />
            책상 위 PC, 신분증, 휴대전화(진단 10분 전 종료) 외 기타 물건 비치
            불가
          </div>
        </div>
        <div style={{ display: "flex" }}>
          ·
          <div style={{ marginLeft: "0.5em", wordBreak: "keep-all" }}>
            <b>진단 중 무단으로 자리를 이탈하는 경우</b>
            <br />
            진단 10분 전 부터 자리 이동 불가
          </div>
        </div>
        <div style={{ display: "flex" }}>
          ·
          <div style={{ marginLeft: "0.5em", wordBreak: "keep-all" }}>
            <b>타인과 소통하는 경우</b>
            <br />
            진단 중 타인의 소리가 감지된 경우 감독위원 개입하여 상황 확인
          </div>
        </div>
        <div style={{ display: "flex" }}>
          ·
          <div style={{ marginLeft: "0.5em", wordBreak: "keep-all" }}>
            <b>추가 모니터(듀얼 모니터) 연결을 시도하는 경우</b>
            <br />
            1개 모니터만 사용 가능, 2개 이상 시도 시 즉시 강제 종료
          </div>
        </div>
        <div style={{ display: "flex" }}>
          ·
          <div style={{ marginLeft: "0.5em", wordBreak: "keep-all" }}>
            <b>화면 캡쳐, 촬영, 메모 등을 통해 문항 유출을 시도하는 경우</b>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          ·
          <div style={{ marginLeft: "0.5em", wordBreak: "keep-all" }}>
            <b>
              메신저, 인터넷 등 타 프로그램 이용을 위해 화면전환 등을 시도하는
              경우
            </b>
          </div>
        </div>
      </div>
      <div style={{ margin: "1em 0 0  1em", lineHeight: 2.4 }}>
        <div style={{ display: "flex" }}>
          •
          <div style={{ marginLeft: "0.5em", wordBreak: "keep-all" }}>
            <b>
              공정한 진단 응시를 위한 감독위원의 요청사항/지시에 불응하는 경우
            </b>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoMain = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.userInfo.Tester_Name);
  const uprismState = useSelector((state) => state.uprismState);
  const userState = useSelector((state) => state.userState);
  const [openState, setOpenState] = useState(1);
  const [name, setName] = useState("");
  const [isReadEnd1, setReadEnd1] = useState(false);
  const [isComment1On, setComment1On] = useState(false);
  const [isComment2On, setComment2On] = useState("");
  const [isCheck1, setCheck1] = useState(true);
  const [isCheck2, setCheck2] = useState(false);
  const [isAgreeHover, setAgreeHover] = useState(false);
  const [agreeNotice, setAgreeNotice] = useState(false);
  const isSendedMsg = useRef(false);

  const checkUserName = name === userName;

  const openIdCardPopUp = () => {
    if (uprismState.state !== "SUCCESS") {
      return;
    }
    try {
      uprism.id.openIdCardPopup();
    } catch (error) {
      console.error(error);
    }
  };

  const onHandleCaptureIDCard = useCallback(() => {
    if (!isSendedMsg.current) {
      setComment2On("감독위원 연결 대기 중입니다. 잠시 기다려 주십시오.");
      return;
    }

    if (!agreeNotice) {
      setComment2On("평가대상자 유의사항을 먼저 읽고 확인을 눌러주세요.");
      return;
    }

    if (!checkUserName) {
      setComment2On("성명을 확인해 주세요.");
      return;
    }
    if (openState === 3) {
      setComment2On("");
      openIdCardPopUp();
    } else {
      setComment2On("");
      openIdCardPopUp();
      setOpenState(3);
    }
  }, [
    openState,
    agreeNotice,
    isComment2On,
    checkUserName,
    isSendedMsg.current,
  ]);

  useEffect(() => {
    if (uprismState.state == "SUCCESS" && !isSendedMsg.current) {
      dispatch(
        setChat({
          message:
            "지금부터 [1:1 문의작성하기]는 중지됩니다. [FAQ 확인하기] 또는 우측 상단 응시자명을 클릭하여 감독위원에게 채팅으로 문의가 가능합니다.",
          type: "all",
          date: chatTimeFomatter(),
        })
      );
      dispatch(setChatOpen(true));
      isSendedMsg.current = true;
    }
  }, [uprismState]);

  useEffect(() => {
    if (userState.check) {
      (async () => {
        try {
          await Promise.all([
            axios.post(SEND_AGREE),
            axios.post(SEND_ATTEND),
            uprismState.idCard &&
              axios.post(SEND_ID_CARD, { image: uprismState.idCard }),
          ]);
          dispatch(setIdCard(""));
          router.push("/ready");
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [userState]);

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className={styles.item_title}>
          <div
            className={styles.title_wrap}
            onClick={() => setOpenState((prev) => (prev === 1 ? 0 : 1))}
          >
            <div className={styles.title}>
              응시자 유의사항
              <div className={styles.star}>*</div>
            </div>
            <i className={openState === 1 ? "xi-angle-up" : "xi-angle-down"} />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ color: "#da291c" }}>
              {isComment1On && "응시자 유의사항을 끝까지 읽어주세요."}
            </span>
            <div
              className={`${styles.agreeNotice} ${
                agreeNotice ? styles.agree : ""
              }`}
              onClick={() => {
                if (openState === 1) {
                  if (isReadEnd1) {
                    setComment1On(false);
                    setAgreeNotice((prev) => !prev);
                  } else {
                    setComment1On(true);
                  }
                } else {
                  setOpenState(1);
                }
              }}
            >
              {agreeNotice || isAgreeHover ? <i className="xi-check" /> : ""}
              확인
            </div>
          </div>
        </div>
        {openState === 1 && (
          <div className={styles.item_ctx}>
            <Scrollbar
              noDefaultStyles
              disableTracksWidthCompensation
              onUpdate={(s) =>
                s.scrollHeight <= s.scrollTop + s.clientHeight + 30
                  ? setReadEnd1(true)
                  : null
              }
            >
              <Notice />
            </Scrollbar>
          </div>
        )}
      </div>

      <div className={styles.container}>
        <div className={styles.item_title}>
          <div
            className={styles.title_wrap}
            onClick={() => setOpenState((prev) => (prev === 2 ? 0 : 2))}
          >
            <div className={styles.title}>
              보안 유지 서약
              <div className={styles.star}>*</div>
            </div>
            <i className={openState === 2 ? "xi-angle-up" : "xi-angle-down"} />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ color: "#da291c" }}>{isComment2On}</span>
            <input
              className={styles.name}
              placeholder="이름을 작성해주세요."
              value={name}
              onChange={(e) => {
                if (isCheck1 && isCheck2) {
                  setName(e.target.value);
                  setComment2On("");
                } else {
                  setComment2On("보안 유지 서약에 동의해 주세요.");
                }
              }}
              onFocus={() => (openState !== 2 ? setOpenState(2) : "")}
            />
          </div>
        </div>
        {openState === 2 && (
          <div className={styles.item_ctx}>
            <Scrollbar noDefaultStyles disableTracksWidthCompensation>
              <div className={styles.ctx}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <u>보안 유지 서약</u>
                  <div
                    className={styles.ca_wrap}
                    onClick={() => setCheck2((prev) => !prev)}
                  >
                    동의
                    <div
                      className={`${styles.check} ${isCheck2 ? styles.ca : ""}`}
                    >
                      <i className="xi-check" />
                    </div>
                  </div>
                </div>
                본인은 L-TAB에 관한 문항 정보 및 이에 대한 설명자료, 운영시스템
                등 진단과 관련된 모든 정보(이하 ‘진단 관련 정보’)가 영업 비밀에
                속한다는 사실을 충분히 인지하고 있습니다. 이에, 아래 사항을
                신의성실의 원칙에 입각하여 성실히 준수할 것을 굳게 서약합니다.
                <br />
                <br />
                <div style={{ display: "flex", marginLeft: 16 }}>
                  1.
                  <div style={{ marginLeft: 8 }}>
                    본인은 L-TAB 문항의 일부 또는 전부를 무단 유출, 복제, 배포,
                    출판하는 등 저작권을 침해하는 일체의 행위를 하지 않습니다.
                    저작권자의 사전 승인 없이 무단전재 혹은 재배포하는 경우,
                    관련 법령에 따라 제재를 받을 수 있습니다.
                  </div>
                </div>
                <br />
                <div style={{ display: "flex", marginLeft: 16 }}>
                  2.
                  <div style={{ marginLeft: 8 }}>
                    본인은 L-TAB 응시 과정에서 알게 된 ‘진단 관련 정보’를 어떠한
                    방법으로도 외부에 누설/사용/공개하는 등 영업 비밀을 침해하는
                    일체의 행위를 하지 않습니다.
                  </div>
                </div>
                <br />
                <div style={{ display: "flex", marginLeft: 16 }}>
                  3.
                  <div style={{ marginLeft: 8 }}>
                    본인은 본 서약을 위반하는 경우 저작권법, 부정경쟁방지 및
                    영업비밀보호에 관한 법률 등 관련 법령을 어기는 것으로, 이로
                    인한 책임은 동기 여하를 불문하고 전적으로 본인에게 있음을
                    충분히 인지하고 있습니다.
                  </div>
                </div>
                <br />
                본인은 상기 사항을 숙지하고 이를 성실히 이행할 것에 동의하며,
                만약 본 서약에도 불구하고 상기 사항 중 하나라도 위반하였을 경우
                향후 채용 전형 지원 제한 및 채용에서의 각종 불이익을 감수할 것을
                서약합니다.
                <br />
                <br />
              </div>
            </Scrollbar>
          </div>
        )}
      </div>

      <div className={styles.container}>
        <div className={styles.item_title}>
          <div
            className={styles.title_wrap}
            onClick={() => setOpenState((prev) => (prev === 3 ? 0 : 3))}
          >
            <div className={styles.title}>
              신분증 등록
              <div className={styles.star}>*</div>
            </div>
            <i className={openState === 3 ? "xi-angle-up" : "xi-angle-down"} />
          </div>
          <div className={styles.id_btn} onClick={onHandleCaptureIDCard}>
            신분증 촬영
            {!isSendedMsg.current && <i className="xi-spinner-1 xi-spin" />}
          </div>
        </div>
        {openState === 3 && (
          <div className={styles.item_ctx}>
            <Scrollbar noDefaultStyles disableTracksWidthCompensation>
              <div className={styles.ctx}>
                <div className={styles.id_txt} style={{ lineHeight: 1.6 }}>
                  신분증 예시
                </div>
                <div className={styles.id_wrap}>
                  <div className={styles.id_container}>
                    <div className={styles.id_box}>
                      <img
                        src="/img/id_yg.jpg"
                        alt="id check"
                        className={styles.yg}
                      />
                    </div>
                    <div className={styles.id_box}>
                      <img
                        src="/img/id_jm.jpg"
                        alt="id check"
                        className={styles.jm}
                      />
                    </div>
                    <div className={styles.id_box}>
                      <img
                        src="/img/id_fr.jpg"
                        alt="id check"
                        className={styles.fr}
                      />
                    </div>
                    <div className={styles.id_box}>
                      <img
                        src="/img/id_uj.jpg"
                        alt="id check"
                        className={styles.uj}
                      />
                    </div>
                  </div>
                  <div className={styles.id}>
                    {uprismState.idCard ? (
                      <img src={uprismState.idCard} alt="id card" />
                    ) : (
                      <>
                        <img
                          src="/img/camera.svg"
                          alt="camera"
                          style={{ width: 30, height: 30 }}
                        />
                        촬영한 신분증이 등록됩니다.
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Scrollbar>
          </div>
        )}
      </div>
      <div className={styles.sub_ctx}>
        {(() => {
          if (checkUserName && uprismState.idCard && agreeNotice) {
            return (
              <>
                <span>
                  출석을 확인 중입니다. 감독위원의 확인이 완료되면 진단 대기
                  화면으로 자동으로 이동합니다.
                </span>
                <div className="loaderSpinner_small" />
              </>
            );
          } else {
            return "응시자 유의사항 확인 및 보안 유지 서약 후 신분증 등록을 완료해 주시기 바랍니다.";
          }
        })()}
      </div>
    </div>
  );
};

export default InfoMain;
