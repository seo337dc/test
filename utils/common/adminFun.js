//고유코드, 정답 변환 기능
export const convertCodeList = (editorDataList) => {
  let codeList = [];

  editorDataList.forEach((data) => {
    let answerCode = { Quest_IDX: "", Answer: "" };
    switch (data.type) {
      case "trip":
        let codeObj = data.code;
        for (let n in codeObj) {
          answerCode = {
            Quest_IDX: codeObj[n].key,
            Answer: codeObj[n].answer,
            type: "N",
          };
          codeList.push(answerCode);
          answerCode = { Quest_IDX: "", Answer: "" };
        }
        break;

      case "meeting":
        let { content } = data;
        if (!content) break;

        if (content.agenda) {
          answerCode = {
            Quest_IDX: content.agenda.code.key,
            Answer: content.agenda.code.answer,
            type: "N",
          };
          codeList.push(answerCode);
          answerCode = { Quest_IDX: "", Answer: "" };
        }

        if (content.purpose) {
          answerCode = {
            Quest_IDX: content.purpose.code.key,
            Answer: content.purpose.code.answer,
            type: "N",
          };
          codeList.push(answerCode);
          answerCode = { Quest_IDX: "", Answer: "" };
        }

        if (content.contentList.length) {
          const arrCtnList = content.contentList;

          arrCtnList.forEach((content) => {
            if (content.type === "content_radio") {
              answerCode = {
                Quest_IDX: content.code.key,
                Answer: content.code.answer,
                type: "N",
              };
              codeList.push(answerCode);
              answerCode = { Quest_IDX: "", Answer: "" };
            }
          });
        }
        break;

      case "table":
        if (!data.content) return;

        if (data.content.length) {
          data.content.forEach((tableList) => {
            tableList.forEach((tableObj) => {
              if (tableObj.type === "input") {
                answerCode = {
                  Quest_IDX: tableObj.code.key,
                  Answer: tableObj.code.answer,
                  type: "N",
                };
                codeList.push(answerCode);
                answerCode = { Quest_IDX: "", Answer: "" };
              }
            });
          });
        }
        break;

      case "checkbox":
        let convertJoin = data.code.answer.join(","); //1,2,3로 변경
        answerCode = {
          Quest_IDX: data.code.key,
          Answer: convertJoin,
          type: "N",
        };
        codeList.push(answerCode);
        answerCode = { Quest_IDX: "", Answer: "" };
        break;

      case "seqCheck":
        let convertJoinseq = data.code.answer.join(","); //1,2,3로 변경
        answerCode = {
          Quest_IDX: data.code.key,
          Answer: convertJoinseq,
          type: "Y",
        };
        codeList.push(answerCode);
        answerCode = { Quest_IDX: "", Answer: "" };
        break;

      case "dropbox":
      case "input":
      case "radio":
        answerCode = {
          Quest_IDX: data.code.key,
          Answer: data.code.answer,
          type: "N",
        };
        codeList.push(answerCode);
        answerCode = { Quest_IDX: "", Answer: "" };
        break;

      default:
        break;
    }
  });

  return codeList;
};

