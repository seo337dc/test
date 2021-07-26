import moment from "moment";
import { useSelector } from "react-redux";
import { convertNum } from "../../../../../../utils/common/adminFun";
import styles from "./MailWriteContentsTrip.module.scss";
const MailWriteContentsTrip = ({ contents, setViewData, disable, to_name }) => {
  const { startTime, afterTime } = useSelector((state) => {
    return { startTime: state.time.startTime, afterTime: state.time.afterTime };
  });
  const { doc, info, costSub, cost } = contents.content;

  const { docNum } = doc;

  const { expenceSub, foodSub, lodgmentSub, trafficSub } = costSub;

  const { group, period, time, location, totalMember, remark } = info;
  const onHandleCost = (name, value) => {
    setViewData((prev) => {
      const newRemailCost = prev.re_mail_contents.map((data) => {
        if (data.id === contents.id) {
          return {
            ...contents,
            content: {
              ...contents.content,
              cost: {
                ...contents.content.cost,
                [name]: convertNum(value),
              },
            },
          };
        } else {
          return data;
        }
      });

      return { ...prev, re_mail_contents: newRemailCost };
    });
  };

  const onHandleInfo = (name, value) => {
    setViewData((prev) => {
      const newRemailInfo = prev.re_mail_contents.map((data) => {
        if (data.id === contents.id) {
          return {
            ...contents,
            content: {
              ...contents.content,
              info: {
                ...contents.content.info,
                [name]: Number(value),
              },
            },
          };
        } else {
          return data;
        }
      });

      return { ...prev, re_mail_contents: newRemailInfo };
    });
  };

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
        <div className={styles.info_even}>{to_name}</div>

        <div className={styles.info_odd}>
          <span>작성일자</span>
        </div>
        <div className={styles.info_last}>
          {moment(startTime).add(afterTime, "s").format("YYYY-MM-DD")}
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
          <div className={styles.schedule_even}>{group}</div>
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
            <input
              type="text"
              name="teamMember"
              value={info.teamMember}
              placeholder="숫자만 입력"
              onChange={(e) => onHandleInfo("teamMember", e.target.value)}
              disabled={disable}
            />
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
            <input
              type="text"
              name="leaderMember"
              value={info.leaderMember}
              placeholder="숫자만 입력"
              onChange={(e) => onHandleInfo("leaderMember", e.target.value)}
              disabled={disable}
            />
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
            <input
              type="text"
              name="total"
              value={cost.total}
              placeholder="숫자만 입력"
              onChange={(e) => onHandleCost("total", e.target.value)}
              disabled={disable}
            />
          </div>
        </div>
        <div className={styles.cost_container}>
          <div className={styles.cost_type}>
            {expenceSub ? expenceSub : "일비"}
          </div>
          <div className={styles.cost_content}>
            <input
              type="text"
              name="expence"
              value={cost.expence}
              placeholder="숫자만 입력"
              onChange={(e) => onHandleCost("expence", e.target.value)}
              disabled={disable}
            />
          </div>
        </div>
        <div className={styles.cost_container}>
          <div className={styles.cost_type}>{foodSub ? foodSub : "식비"}</div>
          <div className={styles.cost_content}>
            <input
              type="text"
              name="food"
              value={cost.food}
              placeholder="숫자만 입력"
              // onChange={onChangeAnswer}
              disabled={true}
            />
          </div>
        </div>
        <div className={styles.cost_container}>
          <div className={styles.cost_type}>
            {lodgmentSub ? lodgmentSub : "숙박비"}
          </div>
          <div className={styles.cost_content}>
            <input
              type="text"
              name="lodgment"
              value={cost.lodgment}
              placeholder="숫자만 입력"
              onChange={(e) => onHandleCost("lodgment", e.target.value)}
              disabled={disable}
            />
          </div>
        </div>
        <div className={styles.cost_container}>
          <div className={styles.cost_type}>
            {trafficSub ? trafficSub : "교통비"}
          </div>
          <div className={styles.cost_content}>
            <input
              type="text"
              name="traffic"
              value={cost.traffic}
              placeholder="숫자만 입력"
              onChange={(e) => onHandleCost("traffic", e.target.value)}
              disabled={disable}
            />
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

export default MailWriteContentsTrip;
