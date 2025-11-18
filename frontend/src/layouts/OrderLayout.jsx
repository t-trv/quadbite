import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const OrderLayout = () => {
  return (
    <div className="h-full py-4">
      <div>
        <div className="container mx-auto">
          <Navbar />
        </div>
      </div>

      <div className="py-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderLayout;
