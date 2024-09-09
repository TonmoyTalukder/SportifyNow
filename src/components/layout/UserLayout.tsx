import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const { Content, Footer } = Layout;

const UserLayout = () => {
  return (
    <Layout style={{ height: "100vh", background: '#FBFCF8' }}> {/* Set background for the whole layout */}
      <Sidebar />
      <Layout style={{ background: '#FBFCF8' }}> {/* Also set the inner layout background */}
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              // padding: 5,
              height: '88vh',
              // background: '#ffffff', // Ensure the content area is white
              borderRadius: '8px',    // Optional: Keep the borderRadius as per your preference
              overflowY: 'auto',
              border: '1px solid transparent'
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', background: '#FBFCF8' }}> {/* Make Footer white too */}
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
