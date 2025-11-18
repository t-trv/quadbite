import { customer1, customer2, customer3 } from "../../assets/customer";
import { homeImage } from "../../assets/home";
import { StarIcon } from "lucide-react";

import Button from "../../components/ui/Button.jsx";
import { Handbag } from "lucide-react";

import { useNavigate } from "react-router-dom";
import useUserInfoStore from "../../hooks/useUserInfoStore.js";

const HomePage = () => {
  const userInfo = useUserInfoStore((state) => state.userInfo);
  const clearUserInfo = useUserInfoStore((state) => state.clearUserInfo);
  const navigate = useNavigate();

  return (
    <div className="container mx-auto">
      {/* Header */}
      <div className="sticky top-0 left-0 right-0 z-50">
        <div className="container mx-auto flex justify-between py-2 md:py-4 items-center ">
          <h2 className="text-xl md:text-4xl font-lobster font-bold text-primary">QuadBite</h2>

          <ul className="flex gap-4 md:gap-8 text-secondary text-xs md:text-sm xl:text-base">
            <li
              onClick={() => navigate("/main-food")}
              className="hover:text-primary transition-all duration-300 cursor-pointer"
            >
              Trải nghiệm
            </li>
            <li className="hover:text-primary transition-all duration-300 cursor-pointer">Đánh giá</li>
            <li className="hover:text-primary transition-all duration-300 cursor-pointer">Dịch vụ</li>
          </ul>

          <div className="flex gap-1 items-center">
            {userInfo ? (
              <div className="hidden md:flex gap-2 items-center">
                <Button
                  variant="ghost small"
                  onClick={() => {
                    clearUserInfo();
                    navigate("/login");
                  }}
                >
                  Đăng xuất
                </Button>
                <Button variant="primary small" icon={<Handbag className="w-4 h-4" />}>
                  Giỏ hàng
                </Button>
              </div>
            ) : (
              <div className="flex gap-1">
                <div className="hidden md:block">
                  <Button variant="ghost medium" onClick={() => navigate("/register")}>
                    Đăng ký
                  </Button>
                </div>
                <Button variant="primary medium" onClick={() => navigate("/login")}>
                  Đăng nhập
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-8">
        <div className="grid grid-cols-12">
          {/* Left Side */}
          <div className="col-span-5">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-md text-secondary px-4 py-2 bg-skin rounded-xl">Miễn phí giao hàng</span>
                <span className="text-xs font-md text-secondary px-4 py-2 bg-skin rounded-xl">Miễn phí đổi trả</span>
              </div>

              <div className="flex flex-col gap-6">
                <h1 className="text-4xl md:text-6xl font-bold text-secondary">
                  Nhận những ưu đãi cực lớn đến từ{" "}
                  <span className="text-5xl md:text-7xl font-lobster text-primary">QuadBite</span>
                </h1>
                <p className="text-sm md:text-base text-secondary max-w-md">
                  Công việc của chúng tôi là mang những món ăn ngon và chất lượng đến cho bạn. Chúng tôi luôn cố gắng
                  mang đến cho bạn trải nghiệm tuyệt vời nhất.
                </p>
                <div className="flex gap-2">
                  <Button variant="primary medium">Đặt hàng ngay</Button>
                  <Button variant="outline medium">Xem thêm</Button>
                </div>
              </div>

              <div className="flex gap-2 relative mt-40">
                <div className="flex gap-2">
                  <img src={customer1} alt="customer" className="w-12 h-12 rounded-full absolute top-0 left-0" />
                  <img src={customer2} alt="customer" className="w-12 h-12 rounded-full absolute top-0 left-5" />
                  <img src={customer3} alt="customer" className="w-12 h-12 rounded-full absolute top-0 left-10" />
                </div>

                <div className="text-sm text-secondary ml-24">
                  <p className="text-base text-secondary font-semibold">Khách hàng của chúng tôi</p>
                  <div className="flex gap-2 items-center">
                    <StarIcon className="w-4 h-4 text-yellow-500" />
                    <span>4,8k</span>
                    <span>(36k đánh giá)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="col-span-7 flex justify-center">
            <div className="w-160 h-160">
              <img src={homeImage} alt="home" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
};

export default HomePage;
