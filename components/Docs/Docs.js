import { useState } from "react";
import DocsNav from "./DocsNav/DocsNav";
import DocsHome from "./DocsHome/DocsHome";
import DocsDetail from "./DocsDetail/DocsDetail";
import axios from "axios";
import { DOC_BOOKMARK } from "../../utils/fetch/apiConfig";
import styles from "./Docs.module.scss";

const maxTab = 10;

const onClickBookMark = async (fileNo, isMarked, categoryCD) => {
  try {
    const res = await axios.post(DOC_BOOKMARK, {
      fileNo,
      method: isMarked === "Y" ? "N" : "Y",
      categoryCD,
    });

    return res.data.result;
  } catch (error) {
    console.error(error);
  }
};

const tabDetail = (r, title, id) => (idx) => ({
  type: "detail",
  title,
  component: (selected) => (
    <DocsDetail
      key={`docs_detail_${r}`}
      style={{ display: idx == selected ? "" : "none" }}
      id={id}
      onClickBookMark={onClickBookMark}
    />
  ),
});

const tabHom = (r) => (idx) => ({
  type: "home",
  title: <i className="xi-home" />,
  component: (selected, setTabList) => (
    <DocsHome
      key={`docs_home_${r}`}
      style={{ display: idx == selected ? "" : "none" }}
      setTabList={setTabList}
      idx={idx}
      tabDetail={tabDetail}
      onClickBookMark={onClickBookMark}
    />
  ),
});

const Docs = ({ idx }) => {
  const [selected, setSelected] = useState(0);
  const [tabList, setTabList] = useState([tabHom(Math.random())]);

  return (
    <div className={styles.wrap}>
      <DocsNav
        idx={idx}
        selected={selected}
        setSelected={setSelected}
        tabList={tabList}
        setTabList={setTabList}
        tabHom={tabHom}
        maxTab={maxTab}
      />
      <div className={styles.container}>
        {tabList.map((d, idx) => d(idx).component(selected, setTabList))}
      </div>
    </div>
  );
};

export default Docs;
