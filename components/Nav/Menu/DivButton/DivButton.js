import { useDispatch, useSelector } from "react-redux";
import {
  addEmptyScreen,
  removeScreen,
} from "../../../../utils/store/actions/divisionActions";
import styles from "./DivButton.module.scss";

const DivButton = () => {
  const dispatch = useDispatch();
  const division = useSelector((state) => state.division);

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
    <img
      src={`/img/division_${division.length <= 1 ? "on" : "off"}.svg`}
      alt="division icon"
      className={styles.division}
      onClick={divisionButton}
    />
  );
};

export default DivButton;
