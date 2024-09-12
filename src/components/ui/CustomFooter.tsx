import { Layout, Row, Col, Typography, Space, Image } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import "../../styles/CustomFooter.css";
import { useEffect, useState } from "react";

const { Footer } = Layout;
const { Link, Text, Title } = Typography;

const CustomFooter = () => {
  // useState to handle mobile view
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
    <Footer
      style={{
        backgroundColor: "#1A1C1D",
        color: "#FBFCF8",
        padding: "3vh 4vw",
        borderRadius: "25px 25px 0px 0px",
        boxShadow: "0 -4px 15px rgba(155, 155, 155, 0.4)",
        marginTop: 40,
        textAlign: "center",
      }}
    >
      <Row justify="space-around" gutter={[32, 16]}>
        {/* Logo, Name, Details */}
        {isMobile && (
          <Col xs={24} sm={8}>
            <Space direction="vertical">
              <Image
                width={200}
                src="/SportifyNow.png"
                alt="SportifyNow"
                preview={false}
              />
              <Text  style={{ color: "#FBFCF8", fontSize: "10px" }}>
                Book desired slots, Enjoy epic games.
              </Text>
            </Space>
          </Col>
        )}

        {/* About Us and Contact Us Links */}
        <Col xs={24} sm={8}>
          <Title level={4} style={{ color: "#daa611", marginBottom: 10 }}>
            Quick Links
          </Title>
          <Space direction="vertical">
            <Link
              href="/about-us"
              style={{ color: "#FBFCF8", fontSize: "16px" }}
            >
              About Us
            </Link>
            <Link
              href="/contact-us"
              style={{ color: "#FBFCF8", fontSize: "16px" }}
            >
              Contact Us
            </Link>
          </Space>
        </Col>

        {/* Logo, Name, Details */}
        {!isMobile && (
          <Col xs={24} sm={8}>
            <Space direction="vertical">
              <Image
                width={200}
                src="/SportifyNow.png"
                alt="SportifyNow"
                preview={false}
              />
              <Text style={{ color: "#FBFCF8", fontSize: "10px" }}>
                Book desired slots, Enjoy epic games.
              </Text>
            </Space>
          </Col>
        )}

        {/* Social Media Links */}
        <Col xs={24} sm={8}>
          <Title level={4} style={{ color: "#daa611", marginBottom: 10 }}>
            Follow Us
          </Title>
          <Space size="large">
            <Link
              href="https://facebook.com"
              target="_blank"
              style={{ color: "#FBFCF8" }}
            >
              <FacebookOutlined style={{ fontSize: "24px" }} />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              style={{ color: "#FBFCF8" }}
            >
              <TwitterOutlined style={{ fontSize: "24px" }} />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              style={{ color: "#FBFCF8" }}
            >
              <InstagramOutlined style={{ fontSize: "24px" }} />
            </Link>
          </Space>
        </Col>
      </Row>

      {/* Developer Credit */}
      <Text
        style={{
          display: "block",
          marginTop: 40,
          fontSize: "14px",
          color: "#8D8D8D",
        }}
      >
        SportifyNow ©{new Date().getFullYear()} | Developed by{" "}
        <Link
          href="https://tonmoytalukder.github.io/"
          style={{ color: "#daa611", textDecoration: "underline" }}
        >
          Tonmoy Talukder
        </Link>
      </Text>
    </Footer>
  );
};

export default CustomFooter;
