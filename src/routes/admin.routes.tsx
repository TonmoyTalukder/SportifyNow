import ProtectedRoute from "../components/ui/ProtectedRoute";
import Dashboard from "../pages/protectedPages/Dashboard";
import Profile from "../pages/protectedPages/Profile";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    name: "Profile",
    path: "/admin/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  // {
  //   name: "Management",
  //   children: [
  //     {
  //       name: "Create Product",
  //       path: "/admin/create-product",
  //       element: <CreateProduct />,
  //     },
  //     {
  //       name: "Create Article",
  //       path: "/admin/create-article",
  //       element: <CreateArticle />,
  //     },
  //     {
  //       name: "Create Admin",
  //       path: "/admin/create-admin",
  //       element: <CreateAdmin />,
  //     },
  //     {
  //       name: "Previous Shipments",
  //       path: "/admin/previous-shipments",
  //       element: <PreviousShipments />,
  //     },
  //   ],
  // },
];
