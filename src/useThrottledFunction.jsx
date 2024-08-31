import { useCallback, useRef } from "react";

function useThrottledFunction(fn, delay) {
  const lastCallRef = useRef(0);

  const throttledFunction = useCallback(
    (...args) => {
      const now = Date.now();

      if (now - lastCallRef.current >= delay) {
        lastCallRef.current = now;
        fn(...args);
      }
    },
    [fn, delay]
  );

  return throttledFunction;
}

export default useThrottledFunction;
