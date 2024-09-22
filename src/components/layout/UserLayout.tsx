import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Header } from "antd/es/layout/layout";
import CustomHeader from "../ui/CustomHeader";
import { useEffect } from "react";

const { Content, Footer } = Layout;

const UserLayout = () => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue =
        "Are you sure you want to reload the page? You may lost unsaved items.";
    };

    // Add the event listener to handle before unload for the entire app
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  return (
    <Layout style={{ height: "100vh", background: "#FBFCF8" }}>
      {" "}
      {/* Set background for the whole layout */}
      <Sidebar />
      <Layout style={{ background: "#FBFCF8" }}>
        {" "}
        {/* Also set the inner layout background */}
        <Header style={{ padding: 0, background: "transparent", marginBottom: '1vh' }}>
          <CustomHeader/>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              // padding: 5,
              height: "88vh",
              // background: '#ffffff', // Ensure the content area is white
              borderRadius: "8px", // Optional: Keep the borderRadius as per your preference
              overflowY: "auto",
              border: "1px solid transparent",
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center", background: "#FBFCF8" }}>
          {" "}
          {/* Make Footer white too */}
          SportifyNow ©{new Date().getFullYear()} Developed by{" "}
          <a
            style={{ color: "#daa611" }}
            href="https://tonmoytalukder.github.io/"
          >
            Tonmoy Talukder
          </a>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default UserLayout;
