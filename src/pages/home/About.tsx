import React from "react";
import { Row, Col, Card, Timeline, Tabs, ConfigProvider } from "antd";
import {
  HomeOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { avatar1, avatar2 } from "../protectedPages/Avatar";

const About: React.FC = () => {
  const tabItems = [
    {
      key: "1",
      label: "Mission",
      children: (
        <Card
          title="Mission"
          style={{ marginRight: 20, backgroundColor: "#FBFCF8" }}
        >
          <p style={{ color: "black" }}>
            {" "}
            At SportifyNow, our mission is to revolutionize the way athletes and
            sports enthusiasts connect with high-quality sports facilities. We
            are dedicated to providing an exceptional booking experience by
            bridging the gap between players and premier venues. Our goal is to
            ensure that every user—whether a professional athlete, a
            recreational player, or a community organizer—has access to the best
            sports facilities that meet their specific needs and preferences.{" "}
          </p>{" "}
          <p style={{ color: "black" }}>
            {" "}
            We strive to simplify the process of finding and booking sports
            venues by leveraging advanced technology, user-friendly interfaces,
            and comprehensive facility information. Our platform is designed to
            offer a seamless, transparent, and efficient experience from start
            to finish, allowing users to focus on their game rather than
            administrative hassles.{" "}
          </p>{" "}
          <p style={{ color: "black" }}>
            {" "}
            We are committed to fostering a vibrant sports community by
            facilitating access to a diverse range of facilities, from
            state-of-the-art gyms and courts to well-maintained fields and
            arenas. Our dedication extends to continuously enhancing our
            services, seeking feedback from our users, and adapting to the
            ever-evolving demands of the sports industry.{" "}
          </p>{" "}
          <p style={{ color: "black" }}>
            {" "}
            Our innovative approach goes beyond just providing a booking
            platform; we aim to build lasting relationships with our users by
            offering personalized recommendations and tailored experiences. By
            utilizing data-driven insights, we ensure that each facility
            suggestion aligns with the unique preferences and requirements of
            our users, enhancing their overall satisfaction.{" "}
          </p>{" "}
          <p style={{ color: "black" }}>
            {" "}
            At SportifyNow, we believe in the power of sports to unite
            communities and inspire individuals. We actively support local
            sports initiatives and work closely with facility owners to promote
            inclusivity and accessibility. By championing these values, we aim
            to contribute to a healthier, more active society where everyone has
            the opportunity to enjoy their favorite sports.{" "}
          </p>{" "}
          <p style={{ color: "black" }}>
            {" "}
            Looking ahead, we are committed to staying at the forefront of
            technological advancements and industry trends. Our team
            continuously explores new ways to enhance our platform, improve user
            experience, and expand our network of facilities. We are driven by a
            passion for excellence and a relentless pursuit of innovation,
            ensuring that SportifyNow remains the premier choice for sports
            facility booking.{" "}
          </p>{" "}
          <p style={{ color: "black" }}>
            {" "}
            Through our passion for sports and innovation, we aim to support
            athletes of all levels in achieving their goals, promoting active
            lifestyles, and bringing people together through the joy of sports.
            At SportifyNow, we believe that the right venue can make all the
            difference, and we are here to ensure that every booking experience
            is as outstanding as the facilities we offer.{" "}
          </p>
        </Card>
      ),
    },
    {
      key: "2",
      label: "Our Team",
      children: (
        <Card
          title="Our Team"
          style={{ marginRight: 20, backgroundColor: "#FBFCF8" }}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card
                style={{
                  width: "auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                cover={
                  <img
                    style={{
                      maxWidth: "5vw",
                      marginTop: "1vh",
                    }}
                    alt="team-member"
                    src={avatar1}
                  />
                }
                title="John Doe"
                bordered={false}
              >
                <p>CEO & Founder</p>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                style={{
                  width: "auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                cover={
                  <img
                    style={{
                      maxWidth: "5vw",
                      marginTop: "1vh",
                    }}
                    alt="team-member"
                    src={avatar2}
                  />
                }
                title="Jane Smith"
                bordered={false}
              >
                <p>Chief Operating Officer</p>
              </Card>
            </Col>
          </Row>
        </Card>
      ),
    },
    {
      key: "3",
      label: "Our Journey",
      children: (
        <Card
          title="Our Journey"
          style={{
            marginRight: 20,
            backgroundColor: "#FBFCF8",
            maxHeight: "50vh",
            overflowY: "auto",
          }}
        >
          <Timeline mode="alternate">
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item color="green">
              Reached 10k bookings in 2017
            </Timeline.Item>
            <Timeline.Item
              dot={<ClockCircleOutlined style={{ fontSize: "16px" }} />}
            >
              Launched mobile app with advanced features in 2019
            </Timeline.Item>
            <Timeline.Item color="red">
              Expanded to 5 new cities in 2021
            </Timeline.Item>
            <Timeline.Item>Create new partnerships 2022-01-01</Timeline.Item>
            <Timeline.Item
              dot={<ClockCircleOutlined style={{ fontSize: "16px" }} />}
            >
              Continuing to innovate and expand our platform
            </Timeline.Item>
          </Timeline>
        </Card>
      ),
    },
    {
      key: "4",
      label: "Contact Us",
      children: (
        <Card
          title="Contact Us"
          style={{ marginRight: 20, backgroundColor: "#FBFCF8" }}
        >
          <p style={{ color: "black" }}>
            <HomeOutlined /> Office: 123 Sports Ave, Cityname
          </p>
          <p style={{ color: "black" }}>
            <PhoneOutlined /> Phone: +1 (123) 456-7890
          </p>
          <p style={{ color: "black" }}>
            <MailOutlined /> Email: info@sportifynow.com
          </p>
        </Card>
      ),
    },
  ];

  return (
    <div
      style={{
        color: "#FBFCF8",
        marginTop: "4vh",
        padding: "0vh 1vw",
      }}
    >
      <Row gutter={[16, 16]} justify="center" style={{ padding: "0px" }}>
        <Col xs={24} md={12} lg={12}>
          <Card
            hoverable
            style={{
              borderRadius: "8px",
              backgroundColor: "rgba(0, 0, 0, 0.0)",
              boxShadow: "0 4px 8px #fbfcf850",
              border: "1px solid #fbfcf850",
            }}
          >
            <h1
              style={{
                textAlign: "center",
              }}
            >
              Our Story
            </h1>
            <Row gutter={[24, 24]}>
              {/* Navigation Tabs */}
              <Col xs={24} sm={24}>
                <ConfigProvider
                  theme={{
                    components: {
                      Tabs: {
                        colorText: "#FBFCF8",
                      },
                    },
                  }}
                >
                  <Tabs size="small" tabPosition="left" items={tabItems} />
                </ConfigProvider>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default About;
