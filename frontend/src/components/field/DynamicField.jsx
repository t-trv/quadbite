import CustomDropdownSelect from "../ui/CustomDropdownSelect";
import { Controller } from "react-hook-form";

const colSpanMap = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
};

const DynamicField = ({ field, errors, control }) => {
  const commonClassName = "w-full p-2 border border-gray-300 rounded-xl outline-none focus:border-primary";

  const commonWrapperClassName = `flex flex-col relative ${colSpanMap[field.colSpan] || ""}`;
  const commonLabelClassName = "text-sm font-medium";
  const commonErrorClassName = "text-red-500 text-xs";
  const commonCheckboxClassName = "w-4 h-4";

  const renderField = () => {
    return (
      <Controller
        name={field.key}
        control={control}
        defaultValue={field.value || ""}
        rules={field.validation}
        render={({ field: { value, onChange } }) => {
          switch (field.type) {
            case "input":
              return (
                <div className={commonWrapperClassName}>
                  <label className={commonLabelClassName}>{field.label}</label>
                  <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    className={commonClassName}
                    placeholder={field.placeholder}
                    readOnly={field.readOnly}
                  />
                  {errors[field.key] && <p className={commonErrorClassName}>{errors[field.key].message}</p>}
                </div>
              );
            case "select":
              return (
                <div className={commonWrapperClassName}>
                  <label className={commonLabelClassName}>{field.label}</label>
                  <CustomDropdownSelect
                    className={commonClassName}
                    label={field.label}
                    options={field.options}
                    value={value || ""}
                    onChange={onChange}
                    disabled={field.disabled}
                  />
                  {errors[field.key] && <p className={commonErrorClassName}>{errors[field.key].message}</p>}
                </div>
              );
            case "textarea":
              return (
                <div className={commonWrapperClassName}>
                  <label className={commonLabelClassName}>{field.label}</label>
                  <textarea
                    value={value}
                    onChange={onChange}
                    className={commonClassName}
                    rows={4}
                    readOnly={field.readOnly}
                  />
                  {errors[field.key] && <p className={commonErrorClassName}>{errors[field.key].message}</p>}
                </div>
              );
            case "checkbox":
              return (
                <div className={`flex flex-row-reverse justify-end items-center gap-2`}>
                  <label className={commonLabelClassName}>{field.label}</label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={onChange}
                    className={commonCheckboxClassName}
                    defaultChecked={field.value}
                    readOnly={field.readOnly}
                  />
                  {errors[field.key] && <p className={commonErrorClassName}>{errors[field.key].message}</p>}
                </div>
              );
            default:
              return null;
          }
        }}
      />
    );
  };

  return renderField();
};

export default DynamicField;
