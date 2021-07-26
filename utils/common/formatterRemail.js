//1. 회신 작성시 데이터 모두제거
export const initialReplyContents = (re_email_contents) => {
  let output_re_email_contents = [];

  re_email_contents.forEach((content) => {
    if (content.type !== "replyCC" && content.type !== "replyAttach") {
      switch (content.type) {
        case "input":
          output_re_email_contents.push({
            ...content,
            content: "",
            code: { ...content.code, answer: "" },
          });
          break;

        case "radio":
        case "dropbox":
        case "checkbox":
          const restContent = content.content.map((obj) => {
            return { ...obj, answer: false };
          });

          output_re_email_contents.push({
            ...content,
            content: restContent,
            code: { ...content.code, answer: "" },
          });
          break;

        case "seqCheck":
          let newNumList = [];
          let count = content.content.count;

          for (let i = 0; i < count; i++) {
            newNumList.push(0);
          }

          output_re_email_contents.push({
            ...content,
            content: {
              ...content.content,
              numList: newNumList,
            },
            code: { ...content.code, answer: "" },
          });
          break;

        case "trip":
          if (!content.content || !content.code) return content;
          let codeObj = content.code;

          let costObj = {
            expence: "",
            food: content.content.cost.food,
            lodgment: "",
            total: "",
            traffic: "",
          };

          let infoObj = {
            ...content.content.info,
            leaderMember: "",
            teamMember: "",
          };

          for (let n in codeObj) {
            codeObj[n] = { ...codeObj[n], answer: "" };
          }
          // output_re_email_contents.push({ ...content, code: codeObj });

          output_re_email_contents.push({
            ...content,
            code: codeObj,
            content: {
              ...content.content,
              cost: costObj,
              info: infoObj,
            },
          });

          break;

        case "meeting":
          if (!content.content) return content;

          const { agenda, purpose, contentList } = content.content;

          let newAgenda;
          if (agenda) {
            let newList = agenda.list.map((content) => {
              return { ...content, answer: false };
            });
            newAgenda = {
              ...agenda,
              list: newList,
              code: { ...agenda.code, answer: "" },
            };
          }

          let newPurpose;
          if (purpose) {
            let newList = purpose.list.map((content) => {
              return { ...content, answer: false };
            });
            newPurpose = {
              ...purpose,
              list: newList,
              code: { ...purpose.code, answer: "" },
            };
          }

          let newContentList = [];
          if (contentList.length) {
            newContentList = contentList.map((content) => {
              if (content.type === "content_radio") {
                let newList = content.list.map((radio) => {
                  return { ...radio, answer: "" };
                });
                return {
                  ...content,
                  list: newList,
                  code: { ...content.code, answer: "" },
                };
              } else {
                return content;
              }
            });
          }

          output_re_email_contents.push({
            ...content,
            content: {
              ...content.content,
              agenda: newAgenda,
              purpose: newPurpose,
              contentList: newContentList,
            },
          });
          break;

        case "table":
          const newTableList = content.content.map((ul) =>
            ul.map((li) => {
              if (li.type === "input") {
                return { ...li, code: { ...li.code, answer: "" } };
              } else {
                return li;
              }
            })
          );

          output_re_email_contents.push({ ...content, content: newTableList });
          break;

        default:
          return output_re_email_contents.push(content);
      }
    }
  });

  return output_re_email_contents;
};

//2. content의 code와 답만 가져오기
export const sepAnswer = (re_email_contents, replyCC, replyFile) => {
  let answer = {};

  re_email_contents.forEach((data) => {
    let { content, type } = data;

    switch (type) {
      case "trip":
        let codeObj = data.code;
        for (let n in codeObj) {
          answer[codeObj[n].key] = codeObj[n].answer;
        }
        break;

      case "meeting":
        if (content.agenda) {
          answer[content.agenda.code.key] = content.agenda.code.answer;
        }

        if (content.purpose) {
          answer[content.purpose.code.key] = content.purpose.code.answer;
        }

        if (content.contentList.length) {
          const arrCtnList = content.contentList;

          arrCtnList.forEach((content) => {
            if (content.type === "content_radio")
              answer[content.code.key] = content.code.answer;
          });
        }
        break;

      case "table":
        content.forEach((tableList) => {
          tableList.forEach((tableObj) => {
            if (tableObj.type === "input") {
              answer[tableObj.code.key] = tableObj.code.answer;
            }
          });
        });

        break;

      case "checkbox":
      case "input":
      case "radio":
      case "dropbox":
      case "seqCheck":
        answer[data.code.key] = data.code.answer;
        break;

      case "replyCC":
      case "replyCCHide":
        answer[data.CC_Name_Code] = replyCC
          .map((cc) => `${cc.u_name} ${cc.u_position}`)
          .join(",");
        break;

      case "replyAttach":
        answer[data.Attach_Info_Code] = replyFile
          .map((file) => file.intern_quest_id)
          .join(",");
        break;

      default:
        break;
    }
  });
  return answer;
};
