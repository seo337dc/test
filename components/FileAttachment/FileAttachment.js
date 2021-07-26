import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAttachFileList } from "../../utils/store/actions/attachFileListAction";
import ModalCommon from "../Modal/ModalCommon/ModalCommon";
import SideMenu from "./FileSideMenu/FileSideMenu";
import ItemList from "./FileItemList/FileItemList";
import FileSelectedItemList from "./FileSelectedItemList/FileSelectedItemList";
import BlockBtn from "../Buttons/BlockBtn/BlockBtn";
import styles from "./FileAttachment.module.scss";

const FileAttachment = ({ viewData, setViewData, setModalOpen }) => {
  const dispatch = useDispatch();
  const attachFile = useSelector((state) => state.attachFile);
  const [selected, setSelected] = useState(3);
  const [inPicked, setInPicked] = useState([]);
  const [picked, setPicked] = useState(viewData.replyFile || []);

  const pickedIn = (fileData) => {
    if (
      inPicked.map((d) => d.intern_quest_id).includes(fileData.intern_quest_id)
    ) {
      setInPicked((prev) =>
        prev.filter(
          (filterData) =>
            filterData.intern_quest_id !== fileData.intern_quest_id
        )
      );
    } else {
      setInPicked((prev) => [...prev, fileData]);
    }
  };

  const clickIn = () => {
    const fileNoList = picked.map((file) => file.list_no);
    const addFileList = inPicked.filter(
      (file) => !fileNoList.includes(file.list_no)
    );

    setPicked(picked.concat(addFileList));
    setInPicked([]);
  };

  const clickOut = () => {
    setPicked(picked.filter((file) => !file.check));
  };

  const clickSubmit = () => {
    setModalOpen(false);
    setInPicked([]);
    setViewData((prev) => {
      return { ...prev, replyFile: picked };
    });
  };

  useEffect(() => {
    dispatch(getAttachFileList(selected));
  }, [selected]);

  return (
    <ModalCommon title="파일 첨부" setModalOpen={setModalOpen}>
      <div className={styles.wrap}>
        <div className={styles.item_title}>
          <div className={styles.title}>자료실 목록</div>
          <div className={styles.sub_title}>자료명</div>
        </div>
        <div className={styles.container}>
          <SideMenu
            data={attachFile.categoryList}
            selected={selected}
            onClick={setSelected}
          />
          <ItemList
            data={attachFile.listData}
            selected={selected}
            pickedIn={pickedIn}
            inPicked={inPicked}
            clickOut={clickOut}
          />
        </div>
        <div className={styles.divd}>
          선택자료
          <div className={styles.btn_wrap}>
            <div className={styles.btn} onClick={clickIn}>
              <i className="xi-angle-down-thin" />
            </div>
            <div className={styles.btn} onClick={clickOut}>
              <i className="xi-angle-up-thin" />
            </div>
          </div>
          <div />
        </div>
        <div className={styles.sub_container}>
          <FileSelectedItemList picked={picked} setPicked={setPicked} />
        </div>
        <BlockBtn
          color="gray"
          style={{ width: 210, height: 60, margin: "0 auto" }}
          onClick={clickSubmit}
        >
          확인
        </BlockBtn>
      </div>
    </ModalCommon>
  );
};

export default FileAttachment;
