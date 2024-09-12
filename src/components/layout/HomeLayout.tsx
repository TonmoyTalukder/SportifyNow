import {
  Button,
  ConfigProvider,
  Divider,
  Drawer,
  Image,
  Layout,
  Menu,
  MenuProps,
  theme,
} from "antd";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { gradientStyle } from "./Sidebar";
import { UserOutlined, UpOutlined } from "@ant-design/icons";
import { GiWindyStripes } from "react-icons/gi";
import "../../styles/HomeLayout.css";
import { useEffect, useState } from "react";
import CustomFooter from "../ui/CustomFooter";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const { Header, Content } = Layout;

const items: MenuProps["items"] = [
  {
    key: "home",
    label: <NavLink to="/home">Home</NavLink>,
  },
  {
    key: "sports",
    label: <NavLink to="/sports">Sports</NavLink>,
  },
  {
    key: "about",
    label: <NavLink to="/about-us">About Us</NavLink>,
  },
  {
    key: "contact",
    label: <NavLink to="/contact-us">Contact Us</NavLink>,
  },
];

const HomeLayout = () => {
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const [isScrollToTopVisible, setIsScrollToTopVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user!);

  const handleLogin = () => {
    if (user) {
      navigate(`/${user.role}/dashboard`);
    } else {
      navigate("/login");
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDrawerOpen = () => {
    setDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsHeaderFixed(true);
      } else {
        setIsHeaderFixed(false);
      }

      if (window.scrollY > 100) {
        setIsScrollToTopVisible(true);
      } else {
        setIsScrollToTopVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout style={{ ...gradientStyle, minHeight: "100vh" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: "white",
          height: "3vh",
          width: "100%",
        }}
      >
        {/* Offer Text */}
        <div className="scrolling-text-wrapper">
          <div
            className="scrolling-text"
            data-text="🎉 Exclusive Offer: Save 20% This Month! 🎉 Don’t miss out on our special discount! For a limited time, enjoy 20% off on all our sports' facilities."
          >
            <p>
              🎉 Exclusive Offer: Save 20% This Month! 🎉 Don’t miss out on our
              special discount! Get ready to elevate your game and your savings!
              For a limited time, enjoy 20% off on all our sports' facilities.
              Whether you're looking to hit the gym, play a game of tennis, or
              make use of our state-of-the-art equipment, now is the perfect
              time to take advantage of this special discount.
            </p>
          </div>
        </div>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemColor: "#ffff",
              itemHoverColor: "#e3e5b5",
              horizontalItemHoverColor: "#e3e5b5",
              horizontalItemSelectedColor: "#daa611",
            },
          },
        }}
      >
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            position: isHeaderFixed ? "fixed" : "relative",
            width: "100%",
            top: 0,
            zIndex: 1,
            backgroundColor: "#252729",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div>
                <Link to="/">
                  <Image
                    width={80}
                    src="/SportifyNow.png"
                    alt="SportifyNow"
                    preview={false}
                  />
                </Link>
              </div>
              {!isMobile && (
                <Menu
                  mode="horizontal"
                  selectedKeys={[location.pathname]} // Set the active menu item based on current path
                  items={items}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    backgroundColor: "transparent",
                    marginLeft: "2%",
                    fontWeight: "900",
                  }}
                />
              )}
            </div>
            <div>
              {!isMobile && (
                <Button
                  onClick={handleLogin}
                  style={{
                    backgroundColor: "transparent",
                    color: "#c7632e",
                    border: "1px solid #c7632e",
                    borderRadius: "50%", // Makes it circular
                    width: "40px", // Set equal width and height
                    height: "40px",
                    fontSize: "24px",
                    display: "flex",
                    justifyContent: "center", // Centers the icon horizontally
                    alignItems: "center", // Centers the icon vertically
                    filter: "drop-shadow(5px 5px 10px rgba(154, 10, 96, 0.8))",
                  }}
                >
                  <UserOutlined />
                </Button>
              )}
              {isMobile && (
                <Button
                  onClick={handleDrawerOpen}
                  style={{
                    position: "fixed",
                    right: 0,
                    transform: "translateY(-50%)",
                    borderRadius: "0 5px 5px 0",
                    backgroundColor: "transparent",
                    color: "#daa611",
                    filter: "drop-shadow(5px 5px 10px rgba(154, 10, 96, 0.8))",
                    border: "none",
                    zIndex: 1000,
                    fontSize: "34px",
                  }}
                >
                  <GiWindyStripes />
                </Button>
              )}
            </div>
          </div>
        </Header>
      </ConfigProvider>
      <Content style={{ padding: "0 0px" }}>
        <div
          style={{
            background: "transparent",
            minHeight: "calc(100vh - 134px)", // Adjust based on header and footer height
            position: "relative",
            borderRadius: borderRadiusLG,
            overflowX: "hidden",
          }}
        >
          <Outlet />
        </div>
      </Content>

      <CustomFooter />
      {/* <Footer
        style={{
          paddingTop: 20,
          textAlign: "center",
          backgroundColor: "#252729",
          borderRadius: "25px 25px 0px 0px",
          padding: "2vh 4vw",
          boxShadow: "0 -4px 15px rgba(155, 155, 155, 0.4)",
          marginTop: 20,
          color: "#FBFCF8",
        }}
      >
        SportifyNow ©{new Date().getFullYear()} Developed by{" "}
        <a
          style={{ color: "#daa611" }}
          href="https://tonmoytalukder.github.io/"
        >
          Tonmoy Talukder
        </a>
      </Footer> */}
      {isScrollToTopVisible && (
        <Button
          onClick={handleScrollToTop}
          style={{
            position: "fixed",
            bottom: "10vh",
            right: "2vw",
            zIndex: 1000,
            borderRadius: "15%",
            backgroundColor: "#252729",
            color: "#FBFCF8",
            border: "none",
            boxShadow: "0 4px 5px rgba(155, 155, 155, 0.5)",
          }}
        >
          <UpOutlined />
        </Button>
      )}
      <Drawer
        title="Menu"
        placement="right"
        onClose={handleDrawerClose}
        open={drawerVisible}
        width={250}
      >
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={items}
          style={{
            border: "none",
          }}
          onClick={handleDrawerClose} // Closes the drawer on menu item click
        />
        <Divider />
        <div
          style={{
            marginLeft: "4vw",
            width: "100%",
          }}
        >
          <Button
            onClick={() => {
              handleLogin();
              handleDrawerClose(); // Closes the drawer after login button click
            }}
            style={{
              width: "80%",
            }}
          >
            <UserOutlined />
          </Button>
        </div>
      </Drawer>
    </Layout>
  );
};

export default HomeLayout;
