import { CircleCheck } from "lucide-react";
import useCheckoutStore from "../../hooks/useCheckoutStore";

const AddressCard = ({ address }) => {
  const { addressId, setAddressId } = useCheckoutStore();

  return (
    <div
      onClick={() => setAddressId(address.id)}
      className={`
        flex flex-col gap-2 bg-bg-50 px-6 py-4 rounded-xl shadow-md cursor-pointer transition-all duration-300
        ${addressId === address.id ? "border-2 border-secondary" : "border-2 border-transparent"}
      `}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold">{address.address_name}</h3>
        {addressId === address.id && <CircleCheck className="w-6 h-6" />}
      </div>

      <div>
        <p className="text-base font-bold">{address.receiption_name}</p>
        <p className="text-sm font-bold">( +84 ) {address.phone}</p>
      </div>

      <div>
        <p className="text-sm text-gray-500">
          {address.address_line}, {address.city}, {address.district}
        </p>
      </div>
    </div>
  );
};

export default AddressCard;
