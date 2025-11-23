import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import StaffRoutes from "./routes/StaffRoutes";

const App = () => {
  const routes = createBrowserRouter([...PublicRoutes, ...PrivateRoutes, ...AdminRoutes, ...StaffRoutes]);

  return <RouterProvider router={routes} />;
};

export default App;
