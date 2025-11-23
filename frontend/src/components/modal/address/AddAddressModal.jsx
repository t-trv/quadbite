// components
import Title from "../../ui/Title";
import DynamicField from "../../field/DynamicField";
import Button from "../../ui/Button";
import { PlusIcon } from "lucide-react";

// hooks
import { useForm } from "react-hook-form";
import { useUserInfoStore } from "../../../hooks/useUserInfoStore";
import apiRequest from "../../../utils/apiRequest";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";

const AddAddressModal = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const { userInfo } = useUserInfoStore();
  const queryClient = useQueryClient();
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  // configs
  const addressFields = [
    {
      key: "addressName",
      label: "Tên địa chỉ",
      value: "",
      type: "input",
      colSpan: 2,
      validation: {
        required: "Tên địa chỉ là bắt buộc",
      },
    },
    {
      key: "receiptionName",
      label: "Tên người nhận",
      value: "",
      type: "input",
      colSpan: 2,
      validation: {
        required: "Tên người nhận là bắt buộc",
      },
    },
    {
      key: "addressLine",
      label: "Địa chỉ chi tiết",
      value: "",
      type: "input",
      colSpan: 4,
      validation: {
        required: "Địa chỉ chi tiết là bắt buộc",
      },
    },
    {
      key: "phone",
      label: "Số điện thoại",
      value: "",
      type: "input",
      colSpan: 4,
      validation: {
        required: "Số điện thoại là bắt buộc",
      },
    },
    {
      key: "city",
      label: "Thành phố",
      value: "",
      type: "input",
      colSpan: 2,
      validation: {
        required: "Thành phố là bắt buộc",
      },
    },
    {
      key: "district",
      label: "Quận/Huyện",
      value: "",
      type: "input",
      colSpan: 2,
      validation: {
        required: "Quận/Huyện là bắt buộc",
      },
    },
  ];

  // handle functions
  const handleAddAddress = async (data) => {
    try {
      setIsAddingAddress(true);
      const response = await apiRequest.post("/addresses", {
        ...data,
        userId: userInfo?.id,
      });
      if (response.data.status) {
        toast.success("Thêm địa chỉ mới thành công");
        queryClient.invalidateQueries({ queryKey: ["addresses", userInfo?.id] });
        onClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Thêm địa chỉ mới thất bại");
      console.log(error);
    } finally {
      setIsAddingAddress(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-4">
        <Title title="Thêm địa chỉ mới" variant="secondary" size="medium" weight="bold" />
      </div>

      <form className="grid grid-cols-4 gap-4" onSubmit={handleSubmit(handleAddAddress)}>
        {addressFields.map((field) => (
          <DynamicField key={field.key} field={field} errors={errors} control={control} />
        ))}

        <div className="col-span-4 flex items-center justify-end gap-2 mt-4">
          <Button
            variant="save"
            size="medium"
            icon={<PlusIcon className="w-4 h-4" />}
            type="submit"
            disabled={isAddingAddress}
          >
            {isAddingAddress ? "Đang thêm địa chỉ mới..." : "Thêm địa chỉ mới"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddAddressModal;
