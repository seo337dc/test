import { useRef, useEffect, useState } from "react";

/**
 * return isOutsideClick state hook
 * 2021.03.11 junyeong CHOI
 * @returns {Array} [containerRef, isOutsideClick]
 */
const useOutsideClick = () => {
  const containerRef = useRef(null);
  const [isOutsideClick, setOutSideClick] = useState(false);

  const handleClickOutside = () => {
    if (container.current) {
      setOutSideClick(container.current.contains(e.target));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    () => document.removeEventListener("mousedown", handleClickOutside);
  }, [container.current]);

  return [containerRef, isOutsideClick];
};

export default useOutsideClick;
