import styles from "./MailWriteContents.module.scss";
import MailWriteContentsCustom from "./MailWriteContentsCustom/MailWriteContentsCustom";
import MailWriteContentSeqCheck from "./MailWriteContentSeqCheck/MailWriteContentSeqCheck";
import MailWriteContentsMeeting from "./MailWriteContentsMeeting/MailWriteContentsMeeting";
import MailWriteContentsTrip from "./MailWriteContentsTrip/MailWriteContentsTrip";

const MailWriteContents = ({ editDataList, setViewData, disable, to_name }) => {
  return (
    <div className={styles.wrap}>
      {editDataList?.map((contents) => {
        const { id, content, type } = contents;

        switch (type) {
          case "text":
          case "textarea":
            const styleText = {
              fontWeight: contents.fontWeight,
              borderBottom: contents.borderBottom,
              color: contents.color ? contents.color : "black",
            };

            return (
              <span key={id} style={styleText}>
                {content}
              </span>
            );

          case "p":
          case "parea":
            const styleP = {
              fontWeight: contents.fontWeight,
              borderBottom: contents.borderBottom,
              color: contents.color ? contents.color : "black",
            };
            return (
              <>
                <br />
                <span key={id} style={styleP}>
                  {content}
                </span>
              </>
            );

          case "question":
            const styleQ = {
              borderBottom: contents.borderBottom,
              color: contents.color ? contents.color : "black",
            };
            return (
              <label className={styles.question} key={id}>
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
              </label>
            );

          case "br":
            return <br key={id} />;

          case "blank":
            return (
              <>
                <br key={id} />
                <br />
              </>
            );

          case "input":
            //인풋박스 수정 함수
            const onHandleInput = (inputData, value) => {
              setViewData((prev) => {
                const newRemailInput = prev.re_mail_contents.map((data) => {
                  if (inputData.id === data.id) {
                    return {
                      ...data,
                      content: value,
                      code: {
                        ...data.code,
                        answer: inputData.isNum
                          ? value.replace(/[^0-9]/gi, "")
                          : value,
                      },
                    };
                  } else {
                    return data;
                  }
                });

                return { ...prev, re_mail_contents: newRemailInput };
              });
            };

            const style = {
              minWidth: "120px",
              width: parseInt(contents.width) + 10 + "" + "px",
            };

            return (
              <input
                style={style}
                type={"text"}
                placeholder={
                  contents.isNum ? "답(숫자) 입력" : "답(글자) 입력 "
                }
                value={
                  contents.isNum ? content.replace(/[^0-9]/gi, "") : content
                }
                onChange={(e) => {
                  onHandleInput(contents, e.target.value);
                }}
                key={id}
                disabled={disable}
              />
            );

          case "dropbox":
            //2. 드롭박스 함수
            const onHandleDropbox = (dropData, list, value) => {
              const newDropboxList = list.map((data) => {
                if (value === data.index) {
                  return { ...data, answer: true };
                } else {
                  return { ...data, answer: false };
                }
              });

              setViewData((prev) => {
                const newRemailDropBox = prev.re_mail_contents.map((data) => {
                  if (dropData.id === data.id) {
                    return {
                      ...data,
                      content: newDropboxList,
                      code: {
                        ...dropData.code,
                        answer: value === "" ? value : parseInt(value) + 1 + "",
                      },
                    };
                  } else {
                    return data;
                  }
                });

                return { ...prev, re_mail_contents: newRemailDropBox };
              });
            };

            const styleDrop = {
              width: contents.width ? contents.width + "px" : "150px",
            };

            let isAnswer = false;
            for (let i = 0; i < content.length; i++) {
              if (content[i].answer) {
                isAnswer = true;
              }
            }

            return (
              <select
                style={styleDrop}
                key={id}
                onChange={(e) => {
                  onHandleDropbox(contents, content, e.target.value);
                }}
                disabled={disable}
              >
                <option value="" selected={isAnswer ? false : true}>
                  선택
                </option>
                {isAnswer
                  ? content.map((dropbox, index) => {
                      if (dropbox.answer === true) {
                        return (
                          <option key={index} value={dropbox.index} selected>
                            {dropbox.value}
                          </option>
                        );
                      } else {
                        return (
                          <option key={index} value={dropbox.index}>
                            {dropbox.value}
                          </option>
                        );
                      }
                    })
                  : content.map((dropbox, index) => (
                      <option key={index} value={dropbox.index}>
                        {dropbox.value}
                      </option>
                    ))}
              </select>
            );

          case "radio":
            //3. 라디오 함수
            const onHandleRadio = (index, list, radioData) => {
              const newRadioList = list.map((data) => {
                if (index === data.index) {
                  return { ...data, answer: true };
                } else {
                  return { ...data, answer: false };
                }
              });

              setViewData((prev) => {
                const newRemailRadioBox = prev.re_mail_contents.map((data) => {
                  if (radioData.id === data.id) {
                    return {
                      ...data,
                      content: newRadioList,
                      code: {
                        ...radioData.code,
                        answer: parseInt(index) + 1 + "",
                      },
                    };
                  } else {
                    return data;
                  }
                });

                return { ...prev, re_mail_contents: newRemailRadioBox };
              });
            };

            return (
              <div className={styles.radio} key={id}>
                {contents.question && <p>{contents.question}</p>}
                {content.map((radio, index) => (
                  <div className={styles.radio_li} key={index}>
                    <input
                      type="radio"
                      onChange={() => {
                        onHandleRadio(radio.index, content, contents);
                      }}
                      checked={radio.answer ? true : false}
                      disabled={disable}
                    />
                    <label>{radio.value}</label>
                  </div>
                ))}
              </div>
            );

          case "checkbox":
            //4. 체크박스 함수
            const onHandleCheckbox = (index, list, checkBoxData) => {
              const newCheckboxList = list.map((data) => {
                if (index === data.index) {
                  return { ...data, answer: !data.answer };
                } else {
                  return data;
                }
              });
              let answer = [];
              newCheckboxList.forEach((data) => {
                if (data.answer) {
                  answer.push(parseInt(data.index) + 1 + "");
                }
              });

              setViewData((prev) => {
                const newRemailCheckBox = prev.re_mail_contents.map((data) => {
                  if (checkBoxData.id === data.id) {
                    return {
                      ...checkBoxData,
                      content: newCheckboxList,
                      code: { ...checkBoxData.code, answer },
                    };
                  } else {
                    return data;
                  }
                });

                return { ...prev, re_mail_contents: newRemailCheckBox };
              });
            };

            return (
              <div className={styles.radio} key={id}>
                {contents.question && <p>{contents.question}</p>}
                {content.map((checkbox, index) => (
                  <div className={styles.checkbox_li} key={index}>
                    <input
                      type="checkbox"
                      checked={checkbox.answer}
                      onChange={() => {
                        onHandleCheckbox(checkbox.index, content, contents);
                      }}
                      disabled={disable}
                    />
                    <label>{checkbox.value}</label>
                  </div>
                ))}
              </div>
            );

          // case "seqCheck":
          //   return (
          //     <MailWriteContentSeqCheck
          //       content={content}
          //       code={contents.code}
          //       id={id}
          //       disable={disable}
          //       setTestDataList={setTestDataList}
          //       setAnswer={setAnswer}
          //     />
          //   );

          case "image":
            return <img key={id} src={content} />;

          case "trip":
            return (
              <div className={styles.table} key={id}>
                <MailWriteContentsTrip
                  contents={contents}
                  setViewData={setViewData}
                  disable={disable}
                  to_name={to_name}
                />
              </div>
            );

          case "meeting":
            return (
              <div className={styles.table} key={id}>
                <MailWriteContentsMeeting
                  contents={contents}
                  setTestDataList={setTestDataList}
                  // setAnswer={setAnswer}
                  disable={disable}
                  to_name={to_name}
                />
              </div>
            );

          // case "table":
          //   if (!content) return;
          //   return (
          //     <MailWriteContentsCustom
          //       key={id}
          //       setTestDataList={setTestDataList}
          //       contents={contents}
          //       setAnswer={setAnswer}
          //       disable={disable}
          //       to_name={to_name}
          //     />
          //   );

          default:
            break;
        }
      })}
    </div>
  );
};

export default MailWriteContents;
