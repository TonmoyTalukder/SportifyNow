import { useEffect, useState } from "react";
import { Table, Tag, Space, Input, notification, Button, Modal } from "antd";
import moment from "moment";
import { isUpcomingBooking } from "../../../utils/bookingStatus";
import { useDeleteBookingMutation, useGetUserBookingsQuery } from "../../../redux/features/booking/bookingApi";
import UpdateBookingForm from "../../form/UpdateBookingForm";

const { Search } = Input;

const UpcomingBookings = () => {
  const {
    data: bookingData,
    isLoading,
    isError,
    refetch,
  } = useGetUserBookingsQuery(undefined);
  const [deleteBooking] = useDeleteBookingMutation();
  const [searchText, setSearchText] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30 * 60 * 1000); // Refetch every 30 minutes

    return () => clearInterval(interval); // Clean up on unmount
  }, [refetch]);

  const filteredBookings = bookingData?.data
    ?.filter(isUpcomingBooking) // Filter for upcoming bookings
    .filter((booking: any) =>
      [booking._id, booking.facility?.name].some((field) =>
        field?.toString().toLowerCase().includes(searchText.toLowerCase()),
      ),
    )
    .sort((a: any, b: any) => moment(a.date).unix() - moment(b.date).unix());

  // Open the update modal and set the selected booking details
  const handleUpdateClick = (booking: any) => {
    setSelectedBooking(booking);
    setIsUpdateModalOpen(true);
  };

  // Close the update modal
  const handleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
    setSelectedBooking(null);
  };

  const handleDelete = async (bookingId: string) => {
    try {
      await deleteBooking(bookingId);
      notification.success({
        message: "Success",
        description: "Booking cancelled successfully!",
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to delete booking.",
      });
    }
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
    {
      title: "Actions",
      key: "actions",
      render: (booking: any) => (
        <Space>
          <Button type="primary" onClick={() => handleUpdateClick(booking)}>
            Update
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
      ),
    },
  ];

  return (
    <div>
      <h1>Upcoming Bookings</h1>
      <Search placeholder="Search Upcoming Bookings" onSearch={setSearchText} />
      <Table
        columns={columns}
        dataSource={filteredBookings}
        loading={isLoading}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />
      {isError && <div>Failed to load upcoming bookings data.</div>}

      {/* Update Modal */}
      <Modal
        title="Update Booking"
        visible={isUpdateModalOpen}
        onCancel={handleUpdateModalClose}
        footer={null}
      >
        {selectedBooking && (
          <UpdateBookingForm
            booking={selectedBooking}
            onClose={handleUpdateModalClose}
          />
        )}
      </Modal>
    </div>
  );
};

export default UpcomingBookings;
