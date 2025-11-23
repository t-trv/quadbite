import Button from "../../components/ui/Button";
import { ShoppingCart, UserIcon, Bookmark, Lock, LogOutIcon } from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { useUserInfoStore } from "../../hooks/useUserInfoStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import apiRequest from "../../utils/apiRequest";
import clearLocalStorage from "../../utils/clearLocalStorage";

const UserSidebar = () => {
  const { userInfo, clearUserInfo } = useUserInfoStore();
  const navigate = useNavigate();

  const [selectedSidebarItem, setSelectedSidebarItem] = useState();
  const [selectedChildItem, setSelectedChildItem] = useState();

  // configs
  const sidebarItems = [
    {
      key: "account",
      label: "Tài khoản của tôi",
      icon: <UserIcon className="w-5 h-5" />,
      children: [
        {
          key: "profile",
          path: "/user/account/profile",
          label: "Hồ sơ cá nhân",
        },
        {
          key: "password",
          path: "/user/account/password",
          label: "Đổi mật khẩu",
        },
      ],
    },

    {
      key: "orders",
      label: "Đơn hàng",
      icon: <ShoppingCart className="w-5 h-5" />,
      children: [
        {
          key: "orders",
          path: "/user/orders",
          label: "Danh sách đơn hàng",
        },
      ],
    },
  ];

  // handlers
  const handleLogout = async () => {
    try {
      const response = await apiRequest.post("/auth/logout");
      if (response.data.status) {
        clearUserInfo();
        clearLocalStorage();
        navigate("/login");
        toast.success("Đăng xuất thành công");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-4 min-h-160 relative flex-col">
      <div className="flex flex-col gap-2 h-full">
        {/* Avatar & Name */}
        <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border border-secondary">
            <img src={userInfo.avatar_url} alt="" className="w-full h-full" />
          </div>

          <div>
            <p className="text-base font-semibold text-secondary">{userInfo.name || userInfo.username}</p>
            <p
              className="text-sm font-semibold text-gray-500 cursor-pointer"
              onClick={() => navigate("/user/account/profile")}
            >
              Sửa thông tin
            </p>
          </div>
        </div>

        {/* Sidebar Items */}
        <div className="flex flex-col gap-4 py-4">
          {sidebarItems.map((item) => (
            <div key={item.key}>
              <div
                onClick={() => {
                  setSelectedSidebarItem(item.key);
                  setSelectedChildItem(item.children[0].key);
                  navigate(item.children[0].path);
                }}
                className="flex items-center gap-2 cursor-pointer"
              >
                {item.icon}
                <p className="text-base font-semibold">{item.label}</p>
              </div>

              {/* Children items */}
              {item.children && selectedSidebarItem === item.key && (
                <div className="flex flex-col mt-2 animate-slide-in">
                  {item.children.map((child) => (
                    <div
                      key={child.key}
                      onClick={() => {
                        setSelectedChildItem(child.key);
                        navigate(child.path);
                      }}
                      className={`flex items-center gap-2 px-8 py-2 cursor-pointer rounded-xl transition-all duration-300
                        ${selectedChildItem === child.key ? "text-primary" : "hover:text-gray-500"}
                        `}
                    >
                      <p className="text-sm font-semibold">{child.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-auto">
          <Button
            variant="outline"
            size="small"
            icon={<LogOutIcon className="w-4 h-4" />}
            onClick={() => {
              handleLogout();
            }}
          >
            Đăng xuất
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
