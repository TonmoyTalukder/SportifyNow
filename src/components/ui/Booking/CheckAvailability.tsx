import { useState } from "react";
import {
  Button,
  DatePicker,
  Card,
  Spin,
  Alert,
  List,
  Modal,
  Typography,
  notification,
} from "antd";
import moment from "moment";
import { SerializedError } from "@reduxjs/toolkit";
import {
  useGetCheckAvailabilityQuery,
  useCreateBookingMutation,
} from "../../../redux/features/booking/bookingApi"; // Import booking API hooks
import { useGetSingleFacilityQuery } from "../../../redux/features/facility/facilityApi";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { getBadgeAndPercentage } from "../../../utils/badgeAndPercentage";

const { Text } = Typography;

const CheckAvailability = ({ facilityId }: { facilityId: string }) => {
  const user = useSelector((state: RootState) => state.auth.user!);
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{
    startTime: string;
    endTime: string;
  } | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Booking API hook
  const [createBooking, { isLoading: isBookingLoading }] =
    useCreateBookingMutation(); // Use createBookingMutation

  const {
    data: availabilityInfo,
    isLoading,
    error,
  } = useGetCheckAvailabilityQuery(
    {
      date: selectedDate
        ? moment(selectedDate).format("YYYY-MM-DD")
        : undefined,
      facility: facilityId,
      pollingInterval: 30000,
    },
    { skip: !isDateSelected },
  );

  const availabilityData = availabilityInfo?.data;

  // Filter slots for the specific facilityId
  const facilityData = availabilityData?.find(
    (facility: { facilityId: string }) => facility.facilityId === facilityId,
  );
  const { data: facilityInformation } = useGetSingleFacilityQuery(
    facilityData?.facilityId,
  );

  const slots = facilityData?.slots || [];
  const facilityPricePerHour =
    facilityInformation?.data.pricePerHour || "Price not available"; // Assuming the price is available in the facilityData

  const handleDateChange = (date: moment.Moment | null) => {
    setSelectedDate(date);
    setIsDateSelected(false); // Reset date selection when date changes
    setSelectedSlot(null); // Reset selected slot
  };

  const handleCheckAvailability = () => {
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }
    setIsDateSelected(true);
  };

  const handleSlotSelect = (slot: { startTime: string; endTime: string }) => {
    setSelectedSlot(slot);
  };

  const { badge, discount } = getBadgeAndPercentage(user.rewardsCount || 0);

  // Function to display the discount notification
  const notifyDiscountApplied = () => {
    notification.success({
      message: `${badge} Discount Applied`,
      description: `Dear ${badge} user, a discount of ${discount}% has been applied to your total based on your badge.`,
      placement: "topRight",
    });
  };

  const calculateTotalCost = () => {
    if (
      !selectedSlot ||
      !facilityPricePerHour ||
      facilityPricePerHour === "Price not available"
    ) {
      return "N/A";
    }

    const startTime = moment(selectedSlot.startTime, "HH:mm");
    const endTime = moment(selectedSlot.endTime, "HH:mm");
    const duration = moment.duration(endTime.diff(startTime)).asHours();

    // Calculate the total cost
    const totalCost = duration * facilityPricePerHour;

    // Apply the discount (assuming discount is a percentage, like 10 for 10%)
    const discountedCost = totalCost - totalCost * (discount / 100);

    return discountedCost.toFixed(2); // Returns the total cost after discount with two decimal places
  };

  const handleBook = async () => {
    if (selectedSlot && selectedDate) {
      setIsModalVisible(true); // Open confirmation modal

      // Show notification if discount is greater than 0
      if (discount > 0) {
        notifyDiscountApplied(); // Call the function to show the discount notification
      }
    } else {
      alert("Please select a time slot.");
    }
  };

  const handleModalOk = async () => {
    setIsModalVisible(false);

    const bookingInfo = {
      date: selectedDate?.format("YYYY-MM-DD"),
      startTime: selectedSlot?.startTime,
      endTime: selectedSlot?.endTime,
      user: user.id,
      facility: facilityId,
      payableAmount: parseFloat(calculateTotalCost()),
      isBooked: "unconfirmed",
      isRefunded: false,
      refundDetails: "",
    };

    try {
      const createdBooking = await createBooking(bookingInfo).unwrap();
      console.log("Booking created:", createdBooking);

      notification.success({
        message: `Sport Facility Booked`,
        description: `You have successfully booked the facility! Redirecting you to payment gateway.`,
        placement: "topRight",
      });

      window.location.href = createdBooking.paymentSession.payment_url;
    } catch (error: any) {
      console.error("Error:", error);

      const errorMessage =
        error?.data?.message ||
        error.message ||
        "Failed to initiate payment. Please try again.";

      notification.error({
        message: "Payment Error",
        description: errorMessage,
      });
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const renderErrorMessage = () => {
    if (!error) return null;

    if (typeof error === "object" && "message" in error) {
      return (
        <Alert
          message={`Error loading availability: ${
            (error as SerializedError).message
          }`}
          type="error"
          showIcon
        />
      );
    }

    if (
      typeof error === "object" &&
      "data" in error &&
      (error as any).data?.message
    ) {
      return (
        <Alert
          message={`Error loading availability: ${(error as any).data.message}`}
          type="error"
          showIcon
        />
      );
    }

    return <Alert message="An unknown error occurred." type="error" showIcon />;
  };

  return (
    <>
      <Card
        bordered={false}
        style={{
          background: "rgba(8, 8, 8, 0.2)",
          color: "#fff",
        }}
      >
        <h2>Check Availability</h2>
        <DatePicker
          onChange={handleDateChange}
          style={{ marginBottom: "16px" }}
        />
        &nbsp;&nbsp;
        <Button
          style={{
            backgroundColor: "#fff",
            color: "black",
            zIndex: 0,
          }}
          onClick={handleCheckAvailability}
          disabled={!selectedDate}
        >
          Check Availability
        </Button>
        {isLoading && (
          <Spin
            tip="Loading..."
            style={{ display: "block", marginTop: "16px" }}
          />
        )}
        {renderErrorMessage()}
        {slots.length > 0 ? (
          <div style={{ marginTop: "16px" }}>
            <h4>Available Time Slots</h4>
            <List
              dataSource={slots}
              renderItem={(
                slot: { startTime: string; endTime: string },
                index: number,
              ) => (
                <List.Item
                  key={index}
                  style={{
                    color: "#fff",
                  }}
                >
                  <Button
                    type={selectedSlot === slot ? "primary" : "default"}
                    style={{
                      backgroundColor: "transparent",
                      zIndex: 0,
                    }}
                    onClick={() => handleSlotSelect(slot)}
                  >
                    {`${slot.startTime} - ${slot.endTime}`}
                  </Button>
                </List.Item>
              )}
            />
            {selectedSlot && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  type="primary"
                  style={{ marginTop: "16px", width: "300px" }}
                  onClick={handleBook}
                  loading={isBookingLoading}
                >
                  Book
                </Button>
              </div>
            )}
          </div>
        ) : (
          <p>No available slots for the selected date.</p>
        )}
      </Card>

      {/* Booking Confirmation Modal */}
      <Modal
        title="Confirm Booking"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Proceed to Payment"
        cancelText="Cancel"
      >
        <Text>
          You have selected the following slot:{" "}
          <strong>{`${selectedSlot?.startTime} - ${selectedSlot?.endTime}`}</strong>
        </Text>
        <br />
        <Text>Date: {selectedDate?.format("YYYY-MM-DD")}</Text>
        <br />
        <Text>
          Facility Price: <strong>${facilityPricePerHour}</strong>
        </Text>
        <br />
        <Text>
          Total Cost: <strong>${calculateTotalCost()}</strong>{" "}
          {discount > 0 && <span>({discount}% discount applied)</span>}
        </Text>
        {
          // isPaymentLoading && <Spin tip="Initiating payment..." />
        }
      </Modal>
    </>
  );
};

export default CheckAvailability;
