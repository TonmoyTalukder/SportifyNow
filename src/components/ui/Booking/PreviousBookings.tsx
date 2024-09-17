import { useState } from "react";
import { Table, Tag, Space, Input, Switch } from "antd";
import moment from "moment";
import { useGetUserBookingsQuery } from "../../../redux/features/booking/bookingApi";
import { isPreviousBooking } from "../../../utils/bookingStatus";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const { Search } = Input;

const PreviousBookings = () => {
  const {
    data: bookingData,
    isLoading,
    error,
  } = useGetUserBookingsQuery(undefined);

  let checkedError = false;
  if (error) {
    const httpError = error as FetchBaseQueryError;
    if (httpError.status !== 404) {
      checkedError = true;
      console.log("checkedError:", checkedError);
    }
  }

  const [searchText, setSearchText] = useState("");
  const [showCancelledOnly, setShowCancelledOnly] = useState(false);

  // Function to handle search
  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  // Table columns
  const columns = [
    {
      title: "Booking ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Facility",
      dataIndex: "facility",
      key: "facility",
      render: (facility: any) => facility?.name || "N/A",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status: string) =>
        status === "paid" ? (
          <Tag color="green">Paid</Tag>
        ) : (
          <Tag color="red">Unpaid</Tag>
        ),
    },
    {
      title: "Booking Status",
      dataIndex: "isBooked",
      key: "isBooked",
      render: (status: string) =>
        status === "confirmed" ? (
          <Tag color="green">Confirmed</Tag>
        ) : status === "unconfirmed" ? (
          <Tag color="orange">Unconfirmed</Tag>
        ) : (
          <Tag color="red">Cancelled</Tag>
        ),
    },
  ];

  // Filtered and sorted data
  const filteredBookings = bookingData?.data
    ?.filter(isPreviousBooking) // Filter for upcoming bookings
    .filter((booking: any) => {
      const matchesSearch = [booking._id, booking.facility?.name].some(
        (field) =>
          field?.toString().toLowerCase().includes(searchText.toLowerCase()),
      );

      const matchesCancelledFilter = showCancelledOnly
        ? booking.isBooked === "canceled" // Make sure status matches "Cancelled"
        : booking.isBooked !== "canceled"; // Hide cancelled bookings by default

      return matchesSearch && matchesCancelledFilter;
    })
    .sort((a: any, b: any) => moment(b.date).unix() - moment(a.date).unix()); // Sort from new to old

  return (
    <div style={{ padding: "20px" }}>
      {filteredBookings?.length === 0 && (
        <h1 style={{ textAlign: "center", color: "black" }}>
          You have no previous booking!
        </h1>
      )}

      {filteredBookings?.length !== 0 && (
        <div>
          <h1
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "black",
            }}
          >
            Your Previous Bookings ({filteredBookings?.length})
          </h1>

          <Space
            direction="vertical"
            size="large"
            style={{ width: "100%", marginBottom: "20px" }}
          >
            {/* Search bar */}
            <Search
              placeholder="Search by Booking ID or Facility Name"
              onSearch={handleSearch}
              enterButton
              style={{ width: "320px" }}
            />

            {/* Switch to show cancelled bookings */}
            <div style={{ marginBottom: "10px" }}>
              <span>Show Cancelled bookings: </span>
              <Switch
                checked={showCancelledOnly}
                onChange={(checked) => setShowCancelledOnly(checked)}
              />
            </div>
          </Space>

          {/* Bookings Table */}
          {!checkedError && (
            <Table
              columns={columns}
              dataSource={filteredBookings}
              loading={isLoading}
              rowKey="_id"
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1000 }} // Scroll if content overflows
            />
          )}
        </div>
      )}

      {checkedError && (
        <div style={{ color: "red" }}>Failed to load bookings data.</div>
      )}
    </div>
  );
};

export default PreviousBookings;
