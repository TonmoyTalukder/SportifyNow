import { useState } from "react";
import {
  Input,
  Row,
  Col,
  Slider,
  Space,
  ConfigProvider,
  Segmented,
  Spin,
  Pagination,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "../../styles/Sports.css"; // For custom styles
import { useGetFacilityQuery } from "../../redux/features/facility/facilityApi";
import { gradientStyle } from "../../styles/gradientStyle";
import SportCard from "../../components/ui/Cards/SportCard";

// Define the facility interface
interface Facility {
  _id: string;
  name: string;
  image: string;
  location: string;
  pricePerHour: number;
  description: string;
}

// Main Sports component
const Sports = () => {
  const { data: facilitiesData = [], isLoading } = useGetFacilityQuery(undefined, {
    pollingInterval: 600000, // Polls every 10 minutes
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]); // Assuming price range between 0-100
  const [priceSortOption, setPriceSortOption] = useState<string | null>(null);
  const [nameSortOption, setNameSortOption] = useState<string | null>(null);
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const facilitiesPerPage = 8; // Show 8 facilities per page

  const facilities = facilitiesData.data;

  // Log the facilities to debug
  // console.log("Facilities:", facilities);

  // Filtered facilities based on search terms and price range
  const filteredFacilities = Array.isArray(facilities)
    ? facilities
        .filter(
          (facility: Facility) =>
            facility.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            facility.location
              .toLowerCase()
              .includes(locationTerm.toLowerCase()) &&
            facility.pricePerHour >= priceRange[0] &&
            facility.pricePerHour <= priceRange[1],
        )
        .sort((a, b) => {
          if (priceSortOption === "priceLowToHigh") {
            return a.pricePerHour - b.pricePerHour;
          }
          if (priceSortOption === "priceHighToLow") {
            return b.pricePerHour - a.pricePerHour;
          }
          if (nameSortOption === "nameAToZ") {
            return a.name.localeCompare(b.name);
          }
          if (nameSortOption === "nameZToA") {
            return b.name.localeCompare(a.name);
          }
          return 0; // Default case when no sorting option is selected
        })
    : [];

  // Pagination logic: slice the array to get facilities for the current page
  const startIndex = (currentPage - 1) * facilitiesPerPage;
  const paginatedFacilities = filteredFacilities.slice(
    startIndex,
    startIndex + facilitiesPerPage
  );

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={gradientStyle} className="sports-container">
      <h1
        style={{
          color: "#fff",
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "40px",
        }}
      >
        Sports Facilities
      </h1>

      {/* Search & Filters */}
      <div className="filters-container">
        <Space.Compact size="large" style={{ width: "auto" }}>
          <Input
            addonBefore={<SearchOutlined style={{ color: "white" }} />}
            placeholder="Search by facility name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Input
            placeholder="Search by location"
            value={locationTerm}
            onChange={(e) => setLocationTerm(e.target.value)}
          />
        </Space.Compact>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            marginTop: "5px",
          }}
        >
          <span style={{ color: "#fff" }}>
            Price Range: {priceRange[0]} - {priceRange[1]}{" "}
          </span>
          <ConfigProvider
            theme={{
              components: {
                Slider: {
                  railBg: "#FBFCF8",
                  railHoverBg: "#002f4d",
                },
              },
            }}
          >
            <Slider
              range
              defaultValue={priceRange}
              min={0}
              max={100}
              onChange={(value) => setPriceRange(value)}
              style={{ width: "350px" }}
            />
          </ConfigProvider>
        </div>

        {/* Sorting Options */}
        <div
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <ConfigProvider
            theme={{
              components: {
                Segmented: {
                  itemSelectedBg: '#91caff'
                },
              },
            }}
          >
            <Segmented
              options={[
                { label: "Price Low to High", value: "priceLowToHigh" },
                { label: "Price High to Low", value: "priceHighToLow" },
              ]}
              value={priceSortOption}
              onChange={(value) => {
                setPriceSortOption(value as string);
                setNameSortOption(null); // Reset name sort option
              }}
              style={{ width: "auto", marginBottom: "10px" }}
            />
            <Segmented
              options={[
                { label: "Name A to Z", value: "nameAToZ" },
                { label: "Name Z to A", value: "nameZToA" },
              ]}
              value={nameSortOption}
              onChange={(value) => {
                setNameSortOption(value as string);
                setPriceSortOption(null); // Reset price sort option
              }}
              style={{ width: "auto", marginBottom: "10px" }}
            />
          </ConfigProvider>
        </div>
      </div>

      {/* Facility Cards */}
      <Row
        gutter={[16, 16]}
        style={{
          padding: "1vh 2vw",
        }}
      >
        {paginatedFacilities.map((facility: Facility) => (
          <Col key={facility._id} xs={24} sm={12} md={8} lg={6}>
            <SportCard facility={facility} />
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Pagination
          current={currentPage}
          pageSize={facilitiesPerPage}
          total={filteredFacilities.length}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default Sports;
