import styles from "./MeetingTable.module.scss";

const MeetingTable = ({ editData }) => {
  const { doc, summary, content, contentsRemark } = editData;
  const { agenda, purpose, contentList } = content;

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
          <span>{doc ? doc.docNum : ""}</span>
        </div>
        <div className={styles.odd}>
          <span>작성자</span>
        </div>
        <div className={styles.even}>
          <span>{`응시자`}</span>
        </div>
        <div className={styles.odd}>
          <span>작성일자</span>
        </div>
        <div className={styles.last}>{`검사 날짜`}</div>
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
                      disabled={false}
                      checked={radio.answer ? radio.answer : false}
                      readOnly={true}
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
                      disabled={false}
                      checked={radio.answer ? radio.answer : false}
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
            {contentList.length > 0 &&
              contentList.map((ctn, index) => (
                <div className={styles.list} key={index}>
                  {ctn.type === "content_radio" && ctn.list && (
                    <>
                      {(ctn.remark1 || ctn.remark2 || ctn.remark3) && (
                        <div className={styles.contentRemark}>
                          <span>{ctn.remark1 || ""}</span>
                          <u>{ctn.remark2 || ""}</u>
                          <span>{ctn.remark3 || ""}</span>
                        </div>
                      )}

                      {ctn.question && <span>{ctn.question}</span>}
                      {ctn.list.map((radio) => (
                        <div className={styles.radio}>
                          <input
                            type="radio"
                            value={radio.value}
                            disabled={false}
                            checked={radio.answer ? radio.answer : false}
                          />
                          <label>{radio.value}</label>
                        </div>
                      ))}
                    </>
                  )}

                  {ctn.type === "content_text" && <p>{ctn.text}</p>}
                </div>
              ))}
          </div>
        </div>

        <div className={styles.container_last}>
          <div className={styles.odd}>추후 확인 내용</div>
          <div className={styles.ect}>
            <span>{summary.ect}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingTable;
