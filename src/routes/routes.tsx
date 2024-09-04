import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import Dashboard from "../pages/dashboard/Dashboard.tsx";
import Login from "../pages/common/Login.tsx";
import Register from "../pages/common/Register.tsx";
import ProtectedRoute from "../components/layout/ProtectedRoute.tsx";
import ForgetPassword from "../pages/common/ForgetPassword.tsx";
import ResetPassword from "../pages/common/ResetPassword.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
