import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";


const usePostData = (url, userInfo) => {
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState([]);
  useEffect(() => {
    axiosSecure.post(url, userInfo).then((res) => {
      setData(res.data);
    });
  }, [url, axiosSecure, userInfo]);
  return data;
};
export default usePostData;