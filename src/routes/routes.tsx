import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/protectedPages/Dashboard.tsx";
import Login from "../pages/common/Login.tsx";
import Register from "../pages/common/Register.tsx";
import ProtectedRoute from "../components/ui/ProtectedRoute.tsx";
import ForgetPassword from "../pages/common/ForgetPassword.tsx";
import ResetPassword from "../pages/common/ResetPassword.tsx";
import UserLayout from "../components/layout/UserLayout.tsx";
import { routeGenerator } from "../utils/routesGenerator.ts";
import { adminPaths } from "./admin.routes.tsx";
import { userPaths } from "./user.routes.tsx";
import { App as AntdApp } from "antd";
import HomeLayout from "../components/layout/HomeLayout.tsx";
import { homePaths } from "./home.routes.tsx";
import NotFound from "../pages/errors/NotFound.tsx"; 
import Unauthorized from "../pages/errors/Unauthorized.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AntdApp>
        <HomeLayout />
      </AntdApp>
    ),
    children: routeGenerator(homePaths),
    errorElement: <NotFound />, // Show 404 page for invalid routes under "/"
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    errorElement: <Unauthorized />, // Unauthorized access to the dashboard
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <UserLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
    errorElement: <Unauthorized />, // Unauthorized access to admin routes
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <UserLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(userPaths),
    errorElement: <Unauthorized />, // Unauthorized access to user routes
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*", // Catch-all route for undefined paths
    element: <NotFound />, // Show 404 page for all undefined routes
  },
]);

export default router;
