import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useUserInfoStore from "../../hooks/useUserInfoStore.js";

const AdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const userInfo = useUserInfoStore((state) => state.userInfo);

  useEffect(() => {
    if (!userInfo || !userInfo.roles.includes("admin")) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  if (!userInfo || !userInfo.roles.includes("admin")) {
    return null;
  }

  return children;
};

export default AdminRoute;
