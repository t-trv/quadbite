import AdminLayout from "../layouts/AdminLayout";
import AdminPage from "../pages/adminPage/AdminPage";
import AdminFoodPage from "../pages/adminPage/AdminFoodPage";
import AdminCategoryPage from "../pages/adminPage/adminCategory/AdminCategoryPage";
import AdminRoute from "../components/AdminRoute";

const AdminRoutes = [
  {
    path: "/",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { path: "/admin", element: <AdminPage /> },
      { path: "/admin/food", element: <AdminFoodPage /> },
      { path: "/admin/category", element: <AdminCategoryPage /> },
    ],
  },
];

export default AdminRoutes;
