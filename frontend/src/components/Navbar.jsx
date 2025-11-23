import Button from "./ui/Button";
import { Handbag, UserStar } from "lucide-react";

import useUserInfoStore from "../hooks/useUserInfoStore.js";

import { useNavigate } from "react-router-dom";
import useMainCategories from "../hooks/useMainCategories";

const Navbar = () => {
  const userInfo = useUserInfoStore((state) => state.userInfo);
  const isAdmin = userInfo?.roles.includes("admin");
  const navigate = useNavigate();

  const { mainCategories, isLoading } = useMainCategories();

  if (isLoading) return null;

  return (
    <div className="flex justify-between items-center bg-white px-4 py-2 rounded-full">
      {/* Brand */}
      <div onClick={() => navigate("/")}>
        <h1 className="text-3xl font-bold font-lobster text-primary">QuadBite</h1>
      </div>

      {/* Nav link */}
      <ul className="flex items-center gap-8 text-secondary">
        {mainCategories
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((item) => (
            <li
              key={item.name}
              onClick={() => navigate(item.path)}
              className="hover:text-primary transition-all duration-300 cursor-pointer text-sm font-semibold"
            >
              {item.name}
            </li>
          ))}
      </ul>

      {/* Right */}
      <div className="flex gap-2 items-center">
        <div className="flex flex-col items-end">
          <p className="text-secondary text-xs md:text-sm font-semibold">{userInfo.name || userInfo.username}</p>
          <p className="text-gray-500 text-xs">{userInfo.email || "Chưa có email"}</p>
        </div>
        <div onClick={() => navigate("/user/account/profile")} className="cursor-pointer">
          <img src={userInfo.avatar_url} className="w-9 h-9 rounded-full border border-secondary" alt="" />
        </div>
        <Button variant="primary" size="medium" icon={<Handbag className="w-4 h-4" />}>
          Giỏ hàng
        </Button>

        {isAdmin && (
          <Button
            onClick={() => navigate("/staff/orders")}
            variant="secondary"
            size="medium"
            icon={<UserStar className="w-4 h-4" />}
          >
            Nhân viên
          </Button>
        )}

        {isAdmin && (
          <Button
            onClick={() => navigate("/admin")}
            variant="secondary"
            size="medium"
            icon={<UserStar className="w-4 h-4" />}
          >
            Quản trị
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
