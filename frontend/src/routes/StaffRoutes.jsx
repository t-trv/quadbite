import StaffLayout from "../layouts/StaffLayout";
import ProtectedStaffRoute from "./security/ProtectedStaffRoute";
import StaffOrdersPage from "../pages/staffPage/orders/StaffOrdersPage";

const StaffRoutes = [
  {
    path: "/staff",
    element: (
      <ProtectedStaffRoute>
        <StaffLayout />
      </ProtectedStaffRoute>
    ),
    children: [{ path: "/staff/orders", element: <StaffOrdersPage />, default: true }],
  },
];

export default StaffRoutes;
