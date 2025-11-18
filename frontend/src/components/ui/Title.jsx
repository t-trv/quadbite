const Title = ({ title, variant, size = "medium" }) => {
  const sizeClasses = {
    small: "text-base",
    medium: "text-lg",
    large: "text-2xl",
  };

  return (
    <h2
      className={`font-semibold select-none
        ${sizeClasses[size]}

        ${variant === "primary" && "text-primary"}
        ${variant === "secondary" && "text-secondary"}
        ${variant === "tertiary" && "text-tertiary"}
    `}
    >
      {title}
    </h2>
  );
};

export default Title;
