import React, { useState } from "react";
import { Row, Col, Card, Button, Progress, Modal } from "antd";
import {
  GiftOutlined,
  //   StarOutlined,
  //   TrophyOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { RiPoliceBadgeLine } from "react-icons/ri";

interface Tier {
  name: string;
  description: string;
  pointsRange: string;
  color: string;
  icon: React.ReactNode;
  benefits: string[];
}

const LoyaltyPledge: React.FC = () => {
  const [isLearnMoreModalVisible, setLearnMoreModalVisible] = useState(false);
  const [activeTier, setActiveTier] = useState<Tier | null>(null);

  const tiers: Tier[] = [
    {
      name: "Silver",
      description: "0 - 500 Points",
      pointsRange: "0 to 500",
      color: "#c0c0c0",
      icon: (
        <RiPoliceBadgeLine style={{ fontSize: "40px", color: "#c0c0c0" }} />
      ),
      benefits: [
        "Basic Benefits",
        "10 Rewards Points on refer",
        "One free sports trainer session weekly",
        "One free diet session weekly",
      ],
    },
    {
      name: "Gold",
      description: "500 - 20,000 Points",
      pointsRange: "500 to 20000",
      color: "#FFD700",
      icon: (
        <RiPoliceBadgeLine style={{ fontSize: "40px", color: "#FFD700" }} />
      ),
      benefits: [
        "5% discount on every booking",
        "20 Rewards Points on refer",
        "One free drink weekly",
        "Includes Silver Tier benefits",
      ],
    },
    {
      name: "Diamond",
      description: "20,000+ Points",
      pointsRange: "20000+",
      color: "#00FFFF",
      icon: (
        <RiPoliceBadgeLine style={{ fontSize: "40px", color: "#00FFFF" }} />
      ),
      benefits: [
        "9% discount on every booking",
        "30 Rewards Points on refer",
        "Three free drinks weekly",
        "One free nutritious meal",
        "Includes Gold and Silver Tier benefits",
      ],
    },
  ];

  const cardStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Transparent white
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    textAlign: "center" as const,
    padding: "20px",
    height: "300px",
  };

  const sectionStyle = {
    background: "transparent",
    padding: "50px 20px",
    color: "#fff",
    textAlign: "center" as const,
  };

  const showLearnMoreModal = () => {
    setLearnMoreModalVisible(true);
  };

  const showTierModal = (tier: Tier) => {
    setActiveTier(tier);
  };

  const closeModal = () => {
    setLearnMoreModalVisible(false);
    setActiveTier(null);
  };

  return (
    <div style={sectionStyle}>
      <h1 style={{ color: "#fff", fontSize: "3rem", marginBottom: "30px" }}>
        Loyalty Program & Rewards
      </h1>
      <p style={{ color: "#fff", fontSize: "1.2rem", marginBottom: "50px" }}>
        Earn points for every booking and enjoy exclusive rewards. The more you
        book, the more you unlock!
      </p>

      {/* Earn Benefits Section */}
      <div>
        <h2 style={{ color: "#fff", fontSize: "2rem", marginBottom: "30px" }}>
          Earn Rewards
        </h2>
        <Row
          gutter={[16, 16]}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Col xs={24} md={12} lg={6}>
            <Card style={cardStyle} bordered={false} hoverable>
              <GiftOutlined style={{ fontSize: "40px", color: "#ffc107" }} />
              <h2>Points for Every Booking</h2>
              <p>
                Earn points with each booking and redeem them for special
                discounts and perks.
              </p>
              <Button
                type="primary"
                onClick={showLearnMoreModal}
                style={{
                  zIndex: 0,
                }}
              >
                Learn More
              </Button>
            </Card>
          </Col>

          <Col xs={24} md={12} lg={6}>
            <Card style={cardStyle} bordered={false} hoverable>
              <ShareAltOutlined
                style={{ fontSize: "40px", color: "#8bc34a" }}
              />
              <h2>Referral Bonuses</h2>
              <p>Earn extra points by referring friends to our platform.</p>
              <Button
                style={{
                  zIndex: 0,
                }}
                type="primary"
              >
                Refer a Friend
              </Button>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Badges Section */}
      <div style={{ marginBottom: "60px" }}>
        <h2 style={{ color: "#fff", fontSize: "2rem", marginBottom: "30px" }}>
          Tier Badges
        </h2>
        <p style={{ color: "#fff", fontSize: "1rem", marginBottom: "50px" }}>
          Based on total earned reward points
        </p>
        <Row gutter={[16, 16]}>
          {tiers.map((tier) => (
            <Col key={tier.name} xs={24} md={12} lg={8}>
              <Card style={cardStyle} bordered={false} hoverable>
                {tier.icon}
                <h2>{tier.name} Tier</h2>
                <p>{tier.description}</p>
                <Progress
                  percent={
                    tier.name === "Silver"
                      ? 25
                      : tier.name === "Gold"
                      ? 75
                      : 100
                  }
                  strokeColor={tier.color}
                  trailColor="#445261"
                  showInfo={false}
                />
                <Button
                  type="primary"
                  onClick={() => showTierModal(tier)}
                  style={{
                    zIndex: 0,
                  }}
                >
                  Explore {tier.name}
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Learn More Modal */}
      <Modal
        title="Booking Rewards"
        open={isLearnMoreModalVisible}
        onCancel={closeModal}
        footer={null}
      >
        <p>Different sports bookings earn different points:</p>
        <ul>
          <li>Football: 5 points per hour</li>
          <li>Basketball: 4 points per hour</li>
          <li>Tennis: 3 points per hour</li>
          <li>Swimming: 2 points per hour</li>
        </ul>
      </Modal>

      {/* Tier Modal */}
      {activeTier && (
        <Modal
          title={`${activeTier.name} Tier Benefits`}
          open={!!activeTier}
          onCancel={closeModal}
          footer={null}
        >
          <ul>
            {activeTier.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </Modal>
      )}
    </div>
  );
};

export default LoyaltyPledge;
