import { useContext, useState } from "react";
import { ErrorContext } from "../context/ErrorContext";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const { updateCode, updateText } = useContext(ErrorContext);

  const fetchData = async (params, options, cb) => {
    //function has an optional paramater "cb"
    //if null, will use error context and return an error page
    // else cb will execute
    options.mode = "cors";
    const url = `https://interview.intrinsiccloud.net/${params}`;
    setLoading(true);
    const data = await fetch(url, options);
    if (data.status > 400) {
      if (!cb) {
        updateCode(data.status);
        updateText(data.statusText);
      } else {
        cb();
      }
      setLoading(false);
    } else {
      const jsonData = await data.json();
      setLoading(false);
      return jsonData;
    }
  };
  return [fetchData, loading];
};

export default useFetch;
