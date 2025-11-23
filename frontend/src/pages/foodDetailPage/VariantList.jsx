const VariantList = ({ variants, selectedVariant, setSelectedVariant }) => {
  return (
    <div className="flex items-center gap-2">
      {variants?.map((variant) => (
        <div
          key={variant.id}
          className={`rounded-xl px-5 py-1 min-w-10 text-center text-sm border-2 border-dashed border-gray-400 transition-all duration-300 cursor-pointer select-none ${
            selectedVariant.id === variant.id ? "bg-secondary text-white border-secondary" : ""
          }`}
          onClick={() => {
            if (selectedVariant.id === variant.id) {
              setSelectedVariant(null);
            } else {
              setSelectedVariant(variant);
            }
          }}
        >
          <span className="">{variant.name}</span>
        </div>
      ))}
    </div>
  );
};

export default VariantList;
