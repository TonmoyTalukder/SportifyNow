import PreviousBookings from "../components/ui/Booking/PreviousBookings";
import ProtectedRoute from "../components/ui/ProtectedRoute";
import Dashboard from "../pages/protectedPages/Dashboard";
import Profile from "../pages/protectedPages/Profile";
import UserBooking from "../pages/user/UserBooking";

export const userPaths = [
  {
    name: "Dashboard",
    path: "/user/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    name: "Profile",
    path: "/user/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  // {
  //   name: "Booking",
  //   path: "/user/booking",
  //   element: (
  //     <ProtectedRoute>
  //       <UserBooking />
  //     </ProtectedRoute>
  //   ),
  // },
  {
    name: "Booking",
    children: [
      {
        name: "Upcoming Bookings",
        path: "/user/upcoming-booking",
        element: (
          <ProtectedRoute>
            <UserBooking />
          </ProtectedRoute>
        ),
      },
      {
        name: "Previous Bookings",
        path: "/user/previous-booking",
        element: (
          <ProtectedRoute>
            <PreviousBookings />
          </ProtectedRoute>
        ),
      },
    ],
  },
];
