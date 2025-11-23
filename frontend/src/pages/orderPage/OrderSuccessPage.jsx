import Title from "../../components/ui/Title";
import Button from "../../components/ui/Button";
import Loading from "../../components/ui/Loading";
import { ArrowLeftIcon, InfoIcon, CheckCircleIcon } from "lucide-react";

import useCheckoutStore from "../../hooks/useCheckoutStore";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BorderWrapper from "../../components/ui/BorderWrapper";
import apiRequest from "../../utils/apiRequest";
import { useQuery } from "@tanstack/react-query";
import formatCurrency from "../../utils/formatCurrency";
import toast from "react-hot-toast";

const OrderSuccessPage = () => {
  // states
  const { orderId } = useParams();
  const { clearCheckoutData } = useCheckoutStore();

  // helper functions
  const navigate = useNavigate();

  // fetch order data
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

  // Clear previous checkout data
  useEffect(() => {
    clearCheckoutData();
  }, []);

  // Render loading
  if (isLoadingOrder || !order || isError) {
    if (error) {
      toast.error(error.response.data.message);
      navigate("/");
    }

    return (
      <div className="h-120 relative">
        <Loading />
      </div>
    );
  }

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
    <div className="min-h-160 bg-white p-4 rounded-3xl animate-slide-in">
      {/* Buttons */}
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          size="small"
          icon={<InfoIcon className="w-4 h-4" />}
          onClick={() => navigate(`/user/orders`)}
        >
          Theo dõi đơn hàng
        </Button>

        <Button
          variant="outline"
          size="small"
          icon={<ArrowLeftIcon className="w-4 h-4" />}
          onClick={() => navigate("/")}
        >
          Quay lại trang chủ
        </Button>
      </div>

      {/* Content */}
      <div className="py-8 flex flex-col gap-8 items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center gap-4">
          <CheckCircleIcon className="w-20 h-20 text-primary" />
          <h1 className="text-2xl font-bold">Đơn hàng của bạn đã được tạo thành công</h1>
        </div>

        <BorderWrapper>
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
        </BorderWrapper>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
