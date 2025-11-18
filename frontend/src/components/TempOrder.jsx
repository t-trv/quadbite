import Title from "./ui/Title";
import MiniFoodCard from "./MiniFoodCard";

import formatCurrency from "../utils/formatCurrency";
import { useNavigate } from "react-router-dom";
import useCheckoutStore from "../hooks/useCheckoutStore";

const TempOrder = () => {
  const navigate = useNavigate();
  const { oderItems } = useCheckoutStore();
  const totalPrice = oderItems.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);

  return (
    <div className="p-4 bg-white rounded-3xl h-full flex flex-col">
      <Title title="Đơn hàng của bạn" variant="secondary" />

      <div className="py-4">
        <div className="flex flex-col gap-2 max-h-[calc(100vh-350px)] overflow-y-auto hide-scrollbar">
          {oderItems && oderItems.length > 0 ? (
            oderItems.map((item, index) => <MiniFoodCard key={index} item={item} />)
          ) : (
            <p className="text-secondary text-center text-sm py-4">Chưa có món ăn nào!</p>
          )}
        </div>
      </div>

      {oderItems && oderItems.length > 0 && (
        <div className="flex flex-col gap-4 mt-auto">
          <div className="">
            <div className="flex justify-between">
              <span>Tổng tiền (tạm tính):</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
          </div>

          <div>
            <button
              onClick={() => {
                navigate("/order");
              }}
              className={`w-full bg-primary text-white rounded-xl py-2 ${
                oderItems && oderItems.length > 0
                  ? "cursor-pointer hover:scale-105 transition-all duration-300 active:scale-95"
                  : "cursor-not-allowed opacity-50"
              }`}
            >
              Đặt hàng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TempOrder;
