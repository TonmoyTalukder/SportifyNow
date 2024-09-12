import { Card } from "antd";
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
      <h2>Slide 1</h2>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  );
};

export default Slide1;
