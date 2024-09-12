import About from "../pages/home/About";
import Contact from "../pages/home/Contact";
import Home from "../pages/home/Home";
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
