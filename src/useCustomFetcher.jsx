import { useEffect } from "react";
import { useState } from "react";

function useCustomFetcher(url) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  function reset() {
    setIsError(false);
    setError("");
  }

  async function fetchData() {
    reset();
    setIsLoading(true);

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! status: ${res?.status}`);

      const data = await res.json();
      setData(data);
    } catch (err) {
      setIsError(true);
      setError(err.message);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  return { isLoading, data, isError, error };
}

export default useCustomFetcher;
