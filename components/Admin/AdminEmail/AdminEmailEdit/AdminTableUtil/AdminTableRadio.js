import { useEffect, useState } from "react";
import { replaceNewline } from "../../../../../utils/common/fomatter";
import styles from "./AdminTableRadio.module.scss";

const AdminTableRadio = ({
  data,
  onHandleAgendaPuroseConfirm,
  onHandleAgendaPurposeDel,
  setData,
  type,
  Intern_Quest_ID,
}) => {
  const [radioInput, setRadioInput] = useState("");
  const [radioList, setRadioList] = useState([]);
  const [code, setCode] = useState({ key: Intern_Quest_ID + "_", answer: "" });
  const [remark, setRemark] = useState({
    remark1: "",
    remark2: "",
    remark3: "",
  });

  useEffect(() => {
    if (data) {
      const { code, list, remark } = data;
      if (code) setCode(code);
      if (list) setRadioList(list);
      if (remark) setRemark(remark);
    }
  }, [data]);

  const onHandleRemark = (e) => {
    setRemark({ ...remark, [e.target.name]: e.target.value });
  };

  //라디오 내용 추가 기능
  const onHandleRadioAdd = () => {
    if (!radioInput) {
      alert("내용을 작성해주세요.");
      return;
    }

    const addList = radioList.concat({ value: radioInput });

    setRadioList(
      addList.map((radio, index) => {
        return { index: index + "", ...radio };
      })
    );
    setRadioInput("");
  };

  const onKeyPressAddCheckBox = (e) => {
    if (e.key === "Enter") {
      onHandleRadioAdd();
      e.preventDefault();
    }
  };

  //라디오 체크 기능
  const onHandleRadioCheck = (index) => {
    setRadioList(
      radioList.map((radioState) => {
        if (index === radioState.index) {
          return { ...radioState, answer: true };
        } else {
          return { ...radioState, answer: false };
        }
      })
    );
  };

  //라디오 내용 변경 기능
  const onHandleRadioChange = (e, index) => {
    setRadioList(
      radioList.map((radio) => {
        if (index === radio.index) {
          return { ...radio, value: replaceNewline(e.target.value) };
        } else {
          return radio;
        }
      })
    );
  };

  //라디오 리스트 지우는 기능
  const onHandleRadioDel = (index) => {
    const nowstate = radioList.filter(
      (radioState) => radioState.index !== index
    );

    setRadioList(
      nowstate.map((state, index) => {
        return { ...state, index: index + "" };
      })
    );
  };

  const onHandleEditDel = () => {
    setData();
    onHandleAgendaPurposeDel(type);
  };

  //확인 기능
  const onHandleEditConfirm = () => {
    let isAnswer = false;
    let isValue = true;
    let answer = "";

    if (!radioList.length) {
      alert("내용을 추가해주세요.");
      return;
    }

    if (!code.key) {
      alert("고유 코드를 작성해주세요.");
      return;
    }

    if (radioList.length < 2) {
      alert("내용은 2개 이상이어야합니다.");
      return;
    }

    radioList.forEach((radioState) => {
      if (radioState.answer) {
        isAnswer = true;
        answer = parseInt(radioState.index) + 1;
      }
      if (!radioState.value) isValue = false;
    });

    if (!isAnswer) {
      alert("답을 선택해주세요.");
      return;
    }

    if (!isValue) {
      alert("내용이 없는 부분이 있습니다.");
      return;
    }

    onHandleAgendaPuroseConfirm(
      type,
      radioList,
      {
        ...code,
        answer: answer + "",
      },
      remark
    );
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.left}>
        <div className={styles.code}>
          <span>고유코드 :</span>
          <input
            type="text"
            placeholder="고유 코드를 작성해주세요."
            value={code.key}
            onChange={(e) => setCode({ ...code, key: e.target.value })}
          />
        </div>
        <div className={styles.remark}>
          <span>질문:</span>
          <input
            placeholder="입력"
            name="remark1"
            value={remark.remark1}
            onChange={onHandleRemark}
          />
          <input
            placeholder="강조 부분"
            name="remark2"
            value={remark.remark2}
            onChange={onHandleRemark}
          />
          <input
            placeholder="입력"
            name="remark3"
            value={remark.remark3}
            onChange={onHandleRemark}
          />
        </div>

        <div className={styles.item}>
          <span>라디오 추가 :</span>
          <textarea
            value={radioInput}
            placeholder="내용을 작성해주세요."
            onChange={(e) => setRadioInput(replaceNewline(e.target.value))}
            onKeyPress={onKeyPressAddCheckBox}
          />

          <div className={styles.add} onClick={onHandleRadioAdd}>
            추가
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.list}>
          {radioList.map((radio, index) => {
            return (
              <div className={styles.radio} key={index}>
                <i
                  className={
                    radio.answer ? "xi-radiobox-checked" : "xi-radiobox-blank"
                  }
                  onClick={() => onHandleRadioCheck(radio.index)}
                />

                <textarea
                  type="text"
                  placeholder="내용을 작성해주세요."
                  value={radio.value}
                  onChange={(e) => onHandleRadioChange(e, radio.index)}
                />

                <i
                  className="xi-close-circle"
                  onClick={() => onHandleRadioDel(radio.index)}
                />
              </div>
            );
          })}
        </div>
        <div className={styles.btn}>
          <div className={styles.submit} onClick={onHandleEditConfirm}>
            적용
          </div>
          <div className={styles.submit} onClick={onHandleEditDel}>
            삭제
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTableRadio;
