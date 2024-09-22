import { Card, Col, Image, Row } from "antd";
import { useEffect, useState } from "react";

const Slide1 = () => {
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
                src="/SportCoach.jpg"
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
                marginLeft: "10px",
              }}
            >
              <h2
                // level={4}
                style={{
                  textAlign: "left",
                  color: "#FBFCF8",
                  zIndex: 1,
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "normal",
                }}
              >
                Intensive Coaching 24x7
              </h2>
              <p
                style={{
                  textAlign: "left",
                  color: "#FBFCF8",
                  zIndex: 1,
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "normal",
                }}
              >
                Get our intensive coaching to improve your sport skills.
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default Slide1;
