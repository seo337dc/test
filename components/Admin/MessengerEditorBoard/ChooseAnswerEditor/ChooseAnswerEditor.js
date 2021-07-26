import styles from "./ChooseAnswerEditor.module.scss";

const ChooseAnswerEditor = ({ chooseData, setChooseData }) => {
  const onChange = (e, idx) => {
    e.persist();
    setChooseData((prev) => {
      const temp = [...prev];
      temp[idx].id = idx + 1;
      temp[idx].text = e.target.value;
      return temp;
    });
  };

  const insert = () => {
    setChooseData((prev) => {
      const temp = [...prev];
      temp.push({ id: "", text: "" });
      return temp;
    });
  };

  const del = () => {
    setChooseData((prev) => {
      const temp = [...prev];
      temp.pop();
      return temp;
    });
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.item_wrap}>
        {chooseData?.map((data, idx) => (
          <div className={styles.item_container} key={`choose_editor_${idx}`}>
            {idx + 1}
            <input value={data.text} onChange={(e) => onChange(e, idx)} />
          </div>
        ))}
      </div>
      <div className={styles.btn_wrap}>
        <div className={styles.btn} onClick={del}>
          삭제
        </div>
        <div className={styles.btn} onClick={insert}>
          추가
        </div>
      </div>
    </div>
  );
};

export default ChooseAnswerEditor;
