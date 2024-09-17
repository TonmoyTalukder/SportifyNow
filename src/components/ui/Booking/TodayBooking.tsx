import { useState, useEffect } from "react";
import { Table, Input, Tag, Switch, Radio, Space } from "antd";
import moment from "moment";
import { useGetAdminBookingsQuery } from "../../../redux/features/booking/bookingApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const { Search } = Input;

const TodayBooking = () => {
  const {
    data: bookingData,
    isLoading,
    error,
  } = useGetAdminBookingsQuery(undefined);

  let checkedError = false;
  if (error) {
    const httpError = error as FetchBaseQueryError;
    if (httpError.status !== 404) {
      checkedError = true;
      console.log("checkedError:", checkedError);
    }
  }

  const [todayBookings, setTodayBookings] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [showPaidOnly, setShowPaidOnly] = useState(false);
  const [bookingStatus, setBookingStatus] = useState("");

  // Get today's date in "YYYY-MM-DD" format
  const todayDate = moment().format("YYYY-MM-DD");

  useEffect(() => {
    if (bookingData?.data) {
      // Filter bookings for today
      const filteredBookings = bookingData.data.filter((booking: any) =>
        moment(booking.date).isSame(todayDate, "day"),
      );
      setTodayBookings(filteredBookings);
    }
  }, [bookingData, todayDate]);

  // Function to handle search
  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  // Filter data based on search and filters
  const filteredBookings = todayBookings
    ?.filter((booking: any) => {
      const matchesSearch = [
        booking._id,
        booking.facility?.name,
        booking.user?.name,
        booking.date,
      ].some((field) =>
        field?.toString().toLowerCase().includes(searchText.toLowerCase()),
      );

      const matchesPaymentStatus = showPaidOnly
        ? booking.paymentStatus === "paid"
        : true;

      const matchesBookingStatus =
        bookingStatus === ""
          ? true
          : bookingStatus === "confirmed"
          ? booking.isBooked
          : bookingStatus === "unconfirmed"
          ? !booking.isBooked
          : false;

      return matchesSearch && matchesPaymentStatus && matchesBookingStatus;
    })
    .map((booking: any) => ({
      ...booking,
      key: booking._id, // Add key for table rows
    }));

  // Columns for today's booking table
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
      render: (facility: any) => facility?.name || "N/A", // Safe access with optional chaining
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
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
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (user: any) => user?.name || "N/A", // Safe access with optional chaining
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
  ];

  return (
    <div style={{ padding: "20px", color: "black" }}>
      {filteredBookings.length === 0 && (
        <h1 style={{ textAlign: "center", color: "black" }}>
          There is no booking today!
        </h1>
      )}
      {filteredBookings.length !== 0 && (
        <div>
          <h1 style={{ textAlign: "left", color: "black" }}>
            Total Today Bookings: {filteredBookings.length}
          </h1>
          <Space
            direction="vertical"
            size="large"
            style={{ width: "100%", marginBottom: "20px" }}
          >
            {/* Search bar */}
            <Search
              placeholder="Search by user, booking ID, or, facility"
              onSearch={handleSearch}
              enterButton
              style={{ width: "300px" }}
            />

            {/* Filters */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              {/* Payment Status Filter */}
              <div>
                <span style={{ marginRight: "10px" }}>Show Paid Only: </span>
                <Switch
                  checked={showPaidOnly}
                  onChange={(checked) => setShowPaidOnly(checked)}
                  style={{ marginRight: "20px" }}
                />
              </div>

              {/* Booking Status Filter */}
              <div>
                <span style={{ marginRight: "10px" }}>Booking Status: </span>
                <Radio.Group
                  value={bookingStatus}
                  onChange={(e) => setBookingStatus(e.target.value)}
                >
                  <Radio.Button value="">All</Radio.Button>
                  <Radio.Button value="confirmed">Confirmed</Radio.Button>
                  <Radio.Button value="unconfirmed">Unconfirmed</Radio.Button>
                </Radio.Group>
              </div>
            </div>
          </Space>
          {!checkedError && (
            <Table
              columns={columns}
              dataSource={filteredBookings}
              loading={isLoading}
              rowKey="_id"
              pagination={{ pageSize: 5 }}
              scroll={{ x: 1000 }} // Scroll if content overflows
            />
          )}
        </div>
      )}

      {checkedError && (
        <div style={{ color: "red", textAlign: "center" }}>
          Failed to load bookings data.
        </div>
      )}
    </div>
  );
};

export default TodayBooking;
