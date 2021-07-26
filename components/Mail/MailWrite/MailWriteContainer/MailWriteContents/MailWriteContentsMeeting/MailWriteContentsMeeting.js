import moment from "moment";
import { useSelector } from "react-redux";
import styles from "./MailWriteContentsMeeting.module.scss";

const MailWriteContentsMeeting = ({
  contents,
  setTestDataList,
  setAnswer,
  disable,
  to_name,
}) => {
  const { doc, summary, content } = contents;
  const { agenda, purpose, contentList } = content;
  const { startTime, afterTime } = useSelector((state) => {
    return { startTime: state.time.startTime, afterTime: state.time.afterTime };
  });

  const onHandleAgenda = (radio) => {
    let answerIndex = "";
    let newAgendaList = agenda.list.map((agendaRadio) => {
      if (agendaRadio.index === radio.index) {
        answerIndex = parseInt(radio.index) + 1 + "";
        return { ...agendaRadio, answer: true };
      } else {
        return { ...agendaRadio, answer: false };
      }
    });

    let newAgenda = {
      ...agenda,
      list: newAgendaList,
    };

    setTestDataList((preTestList) =>
      preTestList.map((TestData) => {
        if (contents.type === "meeting" && contents.id === TestData.id) {
          return {
            ...TestData,
            content: { ...contents.content, agenda: newAgenda },
          };
        } else {
          return TestData;
        }
      })
    );

    setAnswer((prev) => ({ ...prev, [agenda.code.key]: answerIndex }));
  };

  const onHandlePurpose = (radio) => {
    let answerIndex = "";
    let newPurposeList = purpose.list.map((purposeRadio) => {
      if (purposeRadio.index === radio.index) {
        answerIndex = parseInt(radio.index) + 1 + "";
        return { ...purposeRadio, answer: true };
      } else {
        return { ...purposeRadio, answer: false };
      }
    });

    let newPurpose = {
      ...purpose,
      list: newPurposeList,
    };

    setTestDataList((preTestList) =>
      preTestList.map((TestData) => {
        if (contents.type === "meeting" && contents.id === TestData.id) {
          return {
            ...TestData,
            content: { ...contents.content, purpose: newPurpose },
          };
        } else {
          return TestData;
        }
      })
    );

    setAnswer((prev) => ({ ...prev, [purpose.code.key]: answerIndex }));
  };

  const onHandleContentList = (ctnIndex, radioIndex, list) => {
    let answerIndex = "";
    let nowIdxRadioList = list.map((radio) => {
      if (radio.index === radioIndex) {
        answerIndex = parseInt(radioIndex) + 1 + "";
        return { ...radio, answer: true };
      } else {
        return { ...radio, answer: false };
      }
    });

    let nowContentList = contentList.map((content) => {
      if (content.index === ctnIndex) {
        return {
          ...content,
          list: nowIdxRadioList,
        };
      } else {
        return content;
      }
    });

    setTestDataList((preTestList) =>
      preTestList.map((TestData) => {
        if (contents.type === "meeting" && contents.id === TestData.id) {
          return {
            ...TestData,
            content: { ...contents.content, contentList: nowContentList },
          };
        } else {
          return TestData;
        }
      })
    );

    for (let i in nowContentList) {
      if (
        nowContentList[i].type === "content_radio" &&
        nowContentList[i].index === ctnIndex
      ) {
        setAnswer((prev) => ({
          ...prev,
          [nowContentList[i].code.key]: answerIndex,
        }));
      }
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        <h2>회의록</h2>
      </div>

      <div className={styles.doc}>
        <div className={styles.odd}>
          <span>문서번호</span>
        </div>
        <div className={styles.even}>
          <span>{doc.docNum}</span>
        </div>
        <div className={styles.odd}>
          <span>작성자</span>
        </div>
        <div className={styles.even}>
          {/* <span>{doc.docWriter}</span> */}
          <span>{to_name}</span>
        </div>
        <div className={styles.odd}>
          <span>작성일자</span>
        </div>
        <div className={styles.last}>
          {/* {doc.docWriterDate} */}
          {moment(startTime).add(afterTime, "s").format("YYYY-MM-DD")}
        </div>
      </div>
      <div className={styles.subtitle}>
        <span>1. 회의 개요</span>
      </div>

      <div className={styles.summary}>
        <div className={styles.container}>
          <div className={styles.odd}>
            <span>소속</span>
          </div>
          <div className={styles.even}>
            <span>{summary.group}</span>
          </div>
          <div className={styles.odd}>
            <span>회의 날짜</span>
          </div>
          <div className={styles.last}>
            <span>{summary.period}</span>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.odd}>
            <span>회의 장소</span>
          </div>
          <div className={styles.even}>
            <span>{summary.location}</span>
          </div>
          <div className={styles.odd}>
            <span>회의 시간</span>
          </div>
          <div className={styles.last}>
            <span>{summary.time} </span>
          </div>
        </div>
        <div className={styles.container_last}>
          <div className={styles.odd}>참석 인원</div>
          <div className={styles.last}>
            <span>{summary.totalMember} </span>
          </div>
        </div>
        <div className={styles.container_last}>
          <div className={styles.odd}>회의 안건</div>
          <div className={styles.agenda}>
            {agenda && (
              <div>
                {agenda.remark && (
                  <>
                    {agenda.remark.remark1 && (
                      <span>{agenda.remark.remark1}</span>
                    )}
                    {agenda.remark.remark2 && <u>{agenda.remark.remark2}</u>}
                    {agenda.remark.remark3 && (
                      <span>{agenda.remark.remark3}</span>
                    )}
                  </>
                )}

                {agenda.list.map((radio, index) => (
                  <div className={styles.radio} key={index}>
                    <input
                      type="radio"
                      value={radio.value}
                      disabled={disable}
                      checked={radio.answer ? radio.answer : false}
                      // readOnly={true}
                      onChange={() => onHandleAgenda(radio)}
                    />
                    <label>{radio.value}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={styles.container_last}>
          <div className={styles.odd}>회의 목적</div>
          <div className={styles.purpose}>
            {purpose && (
              <div>
                {purpose.remark && (
                  <>
                    {purpose.remark.remark1 && (
                      <span>{purpose.remark.remark1}</span>
                    )}
                    {purpose.remark.remark2 && <u>{purpose.remark.remark2}</u>}
                    {purpose.remark.remark3 && (
                      <span>{purpose.remark.remark3}</span>
                    )}
                  </>
                )}

                {purpose.list.map((radio, index) => (
                  <div className={styles.radio} key={index}>
                    <input
                      type="radio"
                      value={radio.value}
                      disabled={disable}
                      checked={radio.answer ? radio.answer : false}
                      onChange={() => onHandlePurpose(radio)}
                    />
                    <label>{radio.value}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={styles.container_last}>
          <div className={styles.odd}>회의 내용</div>
          <div className={styles.contents}>
            {contentList.length ? (
              contentList.map((ctn, index) => (
                <div className={styles.list} key={index}>
                  {ctn.type === "content_radio" && (
                    <>
                      {(ctn.remark1 || ctn.remark2 || ctn.remark3) && (
                        <div className={styles.contentRemark}>
                          <span>{ctn.remark1 || ""}</span>
                          <u>{ctn.remark2 || ""}</u>
                          <span>{ctn.remark3 || ""}</span>
                        </div>
                      )}
                      <span key={index}>{ctn.question}</span>
                      {ctn.list.map((radio, index) => (
                        <div className={styles.radio} key={index}>
                          <input
                            type="radio"
                            value={radio.value}
                            disabled={disable}
                            checked={radio.answer ? radio.answer : false}
                            onChange={() => {
                              onHandleContentList(
                                ctn.index,
                                radio.index,
                                ctn.list
                              );
                            }}
                          />
                          <label>{radio.value}</label>
                        </div>
                      ))}
                    </>
                  )}

                  {ctn.type === "content_text" && <p>{ctn.text}</p>}
                </div>
              ))
            ) : (
              <span>{` - `}</span>
            )}
          </div>
        </div>

        <div className={styles.container_last}>
          <div className={styles.odd}>추후 확인 내용</div>
          <div className={styles.ect}>
            <span>{summary.ect ? summary.ect : "-"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailWriteContentsMeeting;
