import React from "react";
import { Card, Button } from "antd";
import { Link } from "react-router-dom";
import { FiMapPin, FiDollarSign } from "react-icons/fi";

// Define the facility interface
interface Facility {
  _id: string;
  name: string;
  image: string;
  location: string;
  pricePerHour: number;
  description: string;
}

// Props type for SportCard
interface SportCardProps {
  facility: Facility;
}

// Utility function to truncate description
const truncateDescription = (description: string, wordLimit: number = 15) => {
  const words = description.split(" ");
  if (words.length <= wordLimit) {
    return description;
  }
  const truncated = words.slice(0, wordLimit).join(" ");
  return `${truncated} ...`;
};

const SportCard: React.FC<SportCardProps> = ({ facility }) => {
  // Truncate the description
  const truncatedDescription = truncateDescription(facility.description);

  return (
    <Card
      hoverable
      cover={
        <img
          alt={facility.name}
          src={facility.image}
          style={{ height: "150px", objectFit: "cover" }}
        />
      }
      style={{
        borderRadius: "8px",
        height: "48vh",
        border: "1px solid #fbfcf850",
        boxShadow: "0 4px 8px #fbfcf850",
        color: "#FBFCF8",
      }}
    >
      <h2>{facility.name}</h2>
      <p>{truncatedDescription}</p>
      <p>
        <FiDollarSign /> <strong>Price:</strong> ${facility.pricePerHour}/hour
      </p>
      <p>
        <FiMapPin /> <strong>Location:</strong> {facility.location}
      </p>
      <Link to={`/sports/${facility._id}`}>
        <Button type="primary">View Details</Button>
      </Link>
    </Card>
  );
};

export default SportCard;
