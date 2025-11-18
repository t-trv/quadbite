import { TrashIcon } from "lucide-react";

const DeleteIconButton = ({ onClick }) => {
  return (
    <button className="text-red-500 cursor-pointer" onClick={onClick}>
      <TrashIcon className="w-4 h-4" />
    </button>
  );
};

export default DeleteIconButton;
