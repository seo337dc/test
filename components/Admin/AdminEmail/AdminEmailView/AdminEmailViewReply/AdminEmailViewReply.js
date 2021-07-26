import TripTable from "../../AdminEmailView/AdminEmailViewReply/ViewTable/TripTable";
import MeetingTable from "./ViewTable/MeetingTable";
import CustomTable from "./ViewTable/CustomTable";
import styles from "./AdminEmailViewReply.module.scss";

const AdminEmailViewReply = ({
  editorDataList,
  replyCC,
  replyAttach,
  replyCCHide,
}) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.replyInfo}>
        {replyCC.CC_Name.length > 0 && (
          <div className={styles.replyCC}>
            <span>참조(RE) : </span>
            <div className={styles.info}>
              {replyCC.CC_Name.map((item) => {
                return ` ${item.u_name} ${item.u_position};`;
              })}
            </div>
          </div>
        )}

        {replyCCHide.CC_Name.length > 0 && (
          <div className={styles.replyCC}>
            <span>숨은 참조(RE) : </span>
            <div className={styles.info}>
              {replyCCHide.CC_Name.map((item, index) => (
                <span key={index}>{`${item.u_name} ${item.u_position};`}</span>
              ))}
            </div>
          </div>
        )}

        {replyAttach.Attach_Info.length > 0 && (
          <div className={styles.replyAttach}>
            <span>첨부(RE) : </span>
            <div className={styles.info}>
              {replyAttach.Attach_Info.map((item, index) => (
                <span key={index}>{`${item.File_Name};`}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {editorDataList.map((editData) => {
        const { content, id, type } = editData;

        if (!content && type !== "br" && type !== "blank" && type !== "input")
          return;

        switch (type) {
          case "text":
          case "textarea":
            const styleText = {
              fontWeight: editData.fontWeight,
              borderBottom: editData.borderBottom,
              color: editData.color,
            };
            return (
              <span key={id} style={styleText}>
                {content}
              </span>
            );

          case "p":
          case "parea":
            const styleP = {
              fontWeight: editData.fontWeight,
              borderBottom: editData.borderBottom,
              color: editData.color,
            };

            return (
              <label key={id}>
                <br />
                <span style={styleP}>{content}</span>
              </label>
            );

          case "question":
            const styleQ = {
              borderBottom: editData.borderBottom,
              color: editData.color,
            };
            return (
              <label className={styles.question} key={id}>
                {content.editTextArea0 ? (
                  <div className={styles.flex}>
                    <span className={styles.qheader}>
                      {content.editTextArea0 ? content.editTextArea0 : ""}
                    </span>
                    <label className={styles.qtext}>
                      <span>{content.editTextArea1}</span>
                      <span style={styleQ}>{`${content.editTextArea2}`}</span>
                      <span>{content.editTextArea3}</span>
                    </label>
                  </div>
                ) : (
                  <label className={styles.qtext}>
                    <span>{content.editTextArea1}</span>
                    <span style={styleQ}>{`${content.editTextArea2}`}</span>
                    <span>{content.editTextArea3}</span>
                  </label>
                )}
              </label>
            );

          case "br":
            return <br key={id} />;

          case "blank":
            return (
              <div>
                <br />
              </div>
            );

          case "input":

          case "input":
            const styleInput = {
              minWidth: "120px",
              width: parseInt(editData.width) + 10 + "" + "px",
              height: editData.height + "px",
            };
            return (
              <input
                style={styleInput}
                type={editData.isNum ? "number" : "text"}
                value={content}
                key={id}
                readOnly={true}
              />
            );

          case "dropbox":
            const styleDrop = {
              width: editData.width ? editData.width + "px" : "150px",
            };

            return (
              <select key={id} style={styleDrop}>
                {content.map((dropbox, index) => (
                  <option
                    selected={dropbox.answer && true}
                    key={index}
                    value={dropbox.value}
                  >
                    {dropbox.value}
                  </option>
                ))}
              </select>
            );

          case "radio":
            return (
              <div className={styles.radio} key={id}>
                {editData.question && <p>{editData.question}</p>}
                {content.map((radio, index) => (
                  <div className={styles.radio_li} key={index}>
                    <input
                      type="radio"
                      value={radio.value}
                      checked={radio.answer ? radio.answer : false}
                    />
                    <label className={styles.li_value}>{radio.value}</label>
                  </div>
                ))}
              </div>
            );

          case "checkbox":
            return (
              <div className={styles.radio} key={id}>
                {editData.question && <p>{editData.question}</p>}
                {content.map((checkbox, index) => (
                  <div className={styles.checkbox_li} key={index}>
                    <input
                      type="checkbox"
                      value={checkbox.value}
                      checked={checkbox.answer ? checkbox.answer : false}
                    />
                    <label>{checkbox.value}</label>
                  </div>
                ))}
              </div>
            );

          case "seqCheck":
            const { seqList, numList } = content;
            return (
              <div className={styles.seqCheck}>
                {seqList.map((seq, index) => (
                  <div className={styles.ctn} key={`seq_${index}`}>
                    <div
                      className={
                        styles[numList[index] ? "checkbox_on" : "checkbox_off"]
                      }
                    >
                      <span>{numList[index]}</span>
                    </div>
                    <label>{seq.head}</label>
                    <label>{seq.content}</label>
                  </div>
                ))}
              </div>
            );

          case "image":
            return <img key={id} src={content} />;

          case "trip":
            return (
              <div className={styles.table} key={id}>
                <TripTable editData={editData} />
              </div>
            );

          case "meeting":
            return (
              <div className={styles.table} key={id}>
                <MeetingTable editData={editData} />
              </div>
            );

          case "table":
            return <CustomTable key={id} editData={editData} />;

          default:
            break;
        }
      })}
    </div>
  );
};

export default AdminEmailViewReply;
