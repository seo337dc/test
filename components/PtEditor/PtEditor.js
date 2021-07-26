import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import useModalDrag from "../../utils/customHook/useModalDrag";
import PtEditorNav from "./PtEditorNav/PtEditorNav";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";
import { setIsPtEditorOpen } from "../../utils/store/actions/modalStateAction";
import styles from "./PtEditor.module.scss";

const Editor = dynamic(
  () => import("@toast-ui/react-editor").then((m) => m.Editor),
  {
    ssr: false,
  }
);

const PtEditor = () => {
  const [position, dragHandler, setFocus, options] = useModalDrag(
    50,
    600,
    "PtEditor"
  );
  const dispatch = useDispatch();

  return (
    <div
      className={styles.wrap}
      style={{
        right: position,
        zIndex: options.zIndex,
      }}
      onMouseDown={setFocus}
    >
      <PtEditorNav
        dragHandler={dragHandler}
        setFocus={setFocus}
        icon="xi-angle-left-thin"
        clickClose={() => dispatch(setIsPtEditorOpen(false))}
      />
      <Editor
        previewStyle="tab"
        height="calc(100% - 70px)"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        language="kr"
        plugins={[colorSyntax, tableMergedCell]}
        hideModeSwitch
        toolbarItems={[
          "heading",
          "bold",
          "italic",
          "strike",
          "divider",
          "hr",
          "quote",
          "divider",
          "ul",
          "ol",
          "task",
          "indent",
          "outdent",
          "divider",
          "table",
        ]}
      />
    </div>
  );
};

export default PtEditor;
