import debounce from "lodash.debounce";
import throttle from "lodash.throttle";
import { useRef } from "react";

// /**
//  * debounce hook
//  * 2021.03.11 junyeong CHOI
//  * @param {function} fn
//  * @param {number} wait default 1000ms
//  * @param {object} options { leading?: boolean; trailing?: boolean; }
//  */
// const useDebounce = (fn, wait = 1000, options = {}) => {
//   const fnRef = useRef(debounce((...arg) => fn(...arg), wait, options)).current;
//   return fnRef;
// };

// export default useDebounce;

/**
 * debounce hook
 * 2021.03.11 junyeong CHOI
 * @param {function} fn
 * @param {number} wait default 1000ms
 * @param {object} options { leading?: boolean; trailing?: boolean;0 }
 */
const useThrottle = (fn, wait = 1000, options) => {
  const fnRef = useRef(throttle((...arg) => fn(...arg), wait, options)).current;
  return fnRef;
};

export default useThrottle;
