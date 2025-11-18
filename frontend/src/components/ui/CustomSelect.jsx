import { useState, useRef, useEffect } from "react";

const CustomSelect = ({ options = [], value, onChange, placeholder = "Select...", width, isMulti = false }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Chuẩn hóa value để không bao giờ undefined
  const realValue = isMulti ? (Array.isArray(value) ? value : []) : value ?? null;

  useEffect(() => {
    const handleClick = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const selectedSingle = options.find((o) => o.value === realValue);
  const selectedMulti = isMulti ? options.filter((o) => realValue.includes(o.value)) : [];

  const handleSelect = (val) => {
    if (!isMulti) {
      onChange(val);
      setOpen(false);
      return;
    }

    let newValue;
    if (realValue.includes(val)) {
      newValue = realValue.filter((v) => v !== val);
    } else {
      newValue = [...realValue, val];
    }
    onChange(newValue);
  };

  return (
    <div ref={ref} className="relative w-full" style={{ width }}>
      <div
        className="border rounded-xl px-3 py-2 bg-[#F7FBFF] cursor-pointer flex justify-between items-center w-full"
        onClick={() => setOpen((p) => !p)}
      >
        <span className="text-sm md:text-base">
          {!isMulti
            ? selectedSingle?.label || placeholder
            : selectedMulti.length > 0
            ? selectedMulti.map((s) => s.label).join(", ")
            : placeholder}
        </span>
        <span>▼</span>
      </div>

      {open && (
        <div className="absolute left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {options.map((item) => {
            const active = isMulti ? realValue.includes(item.value) : realValue === item.value;

            return (
              <div
                key={item.value}
                className={`px-3 py-2 cursor-pointer text-sm flex justify-between items-center ${
                  active ? "bg-gray-100 font-semibold" : "hover:bg-gray-100"
                }`}
                onClick={() => handleSelect(item.value)}
              >
                {item.label}

                {isMulti && <input type="checkbox" checked={active} readOnly />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
