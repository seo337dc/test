import { useEffect, useState } from "react";
import AdminEmailLayout from "../AdminEmailLayout/AdminEmailLayout";
import { convertNum } from "../../../../utils/common/adminFun";
import styles from "./AdminTableTrip.module.scss";

const AdminTableTrip = ({
  setEditorDataList,
  onHandleEditDelete,
  data,
  Intern_Quest_ID,
}) => {
  const [doc, setDoc] = useState({
    docNum: "",
    docWriter: "",
    docWritedate: "검사 날짜",
  });

  const [info, setInfo] = useState({
    group: "",
    teamMember: "",
    leaderMember: "",
    period: "",
    time: "",
    location: "",
    totalMember: "",
    remark: "",
  });

  const [cost, setCost] = useState({
    total: "",
    expence: "",
    food: "",
    lodgment: "",
    traffic: "",
  });

  const [costSub, setCostSub] = useState({
    expenceSub: "",
    foodSub: "",
    lodgmentSub: "",
    trafficSub: "",
  });

  const [code, setCode] = useState({
    codeTeam: { key: Intern_Quest_ID + "_", answer: "" },
    codeLeader: { key: Intern_Quest_ID + "_", answer: "" },
    codeTotal: { key: Intern_Quest_ID + "_", answer: "" },
    codeExpense: { key: Intern_Quest_ID + "_", answer: "" },
    codeLodgment: { key: Intern_Quest_ID + "_", answer: "" },
    codeTraffic: { key: Intern_Quest_ID + "_", answer: "" },
  });

  useEffect(() => {
    if (!data.content) return;

    const { doc, info, cost, costSub } = data.content;

    if (doc) setDoc(doc);
    if (info) setInfo(info);
    if (cost) setCost(cost);
    if (data.code) setCode(data.code);
    if (costSub) setCostSub(costSub);
  }, [data]);

  const onChangeDoc = (e) => {
    setDoc({ ...doc, [e.target.name]: e.target.value });
  };

  const onChangeInfo = (e) => {
    if (e.target.name === "teamMember" || e.target.name === "leaderMember") {
      setInfo({ ...info, [e.target.name]: convertNum(e.target.value) });
    } else {
      setInfo({ ...info, [e.target.name]: e.target.value });
    }
  };

  const onChangeCost = (e) => {
    setCost({ ...cost, [e.target.name]: convertNum(e.target.value) });
  };

  const onChangeCode = (e) => {
    switch (e.target.name) {
      case "codeTeam":
        setCode({
          ...code,
          codeTeam: { ...code.codeTeam, key: e.target.value },
        });
    }
    setCode({
      ...code,
      [e.target.name]: { ...code[e.target.name], key: e.target.value },
    });
  };

  const onHandleEditConfirm = () => {
    const { docNum } = doc;

    if (!docNum) {
      alert("문서번호를 입력하세요");
      return;
    }

    const {
      group,
      leaderMember,
      location,
      teamMember,
      time,
      period,
      totalMember,
    } = info;

    if (
      (!group || !period || !teamMember || !time || !leaderMember,
      !totalMember || !location)
    ) {
      alert("출장 일정에 입력하지 않은 정보가 있습니다.");
      return;
    }

    const { total, traffic, lodgment, expence, food } = cost;

    if (!total || !traffic || !lodgment || !expence || !food) {
      alert("예상 비용에 입력하지 않은 정보가 있습니다.");
      return;
    }

    const {
      codeTeam,
      codeLeader,
      codeTotal,
      codeExpense,
      codeLodgment,
      codeTraffic,
    } = code;

    if (
      !codeTotal.key ||
      !codeExpense.key ||
      !codeLodgment.key ||
      !codeTraffic.key ||
      !codeLeader.key ||
      !codeTeam.key
    ) {
      alert("입력하지 않은 고유코드가 있습니다.");
      return;
    }

    let newCode = {
      codeTeam: { ...code.codeTeam, answer: info.teamMember },
      codeLeader: { ...code.codeLeader, answer: info.leaderMember },
      codeTotal: { ...code.codeTotal, answer: cost.total },
      codeExpense: { ...code.codeExpense, answer: cost.expence },
      codeLodgment: { ...code.codeLodgment, answer: cost.lodgment },
      codeTraffic: { ...code.codeTraffic, answer: cost.traffic },
    };

    setEditorDataList((prevDataList) =>
      prevDataList.map((editorData) => {
        if (editorData.id === data.id) {
          return {
            ...editorData,
            content: {
              doc,
              costSub,
              info,
              cost,
            },
            code: newCode,
          };
        } else {
          return editorData;
        }
      })
    );
  };

  return (
    <AdminEmailLayout title="출장 신청서">
      <div className={styles.wrap}>
        <div className={styles.title}>
          <div className={styles.title_text}>
            <span>출장 신청서</span>
          </div>

          <div className={styles.trip_btn} onClick={onHandleEditConfirm}>
            확인
          </div>
          <div
            className={styles.trip_btn}
            onClick={() => onHandleEditDelete(data)}
          >
            삭제
          </div>
        </div>
        <div className={styles.doc}>
          <div className={styles.info_odd}>
            <span>문서번호</span>
          </div>
          <div className={styles.info_even}>
            <input
              type="text"
              placeholder="팀명 - 출장 번호 입력"
              name="docNum"
              value={doc.docNum}
              onChange={onChangeDoc}
            />
          </div>
          <div className={styles.info_odd}>
            <span>작성자</span>
          </div>
          <div className={styles.info_even}>
            <input
              type="text"
              placeholder="작성자 입력"
              name="docWriter"
              value={`응시자`}
              disabled={true}
            />
          </div>
          <div className={styles.info_odd}>
            <span>작성일자</span>
          </div>
          <div className={styles.info_last}>
            <input name="docWriterDate" value={"검사 날짜"} disabled={true} />
          </div>
        </div>
        <div className={styles.index_title}>
          <span>1. 출장 일정</span>
        </div>
        <div className={styles.schedule}>
          <div className={styles.schedule_container}>
            <div className={styles.schedule_odd}>
              <span>소속</span>
            </div>
            <div className={styles.schedule_even}>
              <input
                type="text"
                placeholder="소속 입력"
                name="group"
                value={info.group}
                onChange={onChangeInfo}
              />
            </div>
            <div className={styles.schedule_odd}>
              <span>출장 기간</span>
            </div>
            <div className={styles.schedule_last}>
              <input
                type="text"
                placeholder="기간을 입력해주세요"
                name="period"
                value={info.period}
                onChange={onChangeInfo}
              />
            </div>
          </div>

          <div className={styles.schedule_container}>
            <div className={styles.schedule_odd}>
              <span>팀원 인원</span>
            </div>
            <div className={styles.schedule_even}>
              <div className={styles.answer_container}>
                <input
                  className={styles.answer_input}
                  type="text"
                  placeholder="숫자만 입력"
                  name="teamMember"
                  value={info.teamMember}
                  onChange={onChangeInfo}
                />
                <div className={styles.answer_code}>
                  <input
                    type="text"
                    placeholder="고유코드"
                    name="codeTeam"
                    value={code.codeTeam.key.trim()}
                    onChange={onChangeCode}
                  />
                </div>
              </div>
            </div>
            <div className={styles.schedule_odd}>
              <span>출장 시간</span>
            </div>
            <div className={styles.schedule_last}>
              <input
                type="text"
                placeholder="시간을 입력해주세요"
                name="time"
                value={info.time}
                onChange={onChangeInfo}
              />
            </div>
          </div>

          <div className={styles.schedule_container}>
            <div className={styles.schedule_odd}>
              <span>팀장급 인원</span>
            </div>
            <div className={styles.schedule_even}>
              <div className={styles.answer_container}>
                <input
                  className={styles.answer_input}
                  type="text"
                  placeholder="숫자만 입력"
                  name="leaderMember"
                  value={info.leaderMember}
                  onChange={onChangeInfo}
                />
                <div className={styles.answer_code}>
                  <input
                    type="text"
                    placeholder="고유코드"
                    name="codeLeader"
                    value={code.codeLeader.key.trim()}
                    onChange={onChangeCode}
                  />
                </div>
              </div>
            </div>
            <div className={styles.schedule_odd}>
              <span>출장 지역</span>
            </div>
            <div className={styles.schedule_last}>
              <input
                type="text"
                placeholder="지역 입력"
                name="location"
                value={info.location}
                onChange={onChangeInfo}
              />
            </div>
          </div>

          <div className={styles.schedule_containerlast}>
            <div className={styles.schedule_odd}>
              <span>출장 인원</span>
            </div>
            <div className={styles.schedule_even}>
              <input
                type="text"
                name="totalMember"
                placeholder="총 출장인원 명단을 적으세요."
                value={info.totalMember}
                onChange={onChangeInfo}
              />
            </div>
          </div>
        </div>

        <div className={styles.index_title}>
          <span>2. 예상 비용</span>
        </div>

        <div className={styles.cost}>
          <div className={styles.cost_container}>
            <div className={styles.cost_type}>합계</div>
            <div className={styles.cost_content}>
              <input
                type="text"
                placeholder="숫자만 입력"
                name="total"
                value={cost.total}
                onChange={onChangeCost}
              />
              <div className={styles.answer_container}>
                <input
                  type="text"
                  placeholder="고유 코드"
                  name="codeTotal"
                  value={code.codeTotal.key.trim()}
                  onChange={onChangeCode}
                />
              </div>
            </div>
          </div>
          <div className={styles.cost_container}>
            <div className={styles.cost_type}>
              <input
                type="text"
                name="expenceSub"
                value={costSub.expenceSub}
                placeholder="입력 없을 시 : 일비"
                onChange={(e) =>
                  setCostSub({ ...costSub, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className={styles.cost_content}>
              <input
                type="text"
                placeholder="숫자만 입력"
                name="expence"
                value={cost.expence}
                onChange={onChangeCost}
              />
              <div className={styles.answer_container}>
                <input
                  type="text"
                  placeholder="고유 코드"
                  name="codeExpense"
                  value={code.codeExpense.key.trim()}
                  onChange={onChangeCode}
                />
              </div>
            </div>
          </div>
          <div className={styles.cost_container}>
            <div className={styles.cost_type}>
              <input
                type="text"
                name="foodSub"
                value={costSub.foodSub}
                placeholder="입력 없을 시 : 식비"
                onChange={(e) =>
                  setCostSub({ ...costSub, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className={styles.cost_content}>
              <input
                type="text"
                placeholder="숫자만 입력"
                name="food"
                value={cost.food}
                onChange={onChangeCost}
              />
            </div>
          </div>
          <div className={styles.cost_container}>
            <div className={styles.cost_type}>
              <input
                type="text"
                name="lodgmentSub"
                value={costSub.lodgmentSub}
                placeholder="입력 없을 시 : 숙박비"
                onChange={(e) =>
                  setCostSub({ ...costSub, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className={styles.cost_content}>
              <input
                type="text"
                placeholder="숫자만 입력"
                name="lodgment"
                value={cost.lodgment}
                onChange={onChangeCost}
              />
              <div className={styles.answer_container}>
                <input
                  type="text"
                  placeholder="고유 코드"
                  name="codeLodgment"
                  value={code.codeLodgment.key.trim()}
                  onChange={onChangeCode}
                />
              </div>
            </div>
          </div>
          <div className={styles.cost_container}>
            <div className={styles.cost_type}>
              <input
                type="text"
                name="trafficSub"
                value={costSub.trafficSub}
                placeholder="입력 없을 시 : 교통비"
                onChange={(e) =>
                  setCostSub({ ...costSub, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className={styles.cost_content}>
              <input
                type="text"
                placeholder="숫자만 입력"
                name="traffic"
                value={cost.traffic}
                onChange={onChangeCost}
              />
              <div className={styles.answer_container}>
                <input
                  type="text"
                  placeholder="고유 코드"
                  name="codeTraffic"
                  value={code.codeTraffic.key.trim()}
                  onChange={onChangeCode}
                />
              </div>
            </div>
          </div>

          <div className={styles.cost_container}>
            <div className={styles.cost_type}>비고</div>
            <div className={styles.remark}>
              <input
                type="text"
                placeholder="기타 사항을 적으시오."
                name="remark"
                value={info.remark}
                onChange={onChangeInfo}
              />
            </div>
          </div>
        </div>
      </div>
    </AdminEmailLayout>
  );
};

export default AdminTableTrip;
