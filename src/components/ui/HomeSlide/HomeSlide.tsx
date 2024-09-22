import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Card, Col, Image, Row } from "antd";
import { useState, useEffect } from "react";
import Slide1 from "./Slide1";
import Slide2 from "./Slide2";
import Slide3 from "./Slide3";
import "./HomeSlide.css";
import { Link } from "react-router-dom";
// import Title from "antd/es/typography/Title";
import { useGetFacilityQuery } from "../../../redux/features/facility/facilityApi";

interface Facility {
  _id: string;
  name: string;
  image: string;
  location: string;
  pricePerHour: number;
  description: string;
  createdAt: string;
}

const HomeSlide = () => {
  const totalSlides = 3;
  const [slideIndex, setSlideIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [direction, setDirection] = useState("right"); // Track the direction of the animation

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { data: facilitiesData = [] } = useGetFacilityQuery(undefined, {
    pollingInterval: 600000, // Polls every 10 minutes
  });

  const [latestFacilities, setLatestFacilities] = useState<Facility[]>([]);

  const facilities = facilitiesData?.data;

  // Fetch the latest 4 sports facilities
  useEffect(() => {
    if (facilities && facilities.length > 0) {
      const sortedFacilities = [...facilities].sort(
        (a: Facility, b: Facility) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      setLatestFacilities(sortedFacilities.slice(0, 1)); // Get the latest 1 facility
    }
  }, [facilities]);

  const latestFacilityId =
  latestFacilities.length > 0 ? latestFacilities[0]._id : '';

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
                position: "relative", // Ensure card is a positioning context for children
                overflow: "hidden", // Hide overflow to prevent SVG from appearing outside the card
              }}
            >
              <div style={{ zIndex: 1, position: "relative" }}>
                <Row>
                  <Col span={12}>
                    <div>
                      <Link to="/">
                        <Image
                          width={120}
                          src="/SportifyNow.png"
                          alt="SportifyNow"
                          preview={false}
                        />
                      </Link>
                    </div>
                    <h1
                      // level={1}
                      style={{
                        textAlign: "left",
                        // marginBottom: "1vh",
                        color: "#FBFCF8",
                        zIndex: 1,
                      }}
                    >
                      Sportify Now
                    </h1>

                    <h3
                      // level={3}
                      style={{
                        textAlign: "left",
                        // marginBottom: "4vh",
                        color: "#FBFCF8",
                        zIndex: 1,
                      }}
                    >
                      Easy Booking, Epic Games
                    </h3>
                  </Col>
                  <Col span={12}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "start",
                        height: "auto",
                      }}
                    >
                      <Image
                        width={160}
                        src="/sportCeleb.jpg"
                        alt="HeroCover"
                        preview={false}
                        style={{
                          borderRadius: "100px",
                          marginTop: '-2vh'
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: '-3vh'
                      }}
                    >
                      <p
                        style={{
                          textAlign: "left",
                          color: "#FBFCF8",
                          zIndex: 1,
                          fontSize: "15px",
                        }}
                      >
                        <span>Explore Our</span>
                        <br />
                        <span>Latest Facility</span>
                      </p>
                      <Link to={`/sports/${latestFacilityId}`}>
                        <div
                          style={{
                            backgroundColor: isHovered ? "#464f59" : "#819bb5",
                            width: "7rem",
                            height: "3rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "40px",
                            cursor: "pointer",
                          }}
                          onMouseEnter={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                        >
                          <p style={{ fontSize: "100%", fontWeight: "bold" }}>
                            Book Now
                          </p>
                        </div>
                      </Link>
                    </div>
                  </Col>
                </Row>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 10 1440 298"
                className="wave-svg"
              >
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
                  marginLeft: isMobile ? "8vw" : "0vw",
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
