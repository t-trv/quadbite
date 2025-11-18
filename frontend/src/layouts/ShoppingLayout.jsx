import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import TempOrder from "../components/TempOrder";

const ShoppingLayout = () => {
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
            <div className="col-span-9">
              <Outlet />
            </div>
            <div className="col-span-3">
              <TempOrder />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingLayout;
