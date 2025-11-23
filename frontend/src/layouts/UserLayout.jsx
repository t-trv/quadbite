import Navbar from "../components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import UserSidebar from "../pages/userPage/UserSidebar.jsx";

const UserLayout = () => {
  return (
    <div className="h-full py-4 flex flex-col gap-4">
      <div className="container mx-auto">
        <Navbar />
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-2">
            <UserSidebar />
          </div>
          <div className="col-span-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
