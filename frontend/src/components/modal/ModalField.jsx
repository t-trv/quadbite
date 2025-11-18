import CustomSelect from "../ui/CustomSelect";
import { Controller } from "react-hook-form";

const ModalField = ({ fields, register, errors, control }) => {
  const inputClass =
    "border rounded-xl focus:outline-none px-3 py-2 bg-[#F7FBFF] text-base disabled:bg-gray-200 disabled:cursor-not-allowed";

  const renderInput = (field) => {
    const commonProps = {
      id: field.name,
      className: inputClass,
      readOnly: field.readOnly ? field.readOnly : false,
      ...register(field.name, {
        required: field.valid?.required ? field.valid.required : false,
        pattern: field.valid?.pattern ? field.valid.pattern : false,
        validate: field.valid?.validate ? field.valid.validate : false,
        disabled: field.disabled ? field.disabled : false,
      }),
    };

    switch (field.type) {
      case "text":
      case "number":
        return <input type={field.type} {...commonProps} />;

      case "textarea":
        return <textarea rows={field.rows || 4} {...commonProps} />;

      case "select":
        return (
          <Controller
            name={field.name}
            control={control}
            rules={{
              required: field.valid?.required,
              validate: field.valid?.validate,
            }}
            render={({ field: rhfField }) => (
              <CustomSelect {...rhfField} options={field.options} placeholder={field.placeholder} />
            )}
          />
        );

      case "multi-select":
        return (
          <Controller
            name={field.name}
            control={control}
            render={({ field: rhfField }) => (
              <CustomSelect {...rhfField} isMulti options={field.options} placeholder={field.placeholder} />
            )}
          />
        );

      default:
        return <input type="text" {...commonProps} />;
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {fields.map((field) => (
        <div
          key={field.name}
          className={`flex flex-col ${
            field.colSpan === 1
              ? `col-span-1`
              : field.colSpan === 2
              ? `col-span-2`
              : field.colSpan === 3
              ? `col-span-3`
              : `col-span-4`
          }`}
        >
          <label htmlFor={field.name} className="text-sm font-medium text-secondary">
            {field.label} {field.valid?.required && <span className="text-red-500">*</span>}
          </label>

          {renderInput(field)}

          {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name].message}</p>}
        </div>
      ))}
    </div>
  );
};

export default ModalField;
