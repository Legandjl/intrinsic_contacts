import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const fetchData = async (params, options, cb) => {
    //function has an optional paramater "cb"
    //if null, will perform default error handling
    // else cb will execute
    options.mode = "cors";
    try {
      const url = `https://interview.intrinsiccloud.net/${params}`;
      setLoading(true);
      const data = await fetch(url, options);
      if (data.status === 401) {
        console.error(401);
        setLoading(false);
        //cb ? cb.401():
        //!cb &&
        nav(`/unauthorised`, { replace: true });
        return null;
      }
      if (data.status === 400) {
        console.error(400);
        setLoading(false);
        return null;
      }

      if (data.status === 403) {
        console.error(403);
        setLoading(false);
        //nav(`/403`, { replace: true });
        return null;
      }
      if (data.status === 404) {
        console.error(404);
        setLoading(false);
        //nav(`/404`, { replace: true });
        return null;
      }

      const jsonData = await data.json();
      setLoading(false);
      return jsonData;
    } catch (e) {
      //cb ? cb() : nav oops
      console.error("catch block");
      setLoading(false);
      return null;
    }
  };
  return [fetchData, loading];
};

export default useFetch;
