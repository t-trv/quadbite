import Title from "../../components/ui/Title";
import Button from "../../components/ui/Button";
import BorderWrapper from "../../components/ui/BorderWrapper";
import AddressCard from "../../components/ui/AddressCard";
import { ArrowLeftIcon, PlusIcon } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useUserInfoStore } from "../../hooks/useUserInfoStore";
import Loading from "../../components/ui/Loading";
import apiRequest from "../../utils/apiRequest";

const CheckoutPage = () => {
  // helper functions
  const navigate = useNavigate();
  const { userInfo } = useUserInfoStore();

  // states
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Call API lấy địa chỉ người nhận
  const { data: addresses, isLoading: isLoadingAddresses } = useQuery({
    queryKey: ["addresses", userInfo?.id],
    queryFn: async () => {
      const response = await apiRequest.get(`/addresses?userId=${userInfo?.id}`);
      return response.data.data;
    },
  });

  // Render loading
  if (isLoadingAddresses) return <Loading />;

  console.log(addresses);

  return (
    <div className="h-full bg-white p-4 rounded-3xl">
      <div className="flex items-center justify-between">
        <Title title="Chi tiết thanh toán" variant="secondary" />

        <Button
          variant="outline"
          size="small"
          icon={<ArrowLeftIcon className="w-4 h-4" />}
          onClick={() => navigate(-1)}
        >
          Quay lại trang trước
        </Button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-12 gap-4 py-4">
        <div className="col-span-6">
          <BorderWrapper>
            <Title title="Địa chỉ người nhận" variant="secondary" size="small" />

            {/* Danh sách địa chỉ */}
            <div className="flex flex-col gap-2 py-4">
              {addresses.map((address) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  selectedAddress={selectedAddress}
                  setSelectedAddress={setSelectedAddress}
                />
              ))}
            </div>
          </BorderWrapper>

          {/* Button thêm địa chỉ */}
          <div className="flex py-4">
            <Button variant="outline" size="small" icon={<PlusIcon className="w-4 h-4" />}>
              Thêm địa chỉ mới
            </Button>
          </div>
        </div>

        <div className="col-span-6">
          <div className="bg-white p-4 rounded-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
