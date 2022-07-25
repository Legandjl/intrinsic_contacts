import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const fetchData = async (params, options, cb) => {
    options.mode = "cors";
    try {
      const url = `https://interview.intrinsiccloud.net/swagger-ui/#/${params}`;
      setLoading(true);
      const data = await fetch(url, options);
      if (data.status === 401) {
        console.log("err");
        setLoading(false);
        //cb ? cb.401():
        //!cb &&
        nav(`/unauthorised`, { replace: true });
        return;
      }
      if (data.status === 400) {
        setLoading(false);
        return;
      }

      if (data.status === 403) {
        setLoading(false);
        //nav(`/403`, { replace: true });
        return;
      }
      if (data.status === 404) {
        setLoading(false);
        //nav(`/404`, { replace: true });
        return;
      }

      const jsonData = await data.json();
      setLoading(false);
      return jsonData;
    } catch (e) {
      //cb ? cb() : nav oops
      setLoading(false);
      return;
    }
  };
  return [fetchData, loading];
};

export default useFetch;
