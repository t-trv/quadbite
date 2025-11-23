import BorderWrapper from "../ui/BorderWrapper";
import Title from "../ui/Title";
import Button from "../ui/Button";
import formatCurrency from "../../utils/formatCurrency";
import Loading from "../ui/Loading";
import apiRequest from "../../utils/apiRequest";

import { useQuery } from "@tanstack/react-query";

const DetailBillModal = ({ orderId }) => {
  // Call API lấy đơn hàng
  const {
    data: order,
    isLoading: isLoadingOrder,
    isError,
    error,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const response = await apiRequest.get(`/orders/${orderId}`);
      return response.data.data;
    },
    enabled: !!orderId,
    retry: false,
  });

  if (isLoadingOrder)
    return (
      <div className="h-100 relative bg-white w-100 rounded-3xl">
        <Loading title="Đang tải hóa đơn..." />
      </div>
    );
  if (isError) return <div className="h-100 relative bg-white w-100 rounded-3xl">Error: {error.message}</div>;

  // configs
  const inforRows = [
    {
      key: "orderId",
      label: "Mã đơn hàng",
      value: order.orderId,
    },
    {
      key: "userName",
      label: "Tên người nhận",
      value: order.address.receiptionName,
    },
    {
      key: "userPhone",
      label: "Số điện thoại",
      value: order.address.phone,
    },
    {
      key: "userAddress",
      label: "Địa chỉ",
      value: order.address.addressLine,
    },
    {
      key: "paymentMethod",
      label: "Phương thức thanh toán",
      value: order.paymentMethod.name,
    },
    {
      key: "paymentStatus",
      label: "Trạng thái thanh toán",
      value: order.paymentStatus.name,
    },
  ];
  return (
    <div className="p-8 rounded-full bg-white">
      <div className="flex flex-col gap-4 min-w-120 p-4">
        <div className="flex items-center justify-between w-full border-b border-gray-300 pb-2">
          <Title title="Thông tin hóa đơn" variant="secondary" size="medium" weight="bold" />
          <span className="text-gray-500 text-xl font-bold">(#{order.orderId})</span>
        </div>

        <div className="flex flex-col gap-2">
          {/* invoices rows */}
          {inforRows.map((row) => (
            <div key={row.key} className="flex items-center justify-between w-full">
              <span>{row.label}:</span>
              <span>{row.value}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between w-full mt-4">
          <div className="flex items-center justify-between w-full border-b border-gray-300 pb-1">
            <span className="font-bold text-lg">Món ăn</span>
            <span className="font-bold text-lg">Thành tiền</span>
          </div>

          <div className="flex flex-col gap-2 mt-4 w-full">
            {order.orderItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                  <span>{item.name}</span>
                  <span className="text-gray-500 text-sm">
                    ({item.variant}) * {item.quantity}
                  </span>
                </div>
                <span>{formatCurrency(item.price)}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between w-full mt-4 border-t border-gray-300 pt-2">
            <span className="font-bold text-lg">Tổng tiền:</span>
            <span className="font-bold text-lg">{formatCurrency(order.totalPrice)}</span>
          </div>

          <div className="mt-8 w-full">
            <Button variant="secondary" size="large" width="100%">
              <span>Tải xuống hóa đơn</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBillModal;
