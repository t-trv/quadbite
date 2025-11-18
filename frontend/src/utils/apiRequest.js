import axios from "axios";
import toast from "react-hot-toast";

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

apiRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      toast.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.");

      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiRequest;
