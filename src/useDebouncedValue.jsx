import { useEffect, useState } from "react";
function useDebouncedValue(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState();

  useEffect(() => {
    // set the value after specified delay
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // cleanup function for clearing the previous timers
    return () => clearTimeout(timerId);
  }, [value, delay]);

  return { debouncedValue };
}

export default useDebouncedValue;


