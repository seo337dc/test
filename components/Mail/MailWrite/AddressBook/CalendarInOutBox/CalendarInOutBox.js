import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import Scrollbar from "react-scrollbars-custom";
import InOutBox from "../../../../Buttons/InOutBox/InOutBox";
import styles from "./CalendarInOutBox.module.scss";

const ListItem = SortableElement(({ data, onClick }) => (
  <div
    className={styles.item}
    onMouseDown={(e) => (e.target.style.boxShadow = "1px 2px 7px #0000001A")}
    onMouseOut={(e) => (e.target.style.boxShadow = "")}
  >
    <div>
      <span style={{ color: data.u_name.includes(" ") ? "red" : "" }}>
        {`${data.u_name} ${data.u_position}`}
      </span>
    </div>
    <div
      className={styles[data.check ? "checked" : "check"]}
      onClick={() => onClick(data)}
    />
  </div>
));

const ListItemHoc = SortableContainer(({ data, onClick }) => {
  return (
    <div>
      {data.map((data, idx) => (
        <ListItem
          key={`ListItem_${idx}`}
          data={data}
          onClick={onClick}
          index={idx}
        />
      ))}
    </div>
  );
});

const CalendarInOutBox = ({ selectedItem, setSelectedItem, item, setItem }) => {
  const outClick = () => {
    //수정 내용...
    const outItemList = item.filter((obj) => !obj.check);
    setItem(outItemList);
    // setItem([]);
  };

  const inClick = () => {
    //수정 내용...
    let changeSelectedItem = selectedItem.map((d) => {
      delete d.check;
      delete d.team_name;
      delete d.check;

      return {
        ...d,
      };
    });

    const inItemList = [
      ...new Set(item.concat(changeSelectedItem).map(JSON.stringify)),
    ].map(JSON.parse);

    setItem(inItemList);
    setSelectedItem([]);
  };

  //추가 기능...
  const onCheckOutList = (data) => {
    const outItemList = item.map((obj) => {
      if (obj.addr_no === data.addr_no) {
        return { ...obj, check: !data.check };
      } else {
        return obj;
      }
    });
    setItem(outItemList);
    setSelectedItem([]);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItem(arrayMove(item, oldIndex, newIndex));
  };

  return (
    <div className={styles.wrap}>
      <InOutBox isIn style={{ top: 30, left: -17 }} onClick={inClick} />
      <InOutBox style={{ top: 63, left: -17 }} onClick={outClick} />
      <div className={styles.container}>
        <Scrollbar noDefaultStyles disableTracksWidthCompensation>
          {
            <ListItemHoc
              data={item}
              onClick={onCheckOutList}
              onSortEnd={onSortEnd}
              pressDelay={200}
            />
          }
        </Scrollbar>
      </div>
    </div>
  );
};

export default CalendarInOutBox;
