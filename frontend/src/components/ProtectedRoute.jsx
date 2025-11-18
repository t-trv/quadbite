import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useUserInfoStore from "../hooks/useUserInfoStore.js";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const userInfo = useUserInfoStore((state) => state.userInfo);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  if (!userInfo) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
