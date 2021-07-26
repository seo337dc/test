import { useRouter } from "next/router";
import axios from "axios";
import { QUESTION_DELETE } from "../../../utils/fetch/apiConfig";
import styles from "./AdminItem.module.scss";

const AdminItem = ({ data }) => {
  const router = useRouter();

  const onHandleDelete = async () => {
    try {
      if (
        confirm(`${data.Issue_ID}, ${data.Intern_Quest_ID} 삭제하시겠습니까?`)
      ) {
        const res = await axios.post(QUESTION_DELETE, {
          App_Name: router.query.menu,
          Issue_ID: data.Issue_ID,
          Intern_Quest_ID: data.Intern_Quest_ID,
        });
        alert(`[${res.data.result}] ${res.data.msg}`);
        location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles[data.Category_CD === "6" ? "item_notice" : "item"]}
      >
        <div
          className={styles.item_left}
          onClick={() =>
            router.push(
              `/admin/dashboard/${router.query.menu}Editor?id=${
                data.Intern_Quest_ID
              }&idx=${data.Quest_IDX ? data.Quest_IDX : ""}`
            )
          }
        >
          <div className={styles.mr}>{data.Issue_ID} </div>
          <div className={styles.qCode}>{data.Intern_Quest_ID}</div>
          <div className={styles.mr}>{data.File_Kind} </div>
          {data.File_Category && (
            <div className={styles.mr}>[{data.File_Category}] </div>
          )}
          <div className={styles.title}>{data.File_Name} </div>
          <div className={styles.title}>{data.Mail_Subject}</div>
          {data.Attach_File && data.Attach_File === "Y" && (
            <div className={styles.file}>
              <i className="xi-file-text-o" />
            </div>
          )}

          {data.Category_CD && (
            <div className={styles.cate}>
              {data.Category_CD === "6" && "[회신]"}
              {data.Category_CD === "7" && "[공지]"}
            </div>
          )}

          {data.Category_CD && (
            <div className={styles.cate}>
              {data.Category_CD === 1 && "[즐겨찾기]"}
              {data.Category_CD === 2 && "[개인 자료실]"}
              {data.Category_CD === 3 && "[공용 자료실]"}
              {data.Category_CD === 4 && "[플젝1 자료실]"}
              {data.Category_CD === 5 && "[플젝2 자료실]"}
            </div>
          )}
        </div>
        <div className={styles.setting}>
          <i className="xi-trash-o" onClick={onHandleDelete} />
        </div>
      </div>
    </div>
  );
};

export default AdminItem;
