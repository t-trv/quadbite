import { useEffect } from "react";

const ModalWrapper = ({ children, open, onClose }) => {
  useEffect(() => {
    const preventScroll = (e) => e.preventDefault();

    if (open) {
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
    } else {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    }

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      onMouseDown={(e) => {
        if (e.target.classList.contains("bg-black/50")) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 w-full h-full bg-black/50 flex items-center justify-center animate-fade-in"
    >
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-3xl animate-slide-up">
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
