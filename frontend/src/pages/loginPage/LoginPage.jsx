import { Link, useNavigate } from "react-router-dom";

import { loginArt2 } from "../../assets/loginArts";
import { googleIcon } from "../../assets/socials";
import { facebookIcon } from "../../assets/socials";

import apiRequest from "../../utils/apiRequest";
import toast from "react-hot-toast";
import useUserInfoStore from "../../hooks/useUserInfoStore";

const LoginPage = () => {
  const navigate = useNavigate();
  const setUserInfo = useUserInfoStore((state) => state.setUserInfo);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await apiRequest.post("/auth/login", {
        username: data.username,
        password: data.password,
      });

      if (response.data.status) {
        toast.success("Đăng nhập thành công");
        setUserInfo(response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="h-screen bg-white">
      {/* Container */}
      <div className="container mx-auto min-h-screen flex justify-center items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full h-screen py-4">
          {/* Left content */}
          <div className="order-2 lg:order-1 flex flex-col justify-center items-center">
            <div className="max-w-[388px] w-full">
              {/* Title */}
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2 text-[#1F41BB]">Đăng nhập</h1>
                <p className="text-xl font-semibold">
                  Chào mừng bạn quay trở lại với
                  <span className="text-primary font-bold font-lobster text-3xl"> QuadBite</span>
                </p>
              </div>

              {/* Form */}
              <form action="" onSubmit={handleSubmit}>
                <div className="flex flex-col mb-4">
                  <input
                    className="border border-gray-300 rounded-xl p-3 focus:outline-[#1F41BB] bg-[#F7FBFF]"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Tên đăng nhập"
                    tabIndex={1}
                    required
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <input
                    className="border border-gray-300 rounded-xl p-3 focus:outline-[#1F41BB] bg-[#F7FBFF]"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Mật khẩu"
                    tabIndex={2}
                    required
                  />
                </div>
                <div className="flex justify-end mb-4">
                  <Link to="/login" className="text-md font-semibold text-blue-700">
                    Quên mật khẩu?
                  </Link>
                </div>
                <button
                  className="bg-[#162D3A] text-white px-4 py-4 rounded-xl w-full 
                  cursor-pointer hover:scale-105 transition-all duration-300 active:scale-95 select-none"
                  type="submit"
                >
                  <span tabIndex={3}>Đăng nhập</span>
                </button>
              </form>

              {/* Social login */}
              <div className=" mt-16 ">
                <div className="flex items-center gap-2 mb-8">
                  <div className="border-t border-gray-300 flex-1"></div>
                  <span className="text-sm">Or</span>
                  <div className="border-t border-gray-300 flex-1"></div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center justify-center gap-2 bg-[#F3F9FA] cursor-pointer hover:scale-105 transition-all duration-300 active:scale-95 select-none rounded-xl p-4">
                    <img src={googleIcon} alt="google" className="w-6 h-6" />
                    <span>Đăng nhập với Google</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 bg-[#F3F9FA] cursor-pointer hover:scale-105 transition-all duration-300 active:scale-95 select-none rounded-xl p-4">
                    <img src={facebookIcon} alt="google" className="w-6 h-6" />
                    <span>Đăng nhập với Facebook</span>
                  </div>
                </div>
              </div>

              {/* Have no account */}
              <div className="flex justify-center items-center mt-8">
                <p>
                  Bạn chưa có tài khoản?{" "}
                  <button onClick={() => navigate("/register")} className="text-blue-700 font-semibold cursor-pointer">
                    Đăng ký
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="order-1 lg:order-2 mx-8 lg:max-w-full max-h-full">
            <div
              className="w-full h-full rounded-3xl"
              style={{
                backgroundImage: `url(${loginArt2})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
