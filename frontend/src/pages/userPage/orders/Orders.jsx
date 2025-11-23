import Title from "../../../components/ui/Title";
import AllOrders from "./orderTabs/AllOrders";

import { useState } from "react";
import apiRequest from "../../../utils/apiRequest";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/ui/Loading";
import { useUserInfoStore } from "../../../hooks/useUserInfoStore";

const Orders = () => {
  // states
  const [selectedTab, setSelectedTab] = useState("all");
  const { userInfo } = useUserInfoStore();

  // fetch orders data
  const {
    data: orders,
    isLoading: isLoadingOrders,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders", userInfo?.id],
    queryFn: async () => {
      const response = await apiRequest.get(`/users/${userInfo?.id}/orders`);
      return response.data.data.reverse(); // reverse đơn mới nhất lên
    },
  });

  // Render loading
  if (isLoadingOrders)
    return (
      <div className="h-120 relative">
        <Loading />
      </div>
    );
  if (isError) return <div className="text-red-500">{error.message}</div>;

  // configs
  const orderTabs = [
    {
      key: "all",
      label: "Tất cả",
      value: "all",
      component: <AllOrders orders={orders} />,
    },
    {
      key: "pending",
      label: "Chờ xác nhận",
      value: "pending",
    },
  ];

  console.log(orders);

  return (
    <div className="bg-white p-8 rounded-3xl h-full animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-200">
        <Title title="Danh sách đơn hàng" size="extraLarge" />
      </div>

      <div className="py-2 flex items-center gap-2">
        {orderTabs.map((tab) => (
          <button
            key={tab.key}
            className={`px-3 py-1 border rounded-lg transition-all duration-300 cursor-pointer text-sm
                      ${
                        selectedTab === tab.key
                          ? "bg-secondary border-secondary text-white"
                          : "hover:border-secondary hover:text-secondary"
                      }
            `}
            onClick={() => setSelectedTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {orderTabs.find((tab) => tab.key === selectedTab)?.component}
    </div>
  );
};

export default Orders;
