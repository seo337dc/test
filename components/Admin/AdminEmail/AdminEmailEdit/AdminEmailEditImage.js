import { useEffect, useState } from "react";
import AdminEmailLayout from "../AdminEmailLayout/AdminEmailLayout";
import uploadImageCallBack from "../../../../utils/common/uploadFiles";
import styles from "./AdminEmailEditImage.module.scss";

const AdminEmailEditImage = ({
  setEditorDataList,
  onHandleEditDelete,
  data,
}) => {
  const [imgBase64, setImgBase64] = useState("");
  const [imgFile, setImgFile] = useState("");

  useEffect(() => {
    if (data.content) setImgBase64(data.content);
  }, [data]);

  const onHandleChangeFile = async (e) => {
    let imageData = await uploadImageCallBack(e.target.files[0]);
    setImgFile(imageData.data.url);
  };

  const onHandleConfirm = () => {
    if (!imgFile) {
      alert("이미지가 제대로 추가되지 않았습니다. 다시 추가해주시길 바랍니다.");
      return;
    }

    if (confirm("이미지를 추가하시겠습니까?")) {
      setEditorDataList((preDataList) =>
        preDataList.map((editorData) => {
          if (editorData.id === data.id) {
            return { ...editorData, content: imgFile };
          } else {
            return editorData;
          }
        })
      );
    }
  };

  return (
    <AdminEmailLayout type="image" title="Image">
      <div className={styles.wrap}>
        <div className={styles.top}>
          <div className={styles.file}>
            <input
              type="file"
              name="imgFile"
              id="imgFile"
              onChange={onHandleChangeFile}
            />
          </div>

          <div className={styles.button}>
            <div className={styles.right}>
              <div className={styles.btn} onClick={onHandleConfirm}>
                확인
              </div>
              <div
                className={styles.btn}
                onClick={() => onHandleEditDelete(data)}
              >
                삭제
              </div>
            </div>
          </div>
        </div>

        <div className={styles.image}>
          {imgBase64 && <img src={imgBase64} />}
        </div>
      </div>
    </AdminEmailLayout>
  );
};

export default AdminEmailEditImage;
