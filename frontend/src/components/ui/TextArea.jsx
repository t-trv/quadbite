const TextArea = ({ placeholder, rows = 4, ...props }) => {
  return (
    <div className="flex flex-col ">
      <textarea
        rows={rows}
        className="border border-gray-300 rounded-2xl focus:outline-none p-3 bg-white text-base disabled:bg-gray-200 disabled:cursor-not-allowed resize-y"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default TextArea;
