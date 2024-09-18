import { useEffect, useState } from "react";
import { Spin, Row, Col, Typography, Card, Avatar, Modal } from "antd";
import { PiUserDuotone } from "react-icons/pi";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay, EffectCards } from "swiper/modules";
import { useGetAllReviewsQuery } from "../../../redux/features/review/reviewApi";
import "./AllReviews.css";

const { Title, Text, Link } = Typography;
const { Meta } = Card;

interface Review {
  _id: string;
  userId: { _id: string; name: string; avatar?: string };
  facilityId: { _id: string; name: string; description: string };
  content: string;
}

const AllReviews = () => {
  const { data: reviewsData = [], isLoading } = useGetAllReviewsQuery(
    undefined,
    {
      pollingInterval: 600000, // Poll every 10 minutes
    },
  );

  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null); // For modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (reviewsData && reviewsData.data) {
      setReviews(reviewsData.data);
    }
  }, [reviewsData]);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Spin size="large" />
      </div>
    );
  }

  const handleFacilityClick = (facilityId: string) => {
    navigate(`/sports/${facilityId}`);
  };

  const handleReadMoreClick = (review: Review) => {
    setSelectedReview(review);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const truncateContent = (content: string, wordLimit: number) => {
    const words = content.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return content;
  };

  const isLoopEnabled = reviews.length > 1; // Check if there are enough reviews for looping

  return (
    <div style={{ padding: "2vh 8vw" }}>
      <Title
        level={1}
        style={{ textAlign: "center", marginBottom: "5vh", color: "#FBFCF8" }}
      >
        User Reviews
      </Title>

      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCards]}
        spaceBetween={0} // For cards effect, space between slides should be zero
        slidesPerView={1}
        // navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={isLoopEnabled}
        effect="cards"
        cardsEffect={{
          slideShadows: false, // You can enable/disable slide shadows
          rotate: true, // Set rotate to false for flat card transitions, or enable for 3D feel
        }}
        className="reviews-swiper"
        style={{
          display: "flex",
          justifyContent: "center",
          //   background: "linear-gradient(to bottom right, rgb(0, 0, 0) 0%, rgb(1, 1, 9) 45%, rgb(1, 1, 9) 55%, rgba(0, 0, 0, 1) 100%)",
          borderRadius: "25px",
          zIndex: "0",
          padding: '20px',
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide
            style={{
              backgroundColor: "transparent",
            }}
            key={review._id}
          >
            <Row
              justify="center"
              style={{
                backgroundColor: "transparent",
              }}
            >
              <Col
                xs={24}
                sm={16}
                md={12}
                style={{
                  backgroundColor: "transparent",
                }}
              >
                <Card
                  hoverable
                  style={{
                    borderRadius: "10px",
                    textAlign: "left",
                    marginBottom: "20px",
                    backgroundColor: "black",
                    minHeight: "180px",
                    width: "320px",
                    border: "1px solid #fbfcf850",
                    boxShadow: "0 4px 8px #fbfcf850",
                    color: "#FBFCF8",
                    zIndex: "0",
                  }}
                >
                  <Meta
                    avatar={
                      review.userId.avatar ? (
                        <Avatar src={review.userId.avatar} size={50} />
                      ) : (
                        <PiUserDuotone
                          style={{ fontSize: "45px", color: "white" }}
                        />
                      )
                    }
                    title={
                      <Text style={{ fontSize: "20px", color: "white" }} strong>
                        {review.userId.name}
                      </Text>
                    }
                    description={
                      <div>
                        <Link
                          onClick={() =>
                            handleFacilityClick(review.facilityId._id)
                          }
                          style={{
                            color: "#1890ff",
                            fontSize: "18px",
                            marginBottom: "10px",
                            display: "block",
                          }}
                        >
                          {review.facilityId.name}
                        </Link>
                        <Text
                          style={{
                            color: "#abb9c7",
                            fontSize: "16px",
                            marginBottom: "10px",
                            display: "block",
                          }}
                        >
                          {truncateContent(review.content, 6)}{" "}
                          {review.content.split(" ").length > 6 && (
                            <Link
                              style={{ color: "#1890ff", cursor: "pointer" }}
                              onClick={() => handleReadMoreClick(review)}
                            >
                              Read More
                            </Link>
                          )}
                        </Text>
                      </div>
                    }
                  />
                </Card>
              </Col>
            </Row>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal for full review */}
      <Modal
        title={`${selectedReview?.userId.name}'s detailed review`}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        centered
        bodyStyle={{
          backgroundColor: "transparent",
        }}
      >
        {selectedReview && (
          <Card
            hoverable
            style={{
              borderRadius: "10px",
              textAlign: "left",
              marginBottom: "20px",
              backgroundColor: "transparent",
              minHeight: "180px",
              width: "100%",
              border: "1px solid #fbfcf850",
              boxShadow: "0 4px 8px #fbfcf850",
              color: "#FBFCF8",
            }}
          >
            <Meta
              avatar={
                selectedReview.userId.avatar ? (
                  <Avatar src={selectedReview.userId.avatar} size={50} />
                ) : (
                  <PiUserDuotone style={{ fontSize: "45px", color: "black" }} />
                )
              }
              title={
                <Text style={{ fontSize: "20px", color: "#303a42" }} strong>
                  {selectedReview.userId.name}
                </Text>
              }
              description={
                <div>
                  <Link
                    onClick={() =>
                      handleFacilityClick(selectedReview.facilityId._id)
                    }
                    style={{
                      color: "#2b679e",
                      fontSize: "18px",
                      marginBottom: "10px",
                      display: "block",
                    }}
                  >
                    {selectedReview.facilityId.name}
                  </Link>
                  <Text
                    style={{
                      color: "#505961",
                      fontSize: "16px",
                      marginBottom: "10px",
                      display: "block",
                    }}
                  >
                    {selectedReview.content}
                  </Text>
                </div>
              }
            />
          </Card>
        )}
      </Modal>
    </div>
  );
};

export default AllReviews;
