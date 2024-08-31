import { useCallback, useRef } from "react";

function useDebouncedFunction(fn, delay = 500) {
  const timeoutRef = useRef(null);

  const debouncedFunction = useCallback(
    (...args) => {
      // clear the previous timeouts before executing the new one
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [fn, delay]
  );

  return { debouncedFunction };
}

export default useDebouncedFunction;
