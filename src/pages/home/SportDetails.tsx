import { Button, Card, Col, Row, Typography } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { gradientStyle } from "../../styles/gradientStyle";
import { useGetSingleFacilityQuery } from "../../redux/features/facility/facilityApi";
import NotFound from "../errors/NotFound";
import { FiMapPin, FiDollarSign, FiAward } from "react-icons/fi";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/hook";
import { redirectBooking } from "../../redux/features/auth/authSlice";
import SingleSportReview from "../../components/ui/Review/SingleSportReview";

const { Title, Paragraph } = Typography;

const SportDetails = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: facilityData, isLoading } = useGetSingleFacilityQuery(id);
  const facility = facilityData?.data;

  if (isLoading) return <p>Loading...</p>;
  if (!facility) return <NotFound />;

  const handleBookNow = () => {
    if (user) {
      navigate(`/booking/${id}`);
    } else {
      dispatch(
        redirectBooking({ fromBooking: true, bookingURL: `/booking/${id}` }),
      );
      navigate("/login");
    }
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
              marginBottom: '0',
            }}
          >
            <Title level={3} style={{ color: "#FBFCF8" }}>
              {facility.name}
            </Title>
            <Paragraph style={{ color: "#FBFCF8" }}>
              <FiMapPin /> <strong>Location:</strong> {facility.location}
            </Paragraph>
            <Paragraph style={{ color: "#FBFCF8" }}>
              <FiDollarSign /> <strong>Price:</strong> ${facility.pricePerHour}
              /hour
            </Paragraph>
            <Paragraph style={{ color: "#FBFCF8" }}>
              <FiAward /> <strong>Rewards Point:</strong> {facility.rewards}
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
              style={{ width: "100%", zIndex: 0 }}
            >
              Book Now
            </Button>
          </Card>

          <div>
            <SingleSportReview />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SportDetails;