// 고유코드 결과 출력 기능
export const convertCodeListWithReply = (
  editorDataList,
  cc,
  attach,
  hide_cc
) => {
  let codeList = [];
  if (cc.isAble) {
    let CCAnswer = [];
    cc.CC_Name.forEach((cc) => {
      CCAnswer.push(`${cc.u_name} ${cc.u_position}`);
    });

    codeList.push({
      Quest_IDX: cc.CC_Name_Code,
      Answer: CCAnswer.join(","),
      type: "N", //cc.isSeq ? "Y" : "N",
    });
  }

  if (hide_cc.isAble) {
    let HideCCAnswer = [];
    hide_cc.CC_Name.forEach((hide_cc) => {
      HideCCAnswer.push(`${hide_cc.u_name} ${hide_cc.u_position}`);
    });

    codeList.push({
      Quest_IDX: hide_cc.CC_Name_Code,
      Answer: HideCCAnswer.join(","),
      type: "N", //hide_cc.isSeq ? "Y" : "N",
    });
  }

  if (attach.isAble) {
    let attachAnswer = [];
    attach.Attach_Info.forEach((attach) => {
      attachAnswer.push(attach.Intern_Quest_ID);
    });

    codeList.push({
      Quest_IDX: attach.Attach_Info_Code,
      Answer: attachAnswer.join(","),
      type: "N", //attach.isSeq ? "Y" : "N",
    });
  }

  editorDataList.forEach((data) => {
    let answerCode = { Quest_IDX: "", Answer: "" };

    switch (data.type) {
      case "trip":
        if (!data.code) return;
        let codeObj = data.code;
        for (let n in codeObj) {
          answerCode = {
            Quest_IDX: codeObj[n].key,
            Answer: codeObj[n].answer,
            type: "N",
          };
          codeList.push(answerCode);
          answerCode = { Quest_IDX: "", Answer: "" };
        }
        break;

      case "meeting":
        let { content } = data;
        if (!content) break;

        if (content.agenda) {
          answerCode = {
            Quest_IDX: content.agenda.code.key,
            Answer: content.agenda.code.answer,
            type: "N",
            showType: "회의 안건",
            count: content.agenda.list.length,
          };
          codeList.push(answerCode);
          answerCode = { Quest_IDX: "", Answer: "" };
        }

        if (content.purpose) {
          answerCode = {
            Quest_IDX: content.purpose.code.key,
            Answer: content.purpose.code.answer,
            type: "N",
            showType: "회의목적",
            count: content.purpose.list.length,
          };
          codeList.push(answerCode);
          answerCode = { Quest_IDX: "", Answer: "" };
        }

        if (content.contentList.length) {
          const arrCtnList = content.contentList;

          arrCtnList.forEach((content) => {
            if (content.type === "content_radio") {
              answerCode = {
                Quest_IDX: content.code.key,
                Answer: content.code.answer,
                type: "N",
                showType: `회의내용(${parseInt(content.index) + 1})`,
                count: content.list.length,
              };
              codeList.push(answerCode);
              answerCode = { Quest_IDX: "", Answer: "" };
            }
          });
        }
        break;

      case "table":
        if (!data.content) return;

        if (data.content.length) {
          data.content.forEach((tableList) => {
            tableList.forEach((tableObj) => {
              if (tableObj.type === "input") {
                answerCode = {
                  Quest_IDX: tableObj.code.key,
                  Answer: tableObj.code.answer,
                  type: "N",
                };
                codeList.push(answerCode);
                answerCode = { Quest_IDX: "", Answer: "" };
              }
            });
          });
        }
        break;

      case "checkbox":
        if (!data.code) return;
        let convertJoin = data.code.answer.join(","); //1,2,3로 변경
        answerCode = {
          Quest_IDX: data.code.key,
          Answer: convertJoin,
          type: "N",
          count: data.content.length,
          showType: `체크박스`,
        };
        codeList.push(answerCode);
        answerCode = { Quest_IDX: "", Answer: "" };
        break;

      case "seqCheck":
        if (!data.code) return;
        let convertJoinseq = data.code.answer.join(","); //1,2,3로 변경
        answerCode = {
          Quest_IDX: data.code.key,
          Answer: convertJoinseq,
          type: "N",
        };
        codeList.push(answerCode);
        answerCode = { Quest_IDX: "", Answer: "" };
        break;

      case "dropbox":
      case "input":
      case "radio":
        let showType = "";
        if (data.type === "dropbox") {
          showType = "드롭박스";
        } else if (data.type === "radio") {
          showType = "라디오박스";
        }

        if (!data.code) return;
        answerCode = {
          Quest_IDX: data.code.key,
          Answer: data.code.answer,
          type: "N",
          count: data.content.length,
          showType,
        };

        codeList.push(answerCode);
        answerCode = { Quest_IDX: "", Answer: "" };
        break;

      default:
        break;
    }
  });

  return codeList;
};

//숫자로만 변환 기능
export const convertNum = (str) => {
  let prevConstStr = str
    .replace(/[^0-9.]/g, "")
    .replace(/(\..*)\./g, "$1")
    .replace(".", "");

  let afterConstStr = prevConstStr
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return afterConstStr;
};
