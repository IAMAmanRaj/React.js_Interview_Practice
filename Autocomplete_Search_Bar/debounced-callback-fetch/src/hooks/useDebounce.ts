import { useRef } from "react";

const useDebounce = (cb, delay) => {
  let timeoutRef = useRef(null);
  return function (...args) {
    clearTimeout(timeoutRef.current);
    timeoutRef = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

export default useDebounce;
