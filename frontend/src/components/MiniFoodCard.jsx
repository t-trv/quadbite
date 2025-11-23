import useCheckoutStore from "../hooks/useCheckoutStore";
import formatCurrency from "../utils/formatCurrency";
import { TrashIcon } from "lucide-react";

const MiniFoodCard = ({ item }) => {
  const { removeOderItem } = useCheckoutStore();

  return (
    <div className="border-dashed border-2 border-gray-200 rounded-xl p-2 animate-slide-in">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-4">
          <img src={item?.imageUrl} alt={item?.name} className="aspect-square object-cover rounded-xl" />
        </div>
        <div className="col-span-7">
          <h3 className="text-md font-bold">
            {item?.name} <span className="text-xs font-medium text-gray-500">({item?.variant.name})</span>
          </h3>
          <p className="text-sm text-gray-500">Số lượng: {item?.quantity}</p>
          <p className="text-sm text-gray-500">
            Giá bán: {formatCurrency(Number(item?.price) + Number(item?.variant.price_adjust))}
          </p>
        </div>

        <div className="col-span-1 flex items-end justify-end">
          <button className="cursor-pointer p-2" onClick={() => removeOderItem(item)}>
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiniFoodCard;
