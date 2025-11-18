import { useEffect } from "react";

import Button from "../ui/Button";

const ConfirmModal = ({ open, title, message, onConfirm, onCancel }) => {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onCancel();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-5 w-full max-w-sm shadow-lg">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{message}</p>

        <div className="flex justify-end gap-2">
          <Button variant="outline" size="small" minWidth="60px" onClick={onCancel}>
            Hủy
          </Button>
          <Button variant="primary" size="small" minWidth="90px" onClick={onConfirm}>
            Xác nhận
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
