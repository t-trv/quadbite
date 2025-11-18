import Navbar from "../components/Navbar.jsx";
import { Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <div className="h-full py-4">
      <div className="container mx-auto">
        <Navbar />
      </div>

      <div>
        <div className="container mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
