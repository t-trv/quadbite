import Title from "../../components/ui/Title";
import formatCurrency from "../../utils/formatCurrency";
import convertVariantName from "../../utils/convertVariantName";

import Table from "../../components/table/Table";
import Button from "../../components/ui/Button";

import { MinusIcon, PlusIcon, Bookmark, ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCheckoutStore from "../../hooks/useCheckoutStore";

const OrderPage = () => {
  const { oderItems, couponCode } = useCheckoutStore();
  const navigate = useNavigate();
  const columns = [
    {
      key: "imageUrl",
      label: "Thông tin món ăn",
      render: (item) => (
        <div className="flex items-center gap-4">
          <img src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
          <div>
            <h3 className="text-xl font-semibold">
              {item.name}{" "}
              <span className="text-sm font-medium text-gray-500">({convertVariantName(item.variantId)})</span>
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
          <button className="p-1 cursor-pointer">
            <MinusIcon className="w-4 h-4" />
          </button>
          <span>{item.quantity}</span>
          <button className="p-1 cursor-pointer">
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
      ),
    },
    {
      key: "totalPrice",
      label: "Thành tiền",
      render: (item) => <span className="text-base font-semibold ">{formatCurrency(item.price * item.quantity)}</span>,
    },
  ];

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
        <div className="col-span-8">
          <Table data={oderItems} columns={columns} />
        </div>

        <div className="col-span-4 border border-gray-300 rounded-3xl p-4 shadow-md">
          <div className="flex flex-col gap-4 h-full">
            <Title title="Thông tin thanh toán" variant="secondary" />

            {/* Mã giảm giá */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Nhập mã giảm giá"
                className="flex-1 rounded-3xl py-2 px-4 outline-none border border-secondary h-auto text-sm"
              />
              <Button variant="secondary" size="medium" className="rounded-3xl py-2 px-4 h-auto">
                <span>Áp dụng</span>
              </Button>
            </div>

            {/* Thông tin tổng tiền */}
            <div className="grid grid-cols-2">
              <span className="text-lg  text-secondary">Phụ phí</span>
              <span className="text-lg font-semibold text-secondary text-right">{formatCurrency(0)}</span>

              <span className="text-lg  text-secondary">Giảm giá</span>
              <span className="text-lg font-semibold text-secondary text-right">-{formatCurrency(0)}</span>

              <span className="text-lg  text-secondary">Phí vận chuyển</span>
              <span className="text-lg font-semibold text-secondary text-right">{formatCurrency(0)}</span>
            </div>
            <div className="py-4 border-t border-gray-300 grid grid-cols-2">
              <span className="text-lg font-semibold text-secondary">Tổng tiền</span>
              <span className="text-lg font-semibold text-secondary text-right">
                {formatCurrency(oderItems.reduce((acc, item) => acc + item.price * item.quantity, 0))}
              </span>
            </div>

            {/* Thanh toán */}
            <div className="flex items-center gap-2 mt-auto">
              <Button onClick={() => navigate("/order/checkout")} variant="secondary" size="medium" width="100%">
                Thanh toán ngay
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-4">
        <Button variant="outline" size="medium" className="w-full" icon={<Bookmark className="w-4 h-4" />}>
          Lưu vào giỏ hàng
        </Button>
      </div>
    </div>
  );
};

export default OrderPage;
