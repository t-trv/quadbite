import Title from "../../../components/ui/Title";

const Password = () => {
  return (
    <div className="bg-white p-8 rounded-3xl h-full animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-200">
        <Title title="Đổi mật khẩu" size="extraLarge" />
      </div>
    </div>
  );
};

export default Password;
