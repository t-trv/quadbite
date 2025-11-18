import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const activeSidebar = useLocation().pathname;
  const navigate = useNavigate();

  const sidebarItems = [
    {
      name: "Món ăn",
      path: "/admin/food",
    },
    {
      name: "Danh mục",
      path: "/admin/category",
    },
  ];

  return (
    <div className="bg-white p-4 rounded-3xl flex flex-col gap-4 h-[calc(100vh-32px)]">
      <div onClick={() => navigate("/")} className="cursor-pointer">
        <h1 className="text-3xl font-bold mb-2 text-primary font-lobster">QuadBite</h1>
      </div>
      <ul className="flex flex-col gap-2">
        {sidebarItems.map((item) => (
          <li
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`cursor-pointer transition-all duration-300 px-4 py-2 rounded-2xl 
                ${
                  activeSidebar === item.path
                    ? "bg-secondary text-white"
                    : "text-secondary hover:bg-secondary/80 hover:text-white"
                }
                
                `}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;
