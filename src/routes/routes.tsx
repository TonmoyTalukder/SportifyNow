import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AntdApp>
        <App />
      </AntdApp>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <UserLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <UserLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(userPaths),
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
]);

export default router;
