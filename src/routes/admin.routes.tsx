import ProtectedRoute from "../components/ui/ProtectedRoute";
import AdminBooking from "../pages/admin/AdminBooking";
import AdminFacilities from "../pages/admin/AdminFacilities";
import AllUsers from "../pages/admin/AllUsers";
import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateFacility from "../pages/admin/CreateFacility";
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
  {
    name: "Management",
    children: [
      {
        name: "Users",
        path: "/admin/all-users",
        element: (
          <ProtectedRoute>
            <AllUsers />
          </ProtectedRoute>
        ),
      },
      {
        name: "Create Admin",
        path: "/admin/create-admin",
        element: (
          <ProtectedRoute>
            <CreateAdmin />
          </ProtectedRoute>
        ),
      },
      {
        name: "Bookings",
        path: "/admin/all-bookings",
        element: (
          <ProtectedRoute>
            <AdminBooking />
          </ProtectedRoute>
        ),
      },
      {
        name: "Facilities",
        path: "/admin/all-facilities",
        element: (
          <ProtectedRoute>
            <AdminFacilities />
          </ProtectedRoute>
        ),
      },
          {
            name: "Create Facility",
            path: "/admin/create-facility",
            element: <CreateFacility />,
          },
      //     {
      //       name: "Previous Shipments",
      //       path: "/admin/previous-shipments",
      //       element: <PreviousShipments />,
      //     },
    ],
  },
];
