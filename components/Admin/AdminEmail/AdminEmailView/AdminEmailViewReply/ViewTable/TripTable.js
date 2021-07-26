import styles from "../ViewTable/TripTable.module.scss";

const TripTable = ({ editData }) => {
  const { doc, info, cost, costSub } = editData.content;
  const { docNum } = doc;

  const { expenceSub, foodSub, lodgmentSub, trafficSub } = costSub;

  const {
    group,
    teamMember,
    leaderMember,
    period,
    time,
    location,
    totalMember,
    remark,
  } = info;

  const { total, expence, food, lodgment, traffic } = cost;

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        <h2>출장 신청서</h2>
      </div>

      <div className={styles.meta}>
        <div className={styles.info_odd}>
          <span>문서번호</span>
        </div>
        <div className={styles.info_even}>{docNum}</div>
        <div className={styles.info_odd}>
          <span>작성자</span>
        </div>
        <div className={styles.info_even}>{`응시자`}</div>
        <div className={styles.info_odd}>
          <span>작성일자</span>
        </div>
        <div className={styles.info_last}>{`검사 날짜`}</div>
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
            <span>{group}</span>
          </div>
          <div className={styles.schedule_odd}>
            <span>출장 기간</span>
          </div>
          <div className={styles.schedule_last}>{period}</div>
        </div>

        <div className={styles.schedule_container}>
          <div className={styles.schedule_odd}>
            <span>팀원 인원</span>
          </div>
          <div className={styles.schedule_even}>
            <div className={styles.input}>
              <span>{teamMember}</span>
            </div>
          </div>
          <div className={styles.schedule_odd}>
            <span>출장 시간</span>
          </div>
          <div className={styles.schedule_last}>{time}</div>
        </div>

        <div className={styles.schedule_container}>
          <div className={styles.schedule_odd}>
            <span>팀장급 인원</span>
          </div>
          <div className={styles.schedule_even}>
            <div className={styles.input}>
              <span>{leaderMember}</span>
            </div>
          </div>
          <div className={styles.schedule_odd}>
            <span>출장 지역</span>
          </div>
          <div className={styles.schedule_last}>{location}</div>
        </div>

        <div className={styles.schedule_containerlast}>
          <div className={styles.schedule_odd}>출장 인원</div>
          <div className={styles.schedule_address}>{totalMember}</div>
        </div>
      </div>

      <div className={styles.index_title}>
        <span>2. 예상 비용</span>
      </div>

      <div className={styles.cost}>
        <div className={styles.cost_container}>
          <div className={styles.cost_type}>합계</div>
          <div className={styles.cost_content}>
            <input type="text" value={total} readOnly={true} />
          </div>
        </div>
        <div className={styles.cost_container}>
          <div className={styles.cost_type}>
            {expenceSub ? expenceSub : "일비"}
          </div>
          <div className={styles.cost_content}>
            <input type="text" value={expence} readOnly={true} />
          </div>
        </div>
        <div className={styles.cost_container}>
          <div className={styles.cost_type}>{foodSub ? foodSub : "식비"}</div>
          <div className={styles.cost_content}>
            <input type="text" value={food} readOnly={true} />
          </div>
        </div>
        <div className={styles.cost_container}>
          <div className={styles.cost_type}>
            {lodgmentSub ? lodgmentSub : "숙박비"}
          </div>
          <div className={styles.cost_content}>
            <input type="text" value={lodgment} readOnly={true} />
          </div>
        </div>
        <div className={styles.cost_container}>
          <div className={styles.cost_type}>
            {trafficSub ? trafficSub : "교통비"}
          </div>
          <div className={styles.cost_content}>
            <input type="text" value={traffic} readOnly={true} />
          </div>
        </div>
        <div className={styles.cost_container}>
          <div className={styles.cost_type}>비고</div>
          <div className={styles.cost_ect}>{remark}</div>
        </div>
      </div>

      <div className={styles.ect}>
        <span>여비 지급 규칙에 의거하여 국내 출장 신청서를 작성합니다.</span>
      </div>
    </div>
  );
};

export default TripTable;
