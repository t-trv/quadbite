const Title = ({ title, variant, size = "medium", weight = "semibold" }) => {
  const sizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
    extraLarge: "text-xl",
    extraExtraLarge: "text-2xl",
  };

  const weightClasses = {
    light: "font-light",
    normal: "font-normal",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  return (
    <h2
      className={`select-none
        ${sizeClasses[size]}
        ${weightClasses[weight]}
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
