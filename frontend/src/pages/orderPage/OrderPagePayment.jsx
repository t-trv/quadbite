import useCheckoutStore from "../../hooks/useCheckoutStore";

const OrderPagePayment = () => {
  const { paymentMethod, setPaymentMethod } = useCheckoutStore();

  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="payment"
          value="cod"
          className="w-4 h-4"
          checked={paymentMethod === "cod"}
          onChange={() => setPaymentMethod("cod")}
        />
        <span className="text-sm text-gray-500">Thanh toán khi nhận hàng</span>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="payment"
          value="internet_banking"
          className="w-4 h-4"
          checked={paymentMethod === "internet_banking"}
          onChange={() => setPaymentMethod("internet_banking")}
        />
        <span className="text-sm text-gray-500">Thanh toán bằng ví điện tử</span>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="payment"
          value="card"
          className="w-4 h-4"
          checked={paymentMethod === "card"}
          onChange={() => setPaymentMethod("card")}
        />
        <span className="text-sm text-gray-500">Thanh toán qua thẻ</span>
      </label>

      {paymentMethod === "card" && (
        <div className="grid grid-cols-2 gap-2 mt-4">
          <input
            type="text"
            placeholder="Nhập số thẻ"
            className="w-full rounded-lg py-2 px-4 outline-none border border-gray-300 h-12 text-sm"
          />
          <input
            type="text"
            placeholder="Nhập CVV"
            className="w-full rounded-lg py-2 px-4 outline-none border border-gray-300 h-12 text-sm"
          />
          <input
            type="text"
            placeholder="Nhập ngày hết hạn"
            className="w-full rounded-lg py-2 px-4 outline-none border border-gray-300 h-12 text-sm"
          />
          <input
            type="text"
            placeholder="Nhập tên chủ thẻ"
            className="w-full rounded-lg py-2 px-4 outline-none border border-gray-300 h-12 text-sm"
          />
        </div>
      )}
    </div>
  );
};

export default OrderPagePayment;
