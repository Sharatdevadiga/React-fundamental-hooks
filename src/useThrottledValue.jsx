import { useEffect, useRef, useState } from "react";

function useThrottledValue(value, delay = 500) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecutedRef = useRef(new Date());

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (Date.now() - lastExecutedRef.current >= delay) {
        setThrottledValue(value);
        lastExecutedRef.current = Date.now();
      }
    }, delay - (Date.now() - lastExecutedRef.current));
    return () => clearTimeout(timerId);
  }, [value, delay]);

  return throttledValue;
}

export default useThrottledValue;
