import { Outlet } from "react-router-dom";
import StaffNavbar from "../pages/staffPage/StaffNavbar";

const StaffLayout = () => {
  return (
    <div className="container mx-auto py-4">
      <div>
        <StaffNavbar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default StaffLayout;
