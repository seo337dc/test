import { useDispatch, useSelector } from "react-redux";
import SliderBtn from "../../Buttons/SliderBtn/SliderBtn";
import RoundedBtn from "../../Buttons/RoundedBtn/RoundedBtn";
import UserName from "../../Layout/UserName/UserName";
import {
  addScreen,
  addEmptyScreen,
  removeScreen,
} from "../../../utils/store/actions/divisionActions";
import {
  setIsMemoOpen,
  setIsMessengerOpen,
  setIsCalcOpen,
  setFocus,
  setIsPtEditorOpen,
} from "../../../utils/store/actions/modalStateAction";
import styles from "./Menu.module.scss";
import { setMailList } from "../../../utils/store/actions/mailActions";

const Menu = () => {
  const dispatch = useDispatch();
  const division = useSelector((state) => state.division);
  const mailUnReadCount = useSelector(
    (state) =>
      state.mailList.listData.filter((data) => data.read_yn === "N").length
  );
  const messengerUnReadCount = useSelector((state) => {
    let totalCount = 0;
    state.messenger.sData
      .filter((data) => data.CntN !== "0")
      .forEach((innerData) => {
        if (innerData.CntN) {
          totalCount += Number(innerData.CntN);
        }
      });
    return totalCount;
  });

  const divisionButton = () => {
    if (division.length === 1) {
      dispatch(addEmptyScreen());
    } else if (division.length === 2) {
      dispatch(removeScreen(1));
    } else {
      return;
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.none_if_small_screen}>화면분할</div>
      <SliderBtn
        width={50}
        height={22}
        value={division.length > 1}
        sliderMargin={3}
        onClick={divisionButton}
        noneIfSmallScreen
      />
      <div className={styles.container}>
        <RoundedBtn
          innerText="메일함"
          onClick={() => {
            dispatch(addScreen({ id: Math.random(), component: "Mail" }));
            dispatch(setMailList("from"));
          }}
          unRead={mailUnReadCount}
        />
        <RoundedBtn
          innerText="자료실"
          onClick={() =>
            dispatch(addScreen({ id: Math.random(), component: "Docs" }))
          }
        />
        <RoundedBtn
          innerText="캘린더"
          onClick={() =>
            dispatch(addScreen({ id: Math.random(), component: "Calendar" }))
          }
        />
        <RoundedBtn
          innerText="메모장"
          onClick={() => {
            dispatch(setIsMemoOpen(true));
            dispatch(setFocus("memo"));
          }}
        />
        {/* <RoundedBtn
          innerText="에디터"
          onClick={() => {
            dispatch(setIsPtEditorOpen(true));
            dispatch(setFocus("ptEditor"));
          }}
        /> */}
        <RoundedBtn
          innerText="메신저"
          onClick={() => {
            dispatch(setIsMessengerOpen(true));
            dispatch(setFocus("messenger"));
          }}
          unRead={messengerUnReadCount}
        />
        <RoundedBtn
          innerText="계산기"
          onClick={() => {
            dispatch(setIsCalcOpen(true));
            dispatch(setFocus("calc"));
          }}
        />
      </div>
      <UserName />
    </div>
  );
};

export default Menu;
