import { Outlet } from "react-router-dom";

import AdminSidebar from "../pages/adminPage/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="container mx-auto md:py-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2">
          <AdminSidebar />
        </div>

        <div className="col-span-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
