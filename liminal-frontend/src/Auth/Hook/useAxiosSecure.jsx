import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  // Add a request interceptor
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("token");
      config.headers.authorization = token;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
