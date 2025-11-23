import Loading from "../../../components/ui/Loading";
import AllOrders from "./AllOrders";
import Title from "../../../components/ui/Title";
import Button from "../../../components/ui/Button";
import { PlusIcon } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../../utils/apiRequest";
import { useState } from "react";
import { useEffect } from "react";

const StaffOrdersPage = () => {
  // states
  const [selectedTab, setSelectedTab] = useState("all");
  const [filteredOrders, setFilteredOrders] = useState([]);

  // fetch orders data
  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["staff/orders"],
    queryFn: async () => {
      const response = await apiRequest.get("/orders");
      return response.data.data.reverse(); // reverse đơn mới nhất lên
    },
    enabled: true,
    refetchOnMount: true,
  });

  // configs
  const staffOrderTabs = [
    { key: "all", label: "Tất cả", value: "all" },
    { key: "pending", label: "Chờ xác nhận", value: "pending" },
    { key: "confirmed", label: "Đã xác nhận", value: "confirmed" },
    { key: "cancelled", label: "Đã hủy", value: "cancelled" },
  ];

  useEffect(() => {
    if (selectedTab === "all") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((order) => order.orderStatus.id === selectedTab));
    }
  }, [selectedTab, orders]);

  // Render loading
  if (isLoading) return <Loading />;
  if (isError) return <div className="text-red-500">{error.message}</div>;

  return (
    <div className="bg-white mt-4 p-4 rounded-3xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-200">
        <Title title="Danh sách đơn hàng" size="large" />
        <Button variant="outline" size="small" icon={<PlusIcon className="w-4 h-4" />}>
          Thêm đơn hàng tại quầy
        </Button>
      </div>

      {/* Content */}
      <div className="py-2 flex items-center gap-2">
        {staffOrderTabs.map((tab) => (
          <button
            key={tab.key}
            className={`px-3 py-1 border rounded-lg transition-all duration-300 cursor-pointer text-sm ${
              selectedTab === tab.key
                ? "bg-secondary border-secondary text-white"
                : "hover:border-secondary hover:text-secondary"
            }`}
            onClick={() => setSelectedTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {selectedTab === "all" && <AllOrders orders={filteredOrders} />}
      {selectedTab === "pending" && <AllOrders orders={filteredOrders} />}
      {selectedTab === "confirmed" && <AllOrders orders={filteredOrders} />}
      {selectedTab === "cancelled" && <AllOrders orders={filteredOrders} />}
    </div>
  );
};

export default StaffOrdersPage;
