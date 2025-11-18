const BorderWrapper = ({ children, className }) => {
  return <div className="border border-gray-300 rounded-3xl p-4 shadow-md">{children}</div>;
};

export default BorderWrapper;
