import { useEffect, useState } from "react";

function useFetcherWithRetry(url, retry = 2) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState(null);

  function reset() {
    setIsError(false);
    setErrorMessage("");
  }

  async function fetchData() {
    reset();
    setIsLoading(true);
    let retryCount = 1;

    while (retryCount <= retry) {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res?.status}`);

        const data = await res.json();
        if (data) {
          setData(data);
          break;
        }
      } catch (err) {
        retryCount++;
        setIsError(true);
        setErrorMessage(err.message);
      }
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  return { isLoading, isError, errorMessage, data };
}

export default useFetcherWithRetry;
