import { useState } from "react";
import { Table, Input, Switch, Radio, Space, Tag, DatePicker } from "antd";
import { useGetAdminBookingsQuery } from "../../redux/features/booking/bookingApi";
import moment from "moment";
import dayjs from "dayjs";

const { Search } = Input;

const AdminBooking = () => {
  const {
    data: bookingData,
    isLoading,
    isError,
  } = useGetAdminBookingsQuery(undefined);
  const [searchText, setSearchText] = useState("");
  const [showPaidOnly, setShowPaidOnly] = useState(false);
  const [bookingStatus, setBookingStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Function to handle search
  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  // Function to handle date filter
  const handleDateChange = (date: any) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setSelectedDate(formattedDate);
  };

  // Columns for the table
  const columns = [
    {
      title: "Booking ID",
      dataIndex: "_id",
      key: "_id",
      sorter: (a: any, b: any) => a._id.localeCompare(b._id),
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
      sorter: (a: any, b: any) => moment(a.date).unix() - moment(b.date).unix(),
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
      sorter: (a: any, b: any) =>
        a.user?.name?.localeCompare(b.user?.name || "") || 0,
    },
    {
      title: "User Email",
      dataIndex: "user",
      key: "userEmail",
      render: (user: any) => user?.email || "N/A", // Safe access with optional chaining
    },
    {
      title: "Amount",
      dataIndex: "payableAmount",
      key: "payableAmount",
      render: (amount: number) => <span>${amount}</span>,
      sorter: (a: any, b: any) => a.payableAmount - b.payableAmount,
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
      render: (isBooked: boolean) =>
        isBooked ? (
          <Tag color="blue">Confirmed</Tag>
        ) : (
          <Tag color="orange">Unconfirmed</Tag>
        ),
    },
  ];

  // Filter data based on search and filters
  const filteredBookings = bookingData?.data
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

      const matchesDate = selectedDate ? selectedDate === booking.date : true;

      return (
        matchesSearch &&
        matchesPaymentStatus &&
        matchesBookingStatus &&
        matchesDate
      );
    })
    .map((booking: any) => ({
      ...booking,
      key: booking._id, // Add key for table rows
    }));

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Admin Bookings
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
          {/* Date Picker for single date */}
          <div>
            <span style={{ marginRight: "10px" }}>Filter by Date: </span>
            <DatePicker onChange={handleDateChange} />
          </div>

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
              <Radio.Button value="canceled">Canceled</Radio.Button>
            </Radio.Group>
          </div>
        </div>
      </Space>

      {/* Bookings Table */}
      <Table
        columns={columns}
        dataSource={filteredBookings}
        loading={isLoading}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1000 }} // Scroll if content overflows
      />

      {isError && (
        <div style={{ color: "red" }}>Failed to load bookings data.</div>
      )}
    </div>
  );
};

export default AdminBooking;
