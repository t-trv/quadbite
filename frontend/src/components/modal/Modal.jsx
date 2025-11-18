import { XIcon } from "lucide-react";

import ModalField from "./ModalField";
import Button from "../ui/Button";

const Modal = ({ text, fields, modal }) => {
  if (!modal.isOpen) return null;

  return (
    <div className="fixed z-999 inset-0 bg-black/20 flex justify-center items-center">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-lg">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          {text.title && <h2 className="text-xl font-bold text-secondary">{text.title}</h2>}
          <button onClick={modal.closeModal} className="text-gray-500 hover:text-gray-700 cursor-pointer">
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <form className="p-6 min-h-[240px] max-h-[70vh] overflow-y-auto scrollbar-light">
          <ModalField fields={fields} register={modal.register} errors={modal.errors} control={modal.control} />
        </form>

        {/* Modal Footer */}
        <div className="border-t border-gray-200 flex justify-end p-6 gap-2">
          <Button variant="outline" size="small" minWidth="80px" onClick={modal.closeModal} type="button">
            {text.cancelText}
          </Button>
          <Button
            variant="primary"
            size="small"
            minWidth="80px"
            type="submit"
            onClick={modal.handleSubmit(modal.onSubmit)}
          >
            {text.submitText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
