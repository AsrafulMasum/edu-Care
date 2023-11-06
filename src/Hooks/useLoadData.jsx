import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useLoadData = (url, credentials) => {
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState([]);
  useEffect(() => {
    axiosSecure.get(url, { withCredentials: credentials }).then((res) => {
      setData(res.data);
    });
  }, [url, credentials, axiosSecure]);
  return data;
};

export default useLoadData;
