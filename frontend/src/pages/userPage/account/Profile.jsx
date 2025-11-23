import Title from "../../../components/ui/Title";

import { Controller, useForm } from "react-hook-form";
import useUserInfoStore from "../../../hooks/useUserInfoStore";
import apiRequest from "../../../utils/apiRequest";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { HardDriveIcon, Loader2 } from "lucide-react";

const Profile = () => {
  const { userInfo, setUserInfo } = useUserInfoStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const labelClassname = "text-right";
  const wrapperClassname = "grid grid-cols-2 gap-8 items-center";

  const onSubmit = async (data) => {
    console.log(data);

    try {
      setIsLoading(true);
      const res = await apiRequest.put(`/users/${userInfo.id}`, data);

      if (res.data.status) {
        toast.success("Cập nhật thông tin thành công");
        setUserInfo(res.data.data);
      } else {
        toast.error("Cập nhật thông tin không thành công");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl h-full animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-200">
        <Title title="Hồ sơ cá nhân" size="extraLarge" />
      </div>

      {/* Content */}
      <div className="grid grid-cols-12 py-8">
        {/* Info */}
        <form
          className="col-span-6 flex flex-col gap-8 items-center justify-center border-r border-gray-200"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={wrapperClassname}>
            <p className={labelClassname}>Tên đăng nhập:</p>
            <p>{userInfo.username}</p>
          </div>

          <div className={wrapperClassname}>
            <label className={labelClassname}>Tên:</label>
            <Controller
              name="name"
              control={control}
              rules={{
                minLength: { value: 6, message: "Ít nhất 6 ký tự" },
                maxLength: { value: 30, message: "Tối đa 30 ký tự" },
              }}
              render={({ field, formState: { errors } }) => (
                <div>
                  <input
                    type="text"
                    className="border border-secondary px-4 py-2 rounded-xl"
                    placeholder={`${userInfo.name || "Chưa có tên"}`}
                    {...field}
                  />
                  {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>
              )}
            />
          </div>

          <div className={wrapperClassname}>
            <label className={labelClassname}>Email:</label>
            <Controller
              name="email"
              control={control}
              rules={{
                pattern: { value: /^\S+@\S+$/, message: "Email không hợp lệ" },
              }}
              render={({ field, formState: { errors } }) => (
                <div>
                  <input
                    type="text"
                    className="border border-secondary px-4 py-2 rounded-xl"
                    placeholder={`${userInfo.email || "Chưa có email"}`}
                    {...field}
                  />
                  {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
              )}
            />
          </div>

          <div className={wrapperClassname}>
            <label className={labelClassname}>Số điện thoại:</label>
            <Controller
              name="phone"
              control={control}
              rules={{
                pattern: { value: /^\d{10}$/, message: "Số điện thoại không hợp lệ" },
              }}
              render={({ field, formState: { errors } }) => (
                <div>
                  <input
                    type="text"
                    className="border border-secondary px-4 py-2 rounded-xl"
                    placeholder={`${userInfo.phone || "Chưa có số điện thoại"}`}
                    {...field}
                  />
                  {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                </div>
              )}
            />
          </div>

          <div className={wrapperClassname}>
            <div></div>
            <div className="flex items-center justify-end w-full">
              <button type="submit" className="bg-secondary text-white px-4 py-2 rounded-xl" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span> Đang cập nhật...</span>
                  </div>
                ) : (
                  "Cập nhật"
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Avatar */}
        <div className="col-span-6 flex flex-col gap-4 items-center justify-center">
          <img src={userInfo.avatar_url} alt="" className="w-60 h-60 rounded-full object-cover" />
          <div className="flex items-center justify-center w-full gap-2">
            <Controller
              name="avatar_url"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  className="border border-secondary px-4 py-2 rounded-xl"
                  placeholder={`${userInfo.avatar_url || "Chưa có ảnh đại diện"}`}
                  {...field}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
