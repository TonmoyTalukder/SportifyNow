import { Button, Card, Col, Row, Typography } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { gradientStyle } from "../../styles/gradientStyle";
import { useGetSingleFacilityQuery } from "../../redux/features/facility/facilityApi";
import NotFound from "../errors/NotFound";

const { Title, Paragraph } = Typography;

const SportDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: facilityData, isLoading } = useGetSingleFacilityQuery(id);
  const facility = facilityData?.data;

  if (isLoading) return <p>Loading...</p>;
  if (!facility) return <NotFound />;

  const handleBookNow = () => {
    navigate(`/booking/${id}`);
  };

  return (
    <div style={gradientStyle} className="sports-details-container">
      <Row gutter={[16, 16]} justify="center" style={{ padding: "20px" }}>
        <Col xs={24} md={12} lg={8}>
          <Card
            hoverable
            cover={
              <img
                alt={facility.name}
                src={facility.image}
                style={{ height: "200px", objectFit: "cover" }}
              />
            }
            style={{
              borderRadius: "8px",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              boxShadow: "0 4px 8px #fbfcf850",
              border: "1px solid #fbfcf850",
            }}
          >
            <Title level={3} style={{ color: "#FBFCF8" }}>
              {facility.name}
            </Title>
            <Paragraph style={{ color: "#FBFCF8" }}>
              <strong>Location:</strong> {facility.location}
            </Paragraph>
            <Paragraph style={{ color: "#FBFCF8" }}>
              <strong>Price:</strong> ${facility.pricePerHour}/hour
            </Paragraph>
            <Paragraph style={{ color: "#FBFCF8" }}>
              <strong>Description:</strong>
              <br />
              {facility.description}
            </Paragraph>
            <Button
              type="primary"
              size="large"
              onClick={handleBookNow}
              style={{ width: "100%" }}
            >
              Book Now
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SportDetails;
