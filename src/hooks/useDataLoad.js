import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import useFetch from "./useFetch";

const useDataLoad = (url, options) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchData, fetchInProgress, error] = useFetch();
  const { user } = useContext(AuthContext);

  const refresh = () => {
    setLoading(true);
  };

  const addOne = (newObj) => {
    setData((prev) => {
      return [newObj].concat([...prev]);
    });
  };

  const removeOne = (id) => {
    setData((prev) => {
      const newArr = prev.filter((item) => {
        return item.id !== id;
      });
      return newArr;
    });
  };

  useEffect(() => {
    const startLoad = async () => {
      const jsonData = await fetchData(url, options, null);

      setData(jsonData);
      setLoading(false);
    };

    if (loading && !fetchInProgress && user) {
      startLoad();
    }
  }, [fetchData, fetchInProgress, loading, options, url, user]);

  return [data, refresh, loading, error, addOne, removeOne];
};

export default useDataLoad;
