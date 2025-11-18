import ShoppingLayout from "../layouts/ShoppingLayout";
import ProfilePage from "../pages/profilePage/ProfilePage";
import ProfileLayout from "../layouts/ProfileLayout";
import OrderLayout from "../layouts/OrderLayout";

import ShoppingPage from "../pages/shoppingPage/ShoppingPage";
import ProtectedRoute from "../components/ProtectedRoute";
import FoodDetailPage from "../pages/foodDetailPage/FoodDetailPage";
import OrderPage from "../pages/orderPage/OrderPage";
import CheckoutPage from "../pages/checkoutPage/CheckoutPage";

const PrivateRoutes = [
  // Shopping
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <ShoppingLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/:mainCategory", element: <ShoppingPage /> },
      { path: "/:mainCategory/:foodSlug", element: <FoodDetailPage /> },
      { path: "/order", element: <OrderPage /> },
    ],
  },

  {
    path: "/order",
    element: (
      <ProtectedRoute>
        <OrderLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/order", element: <OrderPage /> },
      { path: "/order/checkout", element: <CheckoutPage /> },
    ],
  },

  // Profile
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <ProfileLayout />
      </ProtectedRoute>
    ),
    children: [{ path: "/profile", element: <ProfilePage /> }],
  },
];

export default PrivateRoutes;
