import convertVariantName from "../../utils/convertVariantName";

const VariantList = ({ variantIds, selectedVariant, setSelectedVariant }) => {
  return (
    <div className="flex items-center gap-2">
      {variantIds?.map((variantId) => (
        <div
          key={variantId}
          className={`rounded-xl px-5 py-1 min-w-10 text-center text-sm border-2 border-dashed border-gray-400 transition-all duration-300 cursor-pointer select-none ${
            selectedVariant === variantId ? "bg-secondary text-white border-secondary" : ""
          }`}
          onClick={() => {
            if (selectedVariant === variantId) {
              setSelectedVariant(null);
            } else {
              setSelectedVariant(variantId);
            }
          }}
        >
          <span className="">{convertVariantName(variantId)}</span>
        </div>
      ))}
    </div>
  );
};

export default VariantList;
