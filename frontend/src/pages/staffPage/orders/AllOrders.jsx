import { CheckIcon, XIcon } from "lucide-react";
import Button from "../../../components/ui/Button";
import Title from "../../../components/ui/Title";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import SuccessfullyModal from "../../../components/modal/SuccessfullyModal";
import ModalWrapper from "../../../components/modal/ModalWrapper";

import { useState } from "react";
import formatCurrency from "../../../utils/formatCurrency";
import apiRequest from "../../../utils/apiRequest";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const AllOrders = ({ orders }) => {
  // query client
  const queryClient = useQueryClient();

  // states
  const [confirmModalData, setConfirmModalData] = useState({
    isOpen: false,
    title: null,
    message: null,
    orderId: null,
    orderStatusId: null,
  });
  const [successfullyModalData, setSuccessfullyModalData] = useState({
    isOpen: false,
    title: null,
    message: null,
  });

  // handlers
  const handleConfirmOrder = async (orderId, orderStatusId) => {
    try {
      const response = await apiRequest.put(`/orders/${orderId}`, { orderStatusId });

      if (response.data.status) {
        toast.success("Xác nhận đơn hàng thành công");
        setConfirmModalData({
          isOpen: false,
          title: null,
          message: null,
          orderId: null,
          orderStatusId: null,
        });
        setSuccessfullyModalData({
          isOpen: true,
          title: "Xác nhận đơn hàng thành công",
          message: "Đơn hàng đã được xác nhận thành công",
        });
        queryClient.invalidateQueries({ queryKey: ["staff/orders"] });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      {orders?.map((order) => (
        <div key={order.orderId} className="col-span-12">
          <div className="border border-gray-200 rounded-2xl p-4">
            {/* Content */}
            <div className="grid grid-cols-12 gap-4">
              {/* Food images */}
              <div className="col-span-6 pr-4 border-r border-gray-200">
                <Title title="Danh sách món đặt" size="large" />
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {order.orderItems.map((item) => (
                    <div className="flex items-center gap-2">
                      <div key={item.id} className="w-24 h-24 rounded-2xl border border-gray-200">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover rounded-2xl" />
                      </div>

                      <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-bold">{item.name}</h3>
                        <p className="text-sm text-gray-500">({item.variant})</p>
                        <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                        <p className="text-sm text-gray-500">Thành tiền: {formatCurrency(item.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order infor */}
              <div className="col-span-6 flex flex-col">
                {/*  */}
                <div className="pb-4 flex items-center justify-between">
                  <Title title="Thông tin đơn hàng" size="large" />

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500">{order.paymentMethod.name}</p>
                  </div>
                </div>

                {/* User infor */}
                <div>
                  <p className="text-sm text-gray-500">
                    Người nhận: <span>{order.address.receiptionName}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Số điện thoại: <span>{order.address.phone}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Địa chỉ: <span>{order.address.line}</span>
                  </p>
                </div>

                {/* Order infor */}
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Tình trạng: <span>{order.orderStatus.name}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Thanh toán: <span>{order.paymentStatus.name}</span>
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-end gap-2 py-4 mt-auto">
                  <Button
                    variant="outline"
                    size="small"
                    icon={<CheckIcon className="w-4 h-4" />}
                    onClick={() => {
                      setConfirmModalData({
                        isOpen: true,
                        title: "Xác nhận đơn hàng",
                        message: "Bạn có chắc chắn muốn xác nhận đơn hàng này không?",
                        orderId: order.orderId,
                        orderStatusId: "confirmed",
                      });
                    }}
                    /**
                     * Tắt nút duyệt khi
                     * 1. Phương thức thanh toán là internet banking và trạng thái thanh toán là đang chờ thanh toán -> chưa được duyệt
                     * 2. Trạng thái đơn hàng không phải là đang chờ duyệt -> không thể duyệt
                     */
                    disabled={
                      (order.paymentMethod.id === "internet_banking" && order.paymentStatus.id === "pending") ||
                      order.orderStatus.id !== "pending"
                    }
                  >
                    Xác nhận đơn hàng
                  </Button>
                  <Button
                    variant="outline"
                    size="small"
                    icon={<XIcon className="w-4 h-4" />}
                    onClick={() => {
                      setConfirmModalData({
                        isOpen: true,
                        title: "Hủy đơn hàng",
                        message: "Bạn có chắc chắn muốn hủy đơn hàng này không?",
                        orderId: order.orderId,
                        orderStatusId: "cancelled",
                      });
                    }}
                    disabled={order.orderStatus.id === "cancelled"}
                  >
                    Hủy đơn hàng
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Modals */}
      <ConfirmModal
        open={confirmModalData.isOpen}
        title={confirmModalData.title}
        message={confirmModalData.message}
        onConfirm={() => {
          handleConfirmOrder(confirmModalData.orderId, confirmModalData.orderStatusId);
        }}
        onCancel={() => {
          setConfirmModalData({
            isOpen: false,
            title: null,
            message: null,
            orderId: null,
            orderStatusId: null,
          });
        }}
      />
      <ModalWrapper
        open={successfullyModalData.isOpen}
        onClose={() => {
          setSuccessfullyModalData({
            isOpen: false,
            title: null,
            message: null,
          });
        }}
      >
        <SuccessfullyModal title={successfullyModalData.title} message={successfullyModalData.message} />
      </ModalWrapper>
    </div>
  );
};

export default AllOrders;
