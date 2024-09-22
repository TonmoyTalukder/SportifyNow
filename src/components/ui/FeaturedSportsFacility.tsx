import { useEffect, useState } from "react";
import { useGetFacilityQuery } from "../../redux/features/facility/facilityApi";
import { Spin, Row, Col, Typography } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow"; // Import effect-coverflow styles
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules"; // Import EffectCoverflow
import SportCard from "../../components/ui/Cards/SportCard";
import "../../styles/FeaturedSportsFacility.css";
import './FeturedSports.css'

// Ant Design components
const { Title } = Typography;

interface Facility {
  _id: string;
  name: string;
  image: string;
  location: string;
  pricePerHour: number;
  description: string;
  createdAt: string;
}

const FeaturedSportsFacility = () => {
  const { data: facilitiesData = [], isLoading } = useGetFacilityQuery(undefined, {
    pollingInterval: 600000, // Polls every 10 minutes
  });

  const [latestFacilities, setLatestFacilities] = useState<Facility[]>([]);

  const facilities = facilitiesData.data;

  // Fetch the latest 4 sports facilities
  useEffect(() => {
    if (facilities && facilities.length > 0) {
      const sortedFacilities = [...facilities].sort(
        (a: Facility, b: Facility) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setLatestFacilities(sortedFacilities.slice(0, 4)); // Get the latest 4 facilities
    }
  }, [facilities]);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Spin size="large" />
      </div>
    );
  }

  const isLoopEnabled = latestFacilities.length > 1; // Check if there are enough slides for looping
  

  return (
    <div style={{ padding: "2vh 8vw" }} className="featured-sports">
      <Title
        level={1}
        style={{ textAlign: "center", marginBottom: "5vh", color: "#FBFCF8" }}
      >
        Featured Sports Facilities
      </Title>

      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]} // Add EffectCoverflow module
        effect="coverflow" // Use the coverflow effect
        spaceBetween={0}
        slidesPerView={1}
        centeredSlides
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={isLoopEnabled} // Enable loop only if there are enough slides
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }} // Apply coverflow effect options
        className="custom-swiper"
        style={{
            zIndex: '0'
        }}
      >
        {latestFacilities.map((facility) => (
          <SwiperSlide key={facility._id}>
            <Row justify="center">
              <Col xs={24} sm={16} md={12}>
                <SportCard facility={facility} />
              </Col>
            </Row>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedSportsFacility;
