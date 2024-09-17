import { useParams } from "react-router-dom";
import { Typography, Divider, Card, Spin, Col, Row } from "antd";
import CheckAvailability from "../../../components/ui/Booking/CheckAvailability";
import { useGetSingleFacilityQuery } from "../../../redux/features/facility/facilityApi";

const { Title, Text } = Typography;

const Booking = () => {
  const { id } = useParams<{ id: string }>();
  const { data: facilityData, isLoading } = useGetSingleFacilityQuery(id);
  const facility = facilityData?.data;

  if (!id) {
    return <Text type="danger">Facility ID not found</Text>;
  }

  if (isLoading) {
    return <Spin tip="Loading facility details..." />;
  }

  //   if (error) {
  //     return <Alert message={`Error loading facility details: ${error.message}`} type="error" showIcon />;
  //   }

  return (
    <Row gutter={[16, 16]} justify="center" style={{ padding: "0px" }}>
      <Col xs={24} md={12} lg={12}>
        <div
          style={{
            margin: "24px 0",
            padding: "24px",
            borderRadius: "15px",
            background: "rgba(255, 255, 255, 0.1)",
          }}
        >
          <Title
            level={2}
            style={{
              color: "white",
            }}
          >
            Booking for {facility?.name || id}
          </Title>
          <Divider />

          <Card
            bordered={false}
            style={{
              background: "rgba(8, 8, 8, 0.2)",
              color: "#fff",
            }}
          >
            <h2>Facility Overview</h2>
            <p>{facility?.description || "No description available."}</p>
          </Card>

          <Divider />

          <CheckAvailability facilityId={id} />
        </div>
      </Col>
    </Row>
  );
};

export default Booking;
