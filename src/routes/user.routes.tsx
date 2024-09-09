import ProtectedRoute from "../components/ui/ProtectedRoute";
import Dashboard from "../pages/protectedPages/Dashboard";
import Profile from "../pages/protectedPages/Profile";

export const userPaths = [
  {
    name: "Dashboard",
    path: "/user/dashboard",
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
  },
  {
    name: "Profile",
    path: "/user/profile",
    element: <ProtectedRoute><Profile /></ProtectedRoute>,
  },
];
