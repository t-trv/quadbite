import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useUserInfoStore from "../../hooks/useUserInfoStore.js";

const ProtectedStaffRoute = ({ children }) => {
  const navigate = useNavigate();
  const userInfo = useUserInfoStore((state) => state.userInfo);

  useEffect(() => {
    if (!userInfo.roles.includes("staff") && !userInfo.roles.includes("admin")) {
      navigate("/");
    }
  }, [userInfo]);

  if (!userInfo) {
    return null;
  }

  return children;
};

export default ProtectedStaffRoute;
