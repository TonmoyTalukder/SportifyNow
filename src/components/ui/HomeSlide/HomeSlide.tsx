import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row } from "antd";
import { useState, useEffect } from "react";
import Slide1 from "./Slide1";
import Slide2 from "./Slide2";
import Slide3 from "./Slide3";
import "./HomeSlide.css";

const HomeSlide = () => {
  const totalSlides = 3;
  const [slideIndex, setSlideIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [direction, setDirection] = useState("right"); // Track the direction of the animation

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

  const handleNext = () => {
    if (slideIndex < totalSlides - 1) {
      setDirection("right");
      setAnimate(true);
      setSlideIndex(slideIndex + 1);
    }
  };

  const handlePrev = () => {
    if (slideIndex > 0) {
      setDirection("left");
      setAnimate(true);
      setSlideIndex(slideIndex - 1);
    }
  };

  const getCurrentSlide = () => {
    switch (slideIndex) {
      case 0:
        return <Slide1 />;
      case 1:
        return <Slide2 />;
      case 2:
        return <Slide3 />;
      default:
        return null;
    }
  };

  const getNextSlide = () => {
    switch (slideIndex) {
      case 0:
        return <Slide2 />;
      case 1:
        return <Slide3 />;
      case 2:
        return null;
      default:
        return null;
    }
  };

  // Handle animation end event to reset state
  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setAnimate(false);
      }, 500); // Duration should match the CSS animation time
      return () => clearTimeout(timer);
    }
  }, [animate]);

  const getCurrentSlideClass = () => {
    if (animate && direction === "right") {
      return "slide-current-fade-out-center"; // Slide fades out to the center when moving right
    } else if (animate && direction === "left") {
      return "slide-current-to-next"; // Slide moves to the right (out of view) when moving left
    }
    return "";
  };

  const getNextSlideClass = () => {
    if (animate && direction === "right") {
      return "slide-next-in"; // New slide coming from the right (into view)
    } else if (animate && direction === "left") {
      return "slide-next-from-left"; // New slide coming from the left (into view)
    }
    return "";
  };

  return (
    <div
      style={{
        paddingTop: "5vh",
      }}
    >
      <div
        style={{
          alignContent: "center",
        }}
      >
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "auto",
            padding: isMobile ? "5vh 0vw" : "0vh 0vw",
          }}
        >
          <Col
            span={isMobile ? 24 : 11}
            style={{
              display: "flex",
              justifyContent: isMobile ? "center" : "right",
              alignItems: "center",
              height: "100%",
            }}
          >
            {/* Card 1 */}
            <Card
            className="wave"
              style={{
                width: isMobile ? "80vw" : "35vw",
                marginBottom: isMobile ? "3vh" : "0",
                height: "42vh",
                borderRadius: "25px",
                backgroundColor: "#252729",
                color: "white",
                border: "0px",
                boxShadow:
                  "0 8px 16px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 10 1440 298">
                <path
                  fill="none"
                  stroke="rgba(31, 73, 115,0.9)"
                  strokeWidth="25"
                  d="M720,0 C520,150 920,150 720,315"
                />
              </svg>
            </Card>
          </Col>
          <Col
            span={isMobile ? 22 : 11}
            style={{
              display: "flex",
              justifyContent: isMobile ? "center" : "left",
              alignItems: "center",
              height: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: isMobile ? "0vw" : "-4vw",
                position: "relative", // Ensure the positioning of the buttons is correct
              }}
            >
              <Button
                onClick={handlePrev}
                style={{
                  marginRight: "-1vw",
                  zIndex: 1,
                  fontSize: "25px",
                  color: "#67748a",
                  backgroundColor: "transparent",
                  border: "none",
                  transition: "background-color 0.3s, box-shadow 0.3s",
                  visibility: slideIndex === 0 ? "hidden" : "visible",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#2b3340";
                  e.currentTarget.style.boxShadow =
                    "0 8px 16px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <LeftOutlined />
              </Button>
              {/* Current Slide Content */}
              <div className={`slideC-container ${getCurrentSlideClass()}`}>
                {getCurrentSlide()}
              </div>
              <Button
                onClick={handleNext}
                className={animate ? "slide-animate" : ""}
                style={{
                  marginLeft: "-1vw",
                  zIndex: 1,
                  fontSize: "25px",
                  color: "#67748a",
                  backgroundColor: "transparent",
                  border: "none",
                  transition: "background-color 0.3s, box-shadow 0.3s",
                  visibility:
                    slideIndex === totalSlides - 1 ? "hidden" : "visible",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#2b3340";
                  e.currentTarget.style.boxShadow =
                    "0 8px 16px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <RightOutlined />
              </Button>
            </div>
          </Col>
          <Col
            span={2}
            style={{
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
              height: "100%",
            }}
          >
            {/* Next Slide */}
            <div
              className={`slide-container ${getNextSlideClass()}`}
              style={{
                width: "6vw",
              }}
            >
              {getNextSlide()}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HomeSlide;
