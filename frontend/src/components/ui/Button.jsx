const Button = ({
  children,
  onClick,
  icon,
  type = "button",
  variant = "primary",
  size = "medium",
  width,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
}) => {
  const sizeClasses = {
    small: "px-2 py-1 text-xs md:text-sm",
    medium: "px-3 py-2 text-sm",
    large: "px-4 py-3 text-base",
  };
  const typeClasses = {
    primary: "bg-primary text-white rounded-3xl border border-primary",
    secondary: "bg-secondary text-white rounded-3xl border border-secondary",
    outline: "bg-white text-secondary border border-secondary rounded-3xl",
    ghost: "bg-transparent text-secondary rounded-3xl",
    "update-btn": "border border-secondary text-secondary rounded-lg",
    "delete-btn": "bg-primary text-white rounded-lg",
  };
  return (
    <button
      onClick={onClick}
      type={type}
      className={`
        cursor-pointer hover:opacity-80 transition-all duration-300 flex active:scale-95 items-center gap-1 whitespace-nowrap justify-center
        ${sizeClasses[size]}
        ${typeClasses[variant]}
      `}
      style={{ width: width, minWidth: minWidth, maxWidth: maxWidth, minHeight: minHeight, maxHeight: maxHeight }}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
