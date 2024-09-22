import { Button, ConfigProvider, Image, Layout, Menu } from "antd";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { userPaths } from "../../routes/user.routes";
import { useAppDispatch } from "../../redux/hook";
import { logout } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import {LogoutOutlined} from '@ant-design/icons';
// import styles from "../../styles/Sidebar.module.css";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  USER: "user",
};

export const gradientStyle = {
  background:
    "linear-gradient(to bottom right, rgb(26, 38, 56) 0%, rgb(1, 1, 9) 45%, rgb(1, 1, 9) 55%, rgba(44, 26, 56, 1) 100%)",
};

const Sidebar = () => {
  const role = useSelector((state: RootState) => state.auth.user!.role);
  const dispatch = useAppDispatch();

  let sidebarItems;

  switch (role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;

    case userRole.USER:
      sidebarItems = sidebarItemsGenerator(userPaths, userRole.USER);
      break;

    default:
      break;
  }

  const handleLogout = () => {
    dispatch(logout());
    toast.info("Log out!", { duration: 800 });
  };
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{...gradientStyle, color: "white", zIndex: 30,}}
      width={250}
    >
      <div
        style={{
          color: "white",
          textAlign: "center",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: '3vh',
          marginBottom:'2vh'
        }}
      >
        <NavLink to="/" style={{}}
        >
          <Image
            width={120}
            src="/SportifyNow.png"
            alt="SportifyNow"
            preview={false}
            style={{
              borderRadius: '10px',
              filter: "drop-shadow(5px 5px 10px rgba(154, 0, 0, 0.4))", // Adds a shadow around the objects in the image
              transform: "rotateY(15deg)",
            }}
          />
        </NavLink>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemColor: "#ffff",
              itemHoverColor: "#daa611",
              itemSelectedColor: "#daa611",
            },
          },
        }}
      >
        <Menu
          style={{ backgroundColor: "transparent" }}
          mode="inline"
          // defaultSelectedKeys={["4"]}
          items={sidebarItems}
        />
      </ConfigProvider>

      <div style={{ textAlign: "left", marginLeft: "1.5rem", marginTop: "1rem", }}>
        <Button style={{
          border: 'transparent'
        }} type="primary" danger onClick={handleLogout}>
         <LogoutOutlined />
        </Button>
      </div>
    </Sider>
  );
};

export default Sidebar;
