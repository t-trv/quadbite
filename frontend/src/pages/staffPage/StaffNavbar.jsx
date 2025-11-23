import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserStar } from "lucide-react";
import Button from "../../components/ui/Button";

const StaffNavbar = () => {
  const navigate = useNavigate();

  const staffNavbarItems = [
    {
      name: "Đơn hàng",
      path: "/staff/orders",
    },
    {
      name: "Khách hàng",
      path: "/staff/customers",
    },
    {
      name: "Món ăn",
      path: "/staff/food",
    },
    {
      name: "Đánh giá",
      path: "/staff/reviews",
    },
  ];

  const [selectedNavbarItem, setSelectedNavbarItem] = useState(null);

  return (
    <div className="flex justify-between items-center bg-white px-4 py-2 rounded-full">
      {/* Brand */}
      <div onClick={() => navigate("/")}>
        <h1 className="text-3xl font-bold font-lobster text-primary">QuadBite</h1>
      </div>

      {/* Nav link */}
      <ul className="flex items-center gap-8 text-secondary">
        {staffNavbarItems.map((item) => (
          <li
            key={item.name}
            onClick={() => navigate(item.path)}
            className="hover:text-primary transition-all duration-300 cursor-pointer text-sm font-semibold"
          >
            {item.name}
          </li>
        ))}
      </ul>

      {/* Right */}
      <div className="flex gap-2 items-center">
        <Button variant="primary" size="medium" icon={<UserStar className="w-4 h-4" />}>
          Thông tin
        </Button>
      </div>
    </div>
  );
};

export default StaffNavbar;
