import Title from "../../components/ui/Title";
import Button from "../../components/ui/Button";
import BorderWrapper from "../../components/ui/BorderWrapper";
import { ArrowLeftIcon } from "lucide-react";

import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full bg-white p-4 rounded-3xl">
      <div className="flex items-center justify-between">
        <Title title="Chi tiết thanh toán" variant="secondary" />

        <Button
          variant="outline"
          size="small"
          icon={<ArrowLeftIcon className="w-4 h-4" />}
          onClick={() => navigate(-1)}
        >
          Quay lại trang trước
        </Button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-12 gap-4 py-4">
        <div className="col-span-8">
          <BorderWrapper>
            <Title title="Thông tin người nhận" variant="secondary" size="small" />
          </BorderWrapper>
        </div>

        <div className="col-span-4">
          <div className="bg-white p-4 rounded-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
