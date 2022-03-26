import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    // Create a controller
    const controller = new AbortController();
    
    const fetchData = async () => {
      setIsPending(true);
      try {
        // The fetch method knows how to work with AbortController. It will listen to abort events on signal
        // When a fetch is aborted, its promise rejects with an error AbortError, so we should handle it, e.g. in try..catch. (fetch throws "AbortError")
        const response = await fetch(url, { signal: controller.signal });
        // console.log(response)
        // check if response obj contains ok: true
        if (!response.ok) {
          // throw will be transferred to "e" in catch
          throw new Error(response.statusText);
        }
        // if throw is specified the code below does not get executed
        const json = await response.json();
        setIsPending(false);
        setData(json);
        setError(null);
        // Will only catch error which are related to network issues but will not display our 404 response because it is technically still a response and code will run after it and cause more errors
      } catch (e) {
        // if we get AbortError error we will not execute code below and not update the state
        if (e.name === "AbortError") {
          console.log("the fetch was aborted");
        } else {
          setIsPending(false);
          // e.message will be from throw
          console.log(e.message);
          // will be used as a placeholder in another component
          setError("Could not fetch the data");
        }
      }
    };
    fetchData();

    // Clean Up function, gets called if component depending on the useEffect gets unmounted/removed from DOM
    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, isPending, error };
};
