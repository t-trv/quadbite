import ShoppingLayout from "../layouts/ShoppingLayout";
import UserLayout from "../layouts/UserLayout";
import OrderLayout from "../layouts/OrderLayout";

import ProtectedRoute from "./security/ProtectedRoute";

import ShoppingPage from "../pages/shoppingPage/ShoppingPage";
import FoodDetailPage from "../pages/foodDetailPage/FoodDetailPage";
import OrderPage from "../pages/orderPage/OrderPage";
import QrCheckoutPage from "../pages/checkoutPage/QrCheckoutPage";
import OrderSuccessPage from "../pages/orderPage/OrderSuccessPage";
import Profile from "../pages/userPage/account/Profile";
import Password from "../pages/userPage/account/Password";
import Orders from "../pages/userPage/orders/Orders";

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
      { path: "/order/success/:orderId", element: <OrderSuccessPage /> },
      { path: "/order/checkout/qr", element: <QrCheckoutPage /> },
    ],
  },

  // User
  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <UserLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/user/account/profile", element: <Profile />, default: true },
      { path: "/user/account/password", element: <Password /> },

      // Orders
      { path: "/user/orders", element: <Orders /> },
    ],
  },
];

export default PrivateRoutes;
