import About from "../pages/home/About";
import Booking from "../pages/home/booking/Booking";
import Contact from "../pages/home/Contact";
import Home from "../pages/home/Home";
import PaymentSuccess from "../pages/home/payment/PaymentSuccess";
import SportDetails from "../pages/home/SportDetails";
import Sports from "../pages/home/Sports";

export const homePaths = [
  {
    name: "Home",
    path: "/home",
    element: <Home/>,
  },
  {
    name: "Sports",
    path: "/sports",
    element: <Sports />,
  },
  {
    name: "Sports",
    path: "/sports/:id",
    element: <SportDetails />,
  },
  {
    name: "Booking",
    path: "/booking/:id",
    element: <Booking />,
  },
  {
    name: "Payment Success",
    path: "/payment/success",
    element: <PaymentSuccess />,
  },
  {
    name: "About Us",
    path: "/about-us",
    element: <About />,
  },
  {
    name: "Contact Us",
    path: "/contact-us",
    element: <Contact />,
  },
];
