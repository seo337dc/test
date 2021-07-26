import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFocus } from "../../utils/store/actions/modalStateAction";

const lastRightPosition = 20;

const useModalDrag = (
  memoInitialRightPosition,
  componentWidth,
  componentName
) => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modalState);
  const [memoXPosition, setMemoXPosition] = useState(memoInitialRightPosition);
  const isMouseDown = useRef(false);

  const setPosition = (e) => {
    if (isMouseDown.current) {
      setMemoXPosition((prev) => {
        if (
          document.body.clientWidth - (prev - e.movementX + componentWidth) <
            lastRightPosition ||
          prev - e.movementX < lastRightPosition
        ) {
          isMouseDown.current = false;
          return prev;
        } else {
          return prev - e.movementX;
        }
      });
    }
  };

  const onClick = () => {
    dispatch(setFocus(componentName));
  };

  const mouseUpHandler = () => (isMouseDown.current = false);

  const onMouseDown = () => (isMouseDown.current = true);

  const onMouseUp = () => (isMouseDown.current = false);

  useEffect(() => {
    addEventListener("mousemove", setPosition);
    addEventListener("mouseup", mouseUpHandler);

    return () => {
      removeEventListener("mousemove", setPosition);
      removeEventListener("mouseup", mouseUpHandler);
    };
  }, [memoXPosition]);

  return [
    memoXPosition,
    { onMouseDown, onMouseUp },
    onClick,
    {
      zIndex: modalState.focus === componentName ? 10000 : "",
    },
  ];
};

export default useModalDrag;
