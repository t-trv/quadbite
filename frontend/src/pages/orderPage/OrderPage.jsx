import Title from "../../components/ui/Title";
import Table from "../../components/table/Table";
import Button from "../../components/ui/Button";
import { MinusIcon, PlusIcon, Bookmark, ArrowLeftIcon, TrashIcon, ChartNoAxesGantt } from "lucide-react";
import AddressCard from "../../components/ui/AddressCard";
import BorderWrapper from "../../components/ui/BorderWrapper";
import Loading from "../../components/ui/Loading";
import TextArea from "../../components/ui/TextArea";
import OrderPagePayment from "./OrderPagePayment";

// modals
import AddAddressModal from "../../components/modal/address/AddAddressModal";
import ModalWrapper from "../../components/modal/ModalWrapper";

import { useNavigate } from "react-router-dom";
import formatCurrency from "../../utils/formatCurrency";
import useCheckoutStore from "../../hooks/useCheckoutStore";
import orderPreview from "../../utils/orderPreview";
import apiRequest from "../../utils/apiRequest";
import { useUserInfoStore } from "../../hooks/useUserInfoStore";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const OrderPage = () => {
  // states
  const { userInfo } = useUserInfoStore();
  const {
    orderItems,
    couponCode,
    addressId,
    paymentMethod,
    note,

    setAddressId,
    setCouponCode,
    setPaymentMethod,
    setShippingTime,
    shippingTime,
    setNote,

    removeOderItem,
    incrementOderItemQuantity,
    decrementOderItemQuantity,
  } = useCheckoutStore();
  const [userCouponCode, setUserCouponCode] = useState(null);
  const [orderPreviewData, setOrderPreviewData] = useState(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [addAddressModal, setAddAddressModal] = useState({ isOpen: false });

  // Call API lấy địa chỉ người nhận
  const { data: addresses, isLoading: isLoadingAddresses } = useQuery({
    queryKey: ["addresses", userInfo?.id],
    queryFn: async () => {
      const response = await apiRequest.get(`/addresses?userId=${userInfo?.id}`);
      return response.data.data;
    },
  });

  // helper functions
  const navigate = useNavigate();

  // configs
  const columns = [
    {
      key: "imageUrl",
      label: "Thông tin món ăn",
      render: (item) => (
        <div className="flex items-center gap-4">
          <img src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
          <div>
            <h3 className="text-xl font-semibold">
              {item.name} <span className="text-sm font-medium text-gray-500">({item.variant.name})</span>
            </h3>
            <p className="text-sm text-gray-500">{item.shortDescription}</p>
          </div>
        </div>
      ),
    },
    {
      key: "quantity",
      label: "Số lượng",
      render: (item) => (
        <div className="p-1 border border-secondary rounded-3xl w-fit flex items-center gap-4">
          <button
            className={`p-1 ${item.quantity <= 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            onClick={() => decrementOderItemQuantity(item)}
            disabled={item.quantity <= 1}
          >
            <MinusIcon className="w-4 h-4" />
          </button>
          <span>{item.quantity}</span>
          <button className="p-1 cursor-pointer" onClick={() => incrementOderItemQuantity(item)}>
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
      ),
    },
    {
      key: "totalPrice",
      label: "Thành tiền",
      render: (item) => (
        <span className="text-base font-semibold ">
          {formatCurrency((Number(item.price) + Number(item.variant.price_adjust)) * item.quantity)}
        </span>
      ),
    },
    {
      key: "action",
      label: "Hành động",
      render: (item) => (
        <Button
          variant="ghost"
          size="small"
          icon={<TrashIcon className="w-4 h-4" />}
          onClick={() => removeOderItem(item)}
        ></Button>
      ),
    },
  ];

  // refecth order preview when order items or coupon code changes
  useEffect(() => {
    if (orderItems.length < 1) navigate("/main-food");

    const fetchOrderPreview = async () => {
      const result = await orderPreview();
      setOrderPreviewData(result);
    };
    fetchOrderPreview();
  }, [orderItems, couponCode]);

  // handle functions
  const handleOrder = async () => {
    if (!addressId) return toast.error("Vui lòng chọn địa chỉ người nhận");
    if (!paymentMethod) return toast.error("Vui lòng chọn phương thức thanh toán");

    setIsCreatingOrder(true);

    const data = {
      orderItems,
      couponCode,
      addressId,
      paymentMethod,
      shippingTime,
      note,
    };

    try {
      const response = await apiRequest.post("/orders", data);

      if (response.data.status) {
        toast.success("Đơn hàng của bạn đã được tạo thành công");

        if (paymentMethod === "cod") return navigate(`/order/success/${response.data.data.id}`);

        if (paymentMethod === "internet_banking") return navigate("/order/checkout/qr");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setIsCreatingOrder(false);
    }
  };

  // render loading
  if (isLoadingAddresses)
    return (
      <div className="h-120 relative">
        <Loading />
      </div>
    );

  return (
    <div className="h-full bg-white p-4 rounded-3xl">
      <div className="flex items-center justify-between">
        <Title title="Thông tin chi tiết đơn hàng" variant="secondary" />

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
      <div className="py-4 grid grid-cols-12 gap-4">
        <div className="col-span-8 flex flex-col gap-4">
          <Table data={orderItems} columns={columns} />

          <BorderWrapper>
            <Title title="Thông tin thanh toán" variant="secondary" size="small" />

            <div className="p-4">
              <OrderPagePayment />
            </div>
          </BorderWrapper>

          <TextArea
            placeholder="Nhắc nhớ tới nhà hàng"
            rows={4}
            value={note || ""}
            onChange={(e) => setNote(e.target.value)}
          />

          {/* CTA */}
          <Button variant="outline" size="medium" icon={<Bookmark className="w-4 h-4" />}>
            Lưu vào giỏ hàng
          </Button>
        </div>

        <div className="col-span-4">
          <div className="flex flex-col gap-4">
            <BorderWrapper>
              <Title title="Địa chỉ người nhận" variant="secondary" size="small" />

              {/* Danh sách địa chỉ */}
              <div className="flex flex-col gap-2 py-4">
                {addresses.map((address) => (
                  <AddressCard key={address.id} address={address} addressId={addressId} />
                ))}
              </div>

              <div className="flex items-center justify-end gap-2">
                {addresses.length < 3 && (
                  <Button
                    variant="outline"
                    size="small"
                    icon={<PlusIcon className="w-4 h-4" />}
                    onClick={() => setAddAddressModal({ isOpen: true })}
                  >
                    Thêm địa chỉ mới
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="small"
                  icon={<ChartNoAxesGantt className="w-4 h-4" />}
                  onClick={() => navigate("/user/account/profile")}
                >
                  Quản lý địa chỉ
                </Button>
              </div>
            </BorderWrapper>
          </div>

          <div className="border border-gray-300 rounded-3xl p-4 shadow-md mt-4">
            <div className="flex flex-col gap-4 h-full">
              <Title title="Số tiền cần thanh toán" variant="secondary" />

              {/* Mã giảm giá */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Nhập mã giảm giá"
                  className="flex-1 rounded-3xl py-2 px-4 outline-none border border-secondary h-auto text-sm"
                  defaultValue={couponCode || ""}
                  onChange={(e) => setUserCouponCode(e.target.value)}
                />
                <Button
                  variant="secondary"
                  size="medium"
                  className="rounded-3xl py-2 px-4 h-auto"
                  onClick={() => setCouponCode(userCouponCode)}
                >
                  <span>Áp dụng</span>
                </Button>
              </div>

              {/* Thông tin tổng tiền */}
              <div className="grid grid-cols-2">
                <span className="text-lg  text-secondary">Phụ phí</span>
                <span className="text-lg font-semibold text-secondary text-right">{formatCurrency(0)}</span>

                <span className="text-lg  text-secondary">Giảm giá</span>
                <span className="text-lg font-semibold text-secondary text-right">
                  -{formatCurrency(orderPreviewData?.totalDiscount || 0)}
                </span>

                <span className="text-lg  text-secondary">Phí vận chuyển</span>
                <span className="text-lg font-semibold text-secondary text-right">
                  {formatCurrency(orderPreviewData?.shippingFee || 0)}
                </span>
              </div>
              <div className="py-4 border-t border-gray-300 grid grid-cols-2">
                <span className="text-lg font-semibold text-secondary">Tổng tiền</span>
                <span className="text-lg font-semibold text-secondary text-right">
                  {formatCurrency(orderPreviewData?.totalPrice || 0)}
                </span>
              </div>

              {/* Thanh toán */}
              <div className="flex items-center gap-2 mt-auto ">
                <Button
                  onClick={() => handleOrder()}
                  variant="secondary"
                  size="medium"
                  width="100%"
                  disabled={isCreatingOrder}
                >
                  {isCreatingOrder ? "Đang tạo đơn hàng..." : "Thanh toán ngay"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ModalWrapper open={addAddressModal.isOpen} onClose={() => setAddAddressModal({ isOpen: false })}>
        <AddAddressModal onClose={() => setAddAddressModal({ isOpen: false })} />
      </ModalWrapper>
    </div>
  );
};

export default OrderPage;
