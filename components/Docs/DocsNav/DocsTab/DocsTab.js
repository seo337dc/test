import { useDispatch } from "react-redux";
import { removeScreen } from "../../../../utils/store/actions/divisionActions";
import styles from "./DocsTab.module.scss";

/*
      style={{
        width:
          data(idx).type === "home" ? "46px" : `calc(100% / ${tabList.length})`,
      }}
 */

const DocsTab = ({ selected, setSelected, tabList, setTabList, topIdx }) => {
  const dispatch = useDispatch();

  return tabList.map((data, idx) => (
    <div
      key={`nav_tab_${idx}`}
      className={`${styles.tab} ${selected === idx ? "" : styles.tab_disable}`}
      onClick={() => setSelected(idx)}
      style={{
        width: `calc(100% / ${tabList.length})`,
      }}
    >
      <div className={styles.title}>{data(idx).title}</div>
      <i
        className="xi-close"
        onClick={(e) => {
          e.stopPropagation();

          if (tabList.length === 1) {
            dispatch(removeScreen(topIdx));
            return;
          }

          setTabList((prev) =>
            prev.filter((data, underIdx) => underIdx !== idx)
          );

          setSelected((prev) =>
            prev - 1 < 0 ? 0 : idx > selected ? prev : prev - 1
          );
        }}
      />
    </div>
  ));
};

export default DocsTab;
