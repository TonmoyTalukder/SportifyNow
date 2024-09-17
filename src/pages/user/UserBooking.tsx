import { useState } from "react";
import { Button, Table, Tag, Space, Input, Switch, notification } from "antd";
import {
  useGetUserBookingsQuery,
  useDeleteBookingMutation,
} from "../../redux/features/booking/bookingApi";
import moment from "moment";
import { isUpcomingBooking } from "../../utils/bookingStatus";
import { useInitiatePaymentMutation } from "../../redux/features/payment/paymentApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const { Search } = Input;

const UserBooking = () => {
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

  const [updatePayment] = useInitiatePaymentMutation();
  const [deleteBooking] = useDeleteBookingMutation();
  const [searchText, setSearchText] = useState("");
  const [showCancelledOnly, setShowCancelledOnly] = useState(false);

  // Notifications
  const openNotification = (
    type: "success" | "error",
    message: string,
    description: string,
  ) => {
    notification[type]({
      message,
      description,
    });
  };

  // Function to handle search
  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  // Initiate payment
  const handleUpdatePayment = async (bookingId: string) => {
    try {
      const initiatePayment = await updatePayment(bookingId);
      openNotification("success", "Success", "Successfully Payment initiated!");
      window.location.href = initiatePayment.data.paymentSession.payment_url;
    } catch (error) {
      openNotification("error", "Error", "Failed to successful payment.");
    }
  };

  // Delete a booking
  const handleDelete = async (bookingId: string) => {
    try {
      await deleteBooking(bookingId);
      openNotification("success", "Success", "Booking cancelled successfully!");
    } catch (error) {
      openNotification("error", "Error", "Failed to delete booking.");
    }
  };

  // Filtered and sorted data
  const filteredBookings = bookingData?.data
    ?.filter(isUpcomingBooking) // Filter for upcoming bookings
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

  // console.log("filteredBookings => ", filteredBookings);

  const hasActionsColumn = filteredBookings?.some(
    (booking: any) =>
      booking.paymentStatus !== "paid" && booking.isBooked !== "canceled",
  );

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
    ...(hasActionsColumn
      ? [
          {
            title: "Actions",
            key: "actions",
            render: (booking: any) => {
              if (
                booking.paymentStatus !== "paid" &&
                booking.isBooked !== "canceled"
              ) {
                return (
                  <Space>
                    <Button
                      type="primary"
                      style={{
                        // backgroundColor: 'green',
                        border: "1px solid transparent",
                      }}
                      onClick={() => handleUpdatePayment(booking._id)}
                    >
                      Pay
                    </Button>
                    <Button
                      type="dashed"
                      danger
                      style={{
                        backgroundColor: "transparent",
                      }}
                      onClick={() => handleDelete(booking._id)}
                    >
                      Cancel
                    </Button>
                  </Space>
                );
              }
              return null; // Do not render anything if the conditions are not met
            },
          },
        ]
      : []),
  ];

  return (
    <div style={{ padding: "20px" }}>
      {filteredBookings?.length === 0 && (
        <h1 style={{ textAlign: "center", color: "black" }}>
          You have no upcoming booking!
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
            Your Upcoming Bookings ({filteredBookings?.length})
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

export default UserBooking;
