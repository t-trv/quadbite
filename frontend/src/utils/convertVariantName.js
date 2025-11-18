const convertVariantName = (variantId) => {
  return (
    {
      small: "Nhỏ",
      medium: "Vừa",
      large: "Lớn",
      "extra-large": "Rất lớn",
    }[variantId] || variantId
  );
};

export default convertVariantName;
