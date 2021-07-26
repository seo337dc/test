import { useDispatch } from "react-redux";
import { removeScreen } from "../../../utils/store/actions/divisionActions";
import DocsTab from "./DocsTab/DocsTab";
import styles from "./DocsNav.module.scss";

const DocsNav = ({
  idx,
  selected,
  setSelected,
  tabList,
  setTabList,
  tabHom,
  maxTab,
}) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.wrap}>
      <div className={styles.tab_wrap}>
        <DocsTab
          selected={selected}
          setSelected={setSelected}
          tabList={tabList}
          setTabList={setTabList}
          topIdx={idx}
        />
        <div className={styles.plus_wrap}>
          <i
            className="xi-plus"
            onClick={() => {
              setTabList((prev) =>
                prev.length < maxTab ? [...prev, tabHom(Math.random())] : prev
              );
              setSelected(
                tabList.length < maxTab ? tabList.length : tabList.length - 1
              );
            }}
            style={{ display: tabList.length === maxTab ? "none" : "" }}
          />
        </div>
      </div>
      <i
        className="xi-close-thin"
        onClick={() => dispatch(removeScreen(idx))}
      />
    </div>
  );
};

export default DocsNav;
