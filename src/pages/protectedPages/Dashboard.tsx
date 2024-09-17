import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { gradientStyle } from "../../styles/gradientStyle";
import { Col, Image, Row,  } from "antd";
import { useEffect, useState } from "react";
import "./Dashboard.css";
import { avatar1, avatar2 } from "./Avatar";
import TodayBooking from "../../components/ui/Booking/TodayBooking";
import TodayUserBooking from "../../components/ui/Booking/TodayUserBooking";


const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user!);

  let avatar = user.avatar;

  if (!avatar || avatar === "") {
    avatar = user.sex === "male" ? avatar1 : avatar2;
  }

  const [isBurst, setIsBurst] = useState(false);
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

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const handleMouseEnter = () => {
    setIsBurst(true);
  };

  const handleAnimationEnd = () => {
    setIsBurst(false);
  };

  return (
    <div>
      <div
        style={{
          ...gradientStyle,
          height: "auto",
          margin: "5px",
          borderRadius: "10px",
          color: "#F0F8FF",
          border: "1px solid transparent",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "1vh 3vw",
          }}
        >
          <h4>{formattedDate}</h4>
          <Row>
            {isMobile ? (
              <>
                <Col
                  span={24}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    height={150}
                    src={avatar}
                    alt="SportifyNow"
                    preview={false}
                    className="avatar-image"
                  />
                </Col>
                <Col
                  span={24}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src="/sports.png"
                    alt="SportifyNow"
                    style={{
                      height: "12vh",
                      marginTop: "2vh",
                      filter:
                        "drop-shadow(5px 5px 10px rgba(154, 10, 96, 0.8))",
                      transform: "rotateY(25deg)",
                      borderRadius: "10px",
                    }}
                    preview={false}
                  />
                </Col>
                <Col span={24}>
                  <div className="welcome-text">
                    <h1 style={{ marginTop: "2%" }}>
                      {user.newUser
                        ? `Welcome, ${user.name}!`
                        : `Welcome Back, ${user.name}!`}
                    </h1>
                    <p>Book your slot, and enjoy our epic games.</p>
                  </div>
                </Col>
              </>
            ) : (
              <>
                <Col span={12}>
                  <div style={{ marginTop: "3%" }} className="welcome-text">
                    <h1 style={{ marginTop: "2%" }}>
                      {user.newUser
                        ? `Welcome, ${user.name}!`
                        : `Welcome Back, ${user.name}!`}
                    </h1>
                    <p>Book your slot, and enjoy our epic games.</p>
                  </div>
                </Col>
                <Col
                  span={12}
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "right",
                      alignItems: "end",
                      height: "100%",
                    }}
                  >
                    <Image
                      src="/sports.png"
                      alt="SportifyNow"
                      style={{
                        height: "8vh",
                        marginBottom: "5px",
                        filter:
                          "drop-shadow(5px 5px 10px rgba(154, 10, 96, 0.8))",
                        transform: "rotateY(25deg)",
                        borderRadius: "10px",
                      }}
                      preview={false}
                    />
                  </div>
                  <Image
                    src={avatar}
                    alt="SportifyNow"
                    style={{
                      height: "15vh",
                    }}
                    preview={false}
                    className="avatar-image"
                  />
                </Col>
              </>
            )}
          </Row>
        </div>
        <div
          className="ball-container"
          onMouseEnter={handleMouseEnter}
          onAnimationEnd={handleAnimationEnd}
        >
          {!isBurst && <div className="ball"></div>}
          {isBurst && (
            <div className="burst-container">
              {Array.from({ length: 20 }).map((_, index) => {
                const angle = (Math.PI * 2 * index) / 20;
                const distance = 100 + Math.random() * 50;
                const dx = Math.cos(angle) * distance;
                const dy = Math.sin(angle) * distance;
                return (
                  <div
                    key={index}
                    className="mini-ball"
                    style={
                      {
                        "--dx": `${dx}px`,
                        "--dy": `${-dy}px`,
                        animationDelay: `${Math.random() * 0.5}s`,
                        animationDuration: `${1 + Math.random() * 0.5}s`,
                      } as React.CSSProperties // Casting to accept custom properties
                    }
                  ></div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {user.role=== 'admin' && <TodayBooking/>}
      {user.role=== 'user' && <TodayUserBooking/>}

    </div>
  );
};

export default Dashboard;
