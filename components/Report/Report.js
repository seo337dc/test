import styles from "./Report.module.scss";
import BarChart from "./BarChart";
import ColumnChart from "./ColumnChart";
import Recharts from "./Recharts";

const Report = ({ printDom, printDoc }) => {
  return (
    <div className={styles.wrap} ref={printDom}>
      <button className={styles.print_btn} onClick={printDoc}></button>
      <header className={styles.header_wrap}>
        <div className={styles.report_header}>
          <img className={styles.logo}></img>
          가상인턴 결과 리포트
        </div>
        <div className={styles.report_profile}>
          <div className={styles.report_info_wrap}>
            <div className={styles.report_img}></div>
            <table className={styles.report_info}>
              <tbody>
                <tr>
                  <td>생년월일</td>
                  <td>921029</td>
                </tr>
                <tr>
                  <td>지원직무</td>
                  <td>회장직</td>
                </tr>
                <tr>
                  <td>지원자&nbsp;&nbsp; </td>
                  <td>권한성</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </header>
      <section className={styles.section_avg_chart}>
        <div id="chart" className={styles.avg_chart}>
          <p className={styles.avg_title}>
            <span className={styles.section_font}>지원 직무 HR 점수 분포</span>
          </p>
          <Recharts />
        </div>
      </section>
      <section className={styles.section_capability_chart}>
        <div className={styles.sw_chart}>
          <p className={styles.section_font_wrap}>
            <span className={styles.section_font}>업무 역량</span>
            <span className={styles.section_caption}>
              개인 별 세부 평가 항목 점수 높은 이상 (강점), 낮음 이하(약점)
            </span>
          </p>
          <div className={styles.sw_result_wrap}>
            <div className={styles.weakness}>
              <p className={styles.result_title}>약점</p>
              <div className={styles.result_content}>멘탈</div>
              <div className={styles.result_content}>멘탈</div>
              <div className={styles.result_content}>멘탈</div>
              <div className={styles.result_content}>멘탈</div>
              <div className={styles.result_content}>멘탈</div>
            </div>
            <div className={styles.strong}>
              <p className={styles.result_title}>강점</p>
              <div className={styles.result_content}>멘탈</div>
              <div className={styles.result_content}>멘탈</div>
              <div className={styles.result_content}>멘탈</div>
              <div className={styles.result_content}>멘탈</div>
              <div className={styles.result_content}>멘탈</div>
            </div>
          </div>
        </div>
        <div className={styles.capability_chart}>
          <p className={styles.section_font_wrap}>
            <span className={styles.section_font}>
              지원 직무 HR 고성과자 집단과 비교
            </span>
          </p>
          <ColumnChart />
        </div>
      </section>
      <section className={styles.section_synthesis_chart}>
        <div className={styles.synthesis_chart}>
          <p className={styles.section_font_wrap}>
            <span className={styles.section_font}>
              지원 직무 HR 고성과자 집단과 비교
            </span>
            <div className={styles.section_icon}>
              <div className={styles.elite}></div>&nbsp;고성과자
              <div className={styles.applicant}></div>&nbsp;지원자
            </div>
          </p>
          <BarChart />
        </div>
      </section>
      <section className={styles.section_reference_chart}>
        <div className={styles.reference_chart}>
          <p className={styles.section_font_wrap}>
            <span className={styles.section_font}>참고 자료</span>
            <span className={styles.section_caption}>
              지원 직무 지원자 규준과 비교하였을 때 상대적 수준 제시
            </span>
          </p>
          <div className={styles.reference_content_wrap}>
            <div className={styles.reference_content}>
              <div className={styles.reference_title}>업무정확성</div>
              <div className={styles.grade_wrap}>
                <div className={styles.very_low}>VeryLow</div>
                <div>Low</div>
                <div>Average</div>
                <div>High</div>
                <div
                  className={styles.very_high}
                  style={{ backgroundColor: "#fa1e0e" }}
                >
                  VeryHigh
                </div>
              </div>
            </div>
            <div className={styles.reference_content}>
              <div className={styles.reference_title}>업무추진성</div>
              <div className={styles.grade_wrap}>
                <div className={styles.very_low}>VeryLow</div>
                <div>Low</div>
                <div>Average</div>
                <div style={{ backgroundColor: "#fa1e0e" }}>High</div>
                <div className={styles.very_high}>VeryHigh</div>
              </div>
            </div>
            <div className={styles.reference_content}>
              <div className={styles.reference_title}>업무완결성</div>
              <div className={styles.grade_wrap}>
                <div className={styles.very_low}>VeryLow</div>
                <div>Low</div>
                <div style={{ backgroundColor: "#fa1e0e" }}>Average</div>
                <div>High</div>
                <div className={styles.very_high}>VeryHigh</div>
              </div>
            </div>
          </div>
          <div className={styles.reference_caption_wrap}>
            <p>
              <b>
                <span>＊</span> 업무 정확성 :
              </b>{" "}
              업무 내용을 정확히 처리함
            </p>
            <p>
              <b>
                <span>＊</span> 업무 추진성 :
              </b>{" "}
              업무 내용을 주어진 기간 내 신속 처리함
            </p>
            <p>
              <b>
                <span>＊</span> 업무 완결성 :
              </b>{" "}
              업무 내용을 주어진 기간 내 완수한 양을 의미함
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Report;
