import Button from "../../components/ui/Button";
import useUserInfoStore from "../../hooks/useUserInfoStore";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const clearUserInfo = useUserInfoStore((state) => state.clearUserInfo);
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <Button
        onClick={() => {
          clearUserInfo();
          navigate("/login");
        }}
      >
        Đăng xuất
      </Button>
    </div>
  );
};

export default ProfilePage;
