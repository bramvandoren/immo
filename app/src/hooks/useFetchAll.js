import { useCallback, useEffect, useState } from "react";
import { handleErrors } from "../helpers/api";

const useFetch = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(() => {
    let isCurrent = true;

    fetch(`${process.env.REACT_APP_API_URL}${path}`)
      .then(handleErrors)
      .then((data) => {
        if (isCurrent) {
          setData(data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        if (isCurrent) {
          setError(error);
          setIsLoading(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [path]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const invalidate = () => {
    setIsLoading(true);
    fetchData();
  };

  return {
    isLoading,
    data,
    error,
    invalidate,
  };
};

export default useFetch;
