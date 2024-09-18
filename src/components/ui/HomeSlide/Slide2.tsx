import { Card, Col, Image, Row } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";

const Slide2 = () => {
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
    <Card
      style={{
        width: isMobile ? "80vw" : "40vw",
        marginBottom: isMobile ? "3vh" : "0",
        height: "45vh",
        borderRadius: "25px",
        backgroundColor: "#252729",
        color: "white",
        border: "0px",
        boxShadow:
          "0 8px 16px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3)",
        zIndex: 0, // Ensure it appears behind buttons
        overflow: "visible", // Allow shadows to render properly
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
          padding: 0,
          margin: 0,
        }}
      >
        <Row
          style={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            backgroundColor: "transparent",
            padding: 0,
            margin: 0,
            height: "100%",
            width: "100%",
          }}
        >
          <Col
            style={{
              height: "40vh",
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            }}
            span={8}
          >
            <div
              style={{
                marginRight: "10px",
              }}
            >
              <Title
                level={1}
                style={{
                  textAlign: "right",
                  color: "#FBFCF8",
                  zIndex: 1,
                }}
              >
                One to One Personal Care
              </Title>
              <Title
                level={4}
                style={{
                  textAlign: "right",
                  color: "#FBFCF8",
                  zIndex: 1,
                }}
              >
                We care your personal skill growth one to one.
              </Title>
            </div>
          </Col>
          <Col
            span={16}
            style={{
              height: "40vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <div style={{ position: "relative" }}>
              {/* Image with crosswise lines overlay */}
              <Image
                src="/one2oneSession.jpg"
                alt="HeroCover"
                preview={false}
                style={{
                  borderRadius: "10px",
                  width: "100%",
                  height: "100%",
                }}
              />
              {/* Overlay pseudo-element for crosswise lines */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "1px",
                  pointerEvents: "none",
                  zIndex: 2,
                  background: `
                    repeating-linear-gradient(
                      135deg,
                      #252729 1px,
                      #252729 1px,
                      transparent 2px,
                      transparent 25px
                    )`,
                }}
              />
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default Slide2;
