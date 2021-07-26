import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
// import { GETREPORT } from "../../utils/fetch/apiConfig";
// import { jobMap } from "../../utils/data/reportMapData";

const Report = dynamic(() => import("../components/Report/Report"), {
  ssr: false,
});

const ReportMain = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(0);
  const printDomArray = useRef([]);
  const [cnt, setCnt] = useState(0);
  const [data, setData] = useState(false);
  //데이터는 위와 같이 1,2페이지 합 배열 1칸씩 차지

  const printDoc = async () => {
    if (isLoading !== 0) {
      return;
    }
    setLoading(1);

    const fileFormat = ["image/jpeg", "jpeg"];
    // let i = 0;
    //["image/png","png"]
    //["image/jpeg", "jpeg"]
    //["image/jpg", "jpg"]
    setTimeout(async function run() {
      //   let cInt;
      //   // 중단 로직.
      //   if (i === data.length) {
      //     setLoading(2);
      //     document.body.style.overflow = "auto";
      //     if (cInt) {
      //       clearTimeout(cInt);
      //     }
      //     return;
      //   }
      //   //   const fileName = `LG_Way_Fit_Test_REPORT_${data[i].name}/${data[
      //     i
      //   ].birthDate.slice(2, data[i].birthDate.length)}/${
      //     jobMap[data[i].jobCode]
      //   }.pdf`;
      const fileName = "test.pdf";
      //스크롤 탑이여야 빈 화면 없이 나옴.
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";

      const pdf = new jsPDF("p", "mm", "a4");

      pdf.setPage(1);

      //한번에 연속으로 프린터 시, 페이지 추가 로직 필요함.
      await html2canvas(printDomArray.current).then((c) => {
        const imgData = c.toDataURL(fileFormat[0]);
        pdf.addImage(imgData, fileFormat[1], 0, 0, 210, 210 * 1.414);
      });

      //   pdf.addPage();

      //   pdf.setPage(2);

      //   await html2canvas(printDomArray2.current[i]).then((c) => {
      //     const imgData = c.toDataURL(fileFormat[0]);
      //     pdf.addImage(imgData, fileFormat[1], 0, 0, 210, 210 * 1.414);
      //   });

      pdf.save(fileName);

      //   setCnt((prev) => prev + 1);

      //   i++;

      //   cInt = setTimeout(() => run(), 100);
    });
  };

  //   useEffect(() => {
  //     if (router.query.applicantId && router.query.jobCode) {
  //       (async () => {
  //         try {
  //           const res = await axios.get(
  //             `${GETREPORT}?applicantId=${router.query.applicantId}&jobCode=${router.query.jobCode}&jobNoticeId=${router.query.jobNoticeId}&stepId=${router.query.stepId}&testerIdx=${router.query.testerIdx}`
  //           );
  //           console.log(res.data);
  //           setData(res.data.data);
  //         } catch (e) {
  //           setData([]);
  //         }
  //       })();
  //     }
  //   }, [router.query]);

  useEffect(() => {
    //스크롤 스무스 제거
    document.getElementById("__next").style.scrollBehavior = "auto";
    document.getElementsByTagName("html")[0].style.scrollBehavior = "auto";
    window.document.body.style.scrollBehavior = "auto";
  }, []);

  //   if (!data) {
  //     return (
  //       <div
  //         style={{
  //           width: "100%",
  //           height: "100%",
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //         }}
  //       >
  //         <div className="loader" />
  //       </div>
  //     );
  //   }

  //   if (data.length === 0) {
  //     return (
  //       <div
  //         style={{
  //           width: "100%",
  //           height: "100%",
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //         }}
  //       >
  //         해당 응시자를 찾을 수 없습니다.
  //       </div>
  //     );
  //   }

  return (
    <>
      {/* <div className="doc_print" onClick={() => printDoc()}>
        <i
          className={`${
            isLoading === 0
              ? "xi-print"
              : isLoading === 1
              ? "xi-spinner-5 xi-spin"
              : "xi-file-check"
          }`}
          style={{ margin: isLoading === 2 ? "-2px 0 0 4px" : "" }}
        />
        {isLoading !== 0 && (
          <div style={{ position: "relative" }}>
            <div className="doc_print_cnt">
              {cnt} / {data.length}
            </div>
          </div>
        )}
      </div> */}
      {/* {data.map((data, idx) => {
        return ( */}
      <Report
        printDom={(ref) => (printDomArray.current = ref)}
        printDoc={printDoc}
      />
      {/* );
      })} */}
    </>
  );
};

export default ReportMain;
