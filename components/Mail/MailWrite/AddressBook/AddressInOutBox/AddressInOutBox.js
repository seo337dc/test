import { Fragment } from "react";
import { useDispatch } from "react-redux";
import Scrollbar from "react-scrollbars-custom";
import arrayMove from "array-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { resetAddressList } from "../../../../../utils/store/actions/mailActions";
import InOutBox from "../../../../Buttons/InOutBox/InOutBox";
import styles from "./AddressInOutBox.module.scss";

const ListItem = SortableElement(({ data, setData, sender }) => {
  const checkTest = () => {
    setData((prev) => {
      let newData = prev.map((obj) => {
        if (obj.u_name === data.u_name && obj.u_position === data.u_position) {
          return { ...obj, check: !obj.check };
        } else {
          return obj;
        }
      });

      return newData;
    });
  };

  return (
    <div
      className={styles.item}
      onMouseDown={(e) => (e.target.style.boxShadow = "1px 2px 7px #0000001A")}
      onMouseOut={(e) => (e.target.style.boxShadow = "")}
    >
      <span style={{ color: data.u_name.includes(" ") ? "red" : "" }}>
        {`${data.u_name} ${data.u_position}`}
      </span>
      {!sender && (
        <div
          className={data.check ? styles.checked : styles.check}
          onClick={checkTest}
        />
      )}
    </div>
  );
});
const ListItemHoc = SortableContainer(({ data, setData, sender }) => {
  return (
    <div>
      {data.map((data, idx) => (
        <ListItem
          key={`ListItem_${idx}`}
          data={data}
          setData={setData}
          index={idx}
          sender={sender}
        />
      ))}
    </div>
  );
});

const AddressInOutBox = ({ addressList, item, setItem, sender }) => {
  const dispatch = useDispatch();
  const outClick = () => {
    setItem(item.filter((data) => !data.check));
    dispatch(resetAddressList());
  };

  const inClick = () => {
    let selectedAddrList = [];
    addressList
      .filter((address) => address.addrListData.length > 0)
      .map((address) =>
        address.addrListData.forEach((addr) => {
          const isAlreadyExit = item.some((itemData) => {
            if (
              itemData.u_name === addr.u_name &&
              itemData.u_position === addr.u_position
            ) {
              return true;
            }
          });
          if (addr.checked && !isAlreadyExit) {
            selectedAddrList = selectedAddrList.concat(addr);
          }
        })
      );

    setItem(item.concat(selectedAddrList));
    dispatch(resetAddressList());
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItem(arrayMove(item, oldIndex, newIndex));
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <Scrollbar noDefaultStyles disableTracksWidthCompensation>
          {
            <ListItemHoc
              data={item}
              setData={setItem}
              onSortEnd={onSortEnd}
              pressDelay={200}
              sender={sender}
            />
          }
        </Scrollbar>
      </div>

      {!sender && (
        <Fragment>
          <InOutBox isIn style={{ top: 30, left: -17 }} onClick={inClick} />
          <InOutBox style={{ top: 63, left: -17 }} onClick={outClick} />
        </Fragment>
      )}
    </div>
  );
};

export default AddressInOutBox;
