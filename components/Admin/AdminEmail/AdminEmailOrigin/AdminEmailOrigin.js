import { Editor } from "react-draft-wysiwyg";
import uploadImageCallBack from "../../../../utils/common/uploadFiles";
import styles from "./AdminEmailOrigin.module.scss";

const AdminEmailOrigin = ({ editorState, setEditorState }) => {
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  return (
    <Editor
      wrapperClassName={styles.wrapper}
      editorClassName={styles.editor}
      toolbarClassName={styles.toolbar}
      toolbar={{
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        history: { inDropdown: false },
        image: {
          options: ["image"],
          uploadCallback: uploadImageCallBack,
          uploadEnabled: true,
          previewImage: true,
          defaultSize: {
            height: "auto",
            width: "auto",
          },
        },
      }}
      placeholder="내용을 작성해주세요."
      localization={{
        locale: "ko",
      }}
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
    />
  );
};

export default AdminEmailOrigin;
