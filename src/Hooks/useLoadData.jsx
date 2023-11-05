import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useLoadData = (url) => {
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState([]);
  useEffect(() => {
    axiosSecure.get(url, { withCredentials: true }).then((res) => {
      setData(res.data);
    });
  }, [url, axiosSecure]);
  return data;
};

export default useLoadData;
