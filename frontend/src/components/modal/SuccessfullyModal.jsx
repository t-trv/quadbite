import { CheckCircleIcon } from "lucide-react";

const SuccessfullyModal = ({ title, message }) => {
  return (
    <div className="min-w-96 min-h-100 p-8 flex flex-col items-center justify-center gap-2">
      <CheckCircleIcon className="w-20 h-20 text-primary" />
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-gray-500">{message}</p>
    </div>
  );
};

export default SuccessfullyModal;
