import { PencilIcon } from "lucide-react";

const UpdateIconButton = ({ onClick, label, variant = "default" }) => {
  return (
    <button
      className={`px-2 py-1 rounded-md cursor-pointer 
    ${variant === "default" ? "bg-blue-500 text-white" : "bg-gray-500 text-white"}
    ${variant === "outline" ? "border border-blue-500 text-blue-500" : "border-none"}
    `}
      onClick={onClick}
    >
      {label && <span className="ml-2">{label}</span>}
      <PencilIcon className="w-4 h-4" />
    </button>
  );
};

export default UpdateIconButton;
