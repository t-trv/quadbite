import Button from "./ui/Button";
import ModalWrapper from "./modal/ModalWrapper";

import formatCurrency from "../utils/formatCurrency";
import { useState } from "react";
import DetailBillModal from "./modal/DetailBillModal";

const OrderCard = ({ order }) => {
  const [isDetailBillModalOpen, setIsDetailBillModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-200">
      {/* Order status */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500 italic">(#{order.paymentMethod.name})</p>
          {order.paymentStatus.id === "pending" && order.paymentMethod.id === "internet_banking" && (
            <p className="text-sm text-primary cursor-pointer">Thanh toán qua ví điện tử</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500">{order.orderStatus.name}</p>
          <span className="text-sm text-gray-500">|</span>
          <p className="text-sm text-gray-500">{order.paymentStatus.name}</p>
        </div>
      </div>

      {/* Order items */}
      <div className="grid grid-cols-12 gap-4 items-center py-4 border-t border-b border-gray-200 mt-4">
        {order.orderItems.map((item) => (
          <div key={item.id} className="col-span-4 flex items-center gap-2">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-24 h-24 rounded-xl border border-secondary object-cover"
            />
            <div>
              <div className="flex items-center gap-1">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-sm text-gray-500">({item.variant})</p>
              </div>
              <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
              <p className="text-sm text-gray-500">Thành tiền: {formatCurrency(item.price)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Order total price */}
      <div className="flex items-center justify-end pt-8">
        <p>
          <span>Thành tiền:</span>{" "}
          <span className="font-semibold text-primary text-xl">{formatCurrency(order.totalPrice)}</span>
        </p>
      </div>

      <div className="flex items-center justify-between gap-2  mt-8">
        <p
          onClick={() => {
            setIsDetailBillModalOpen(true);
          }}
          className="text-sm text-gray-500 italic underline cursor-pointer"
        >
          Xem chi tiết hóa đơn
        </p>

        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" size="medium">
            <span>Yêu cầu hỗ trợ</span>
          </Button>
          <Button variant="primary" size="medium">
            <span>Mua lại đơn hàng này</span>
          </Button>
        </div>
      </div>

      {/* Modals */}
      <ModalWrapper open={isDetailBillModalOpen} onClose={() => setIsDetailBillModalOpen(false)}>
        <DetailBillModal orderId={order.orderId} />
      </ModalWrapper>
    </div>
  );
};

export default OrderCard;
