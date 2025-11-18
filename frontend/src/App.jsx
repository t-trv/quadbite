import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicRoutes from "./routes/publicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import AdminRoutes from "./routes/AdminRoutes";

const App = () => {
  const routes = createBrowserRouter([
    ...PublicRoutes,
    ...PrivateRoutes,
    ...AdminRoutes,
  ]);

  return <RouterProvider router={routes} />;
};

export default App;
