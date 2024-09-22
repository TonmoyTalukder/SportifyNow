import { useEffect, useState } from "react";
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
  Avatar,
  Badge,
} from "antd";
import moment, { Moment } from "moment";
import { SerializedError } from "@reduxjs/toolkit";
import {
  useGetCheckAvailabilityQuery,
  useCreateBookingMutation,
  useGetUpcomingBookingsQuery,
} from "../../../redux/features/booking/bookingApi"; // Import booking API hooks
import { useGetSingleFacilityQuery } from "../../../redux/features/facility/facilityApi";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getBadgeAndPercentage } from "../../../utils/badgeAndPercentage";
import { RiDiscountPercentFill } from "react-icons/ri";
import { BiSolidCoin } from "react-icons/bi";
import { useUpdateUserMutation } from "../../../redux/features/user/userApi";
import { updateRewards } from "../../../redux/features/auth/authSlice";

const { Text } = Typography;
// import dayjs from "dayjs";

interface Booking {
  date: string;
  endTime: string;
  facility: string;
  isBooked: string;
  isRefunded: boolean;
  payableAmount: number;
  paymentStatus: string;
  startTime: string;
  transactionId: string;
  user: string;
  _id: string;
}

interface Slot {
  startTime: string;
  endTime: string;
}

const CheckAvailability = ({ facilityId }: { facilityId: string }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user!);
  const [updateUser] = useUpdateUserMutation();
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isDateChecked, setIsDateChecked] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{
    startTime: string;
    endTime: string;
  } | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [tempRewards, setTempRewards] = useState(user?.rewards); // Temporary rewards points
  const [selectedDiscount, setSelectedDiscount] = useState(0); // Track selected discount

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
    facilityData? facilityData?.facilityId: facilityId,
    { pollingInterval: 30000 },
  );

  // console.log("facilityId => ", facilityId);

  const { data: upcomingBookingsData } = useGetUpcomingBookingsQuery({
    facilityId, // Pass the facilityId from your component state or props
  });
  const upcomingBookings = upcomingBookingsData as Booking[] | undefined;
  // console.log("upcomingBookings => ", upcomingBookings);

  // console.log("Selected Date => ", selectedDate);

  const totalSlots = [
    { startTime: "08:00", endTime: "10:00" },
    { startTime: "10:00", endTime: "12:00" },
    { startTime: "12:00", endTime: "14:00" },
    { startTime: "14:00", endTime: "16:00" },
    { startTime: "16:00", endTime: "18:00" },
    { startTime: "18:00", endTime: "20:00" },
  ];

  // Function to filter available slots based on the selected date and current time
  const filterSlotsByDate = (
    selectedDate: Moment | null,
    totalSlots: Slot[],
  ): Slot[] => {
    // Return all slots if no date is selected
    if (!selectedDate) return [];

    // Get today's date and current time
    const today = moment().startOf("day"); // today's date at 00:00
    const currentTime = moment(); // current time

    // If the selected date is in the past, return an empty array (no slots)
    if (selectedDate.isBefore(today, "day")) {
      return [];
    }

    // If the selected date is today, filter out past slots
    if (selectedDate.isSame(today, "day")) {
      return totalSlots.filter((slot) => {
        return moment(
          `${selectedDate.format("YYYY-MM-DD")} ${slot.startTime}`,
          "YYYY-MM-DD HH:mm",
        ).isAfter(currentTime);
      });
    }

    // If the selected date is in the future, return all slots
    return totalSlots;
  };

  // Function to filter available slots based on bookings and the selected date/time
  const getAvailableSlots = (
    selectedDate: Moment | null,
    upcomingBookings: Booking[] | undefined,
    totalSlots: Slot[],
  ): Slot[] => {
    // Use the upper function to filter based on date and time first
    const filteredSlots = filterSlotsByDate(selectedDate, totalSlots);

    // If no bookings or no selected date, return filtered slots based on time
    if (!selectedDate || !upcomingBookings) return filteredSlots;

    // Format selected date as 'YYYY-MM-DD'
    const formattedSelectedDate = selectedDate.format("YYYY-MM-DD");

    // Filter bookings by selected date
    const bookedSlotsForDate = upcomingBookings.filter(
      (booking: Booking) =>
        moment(booking.date).format("YYYY-MM-DD") === formattedSelectedDate,
    );

    // Convert the booked times to an array of start and end times
    const bookedTimes = bookedSlotsForDate.map((booking) => ({
      startTime: booking.startTime.slice(11, 16), // Extract "HH:MM" from startTime
      endTime: booking.endTime.slice(11, 16), // Extract "HH:MM" from endTime
    }));

    // Further filter out the slots that overlap with booked slots
    return filteredSlots.filter((slot) => {
      return !bookedTimes.some(
        (booked: { startTime: string; endTime: string }) =>
          slot.startTime < booked.endTime && slot.endTime > booked.startTime,
      );
    });
  };

  const availableSlots = getAvailableSlots(
    selectedDate!, // Moment object for selected date
    upcomingBookings, // Bookings from the API
    totalSlots, // Array of time slots
  );

  // console.log(
  //   "Available slots on",
  //   selectedDate?.format("YYYY-MM-DD"),
  //   "=>",
  //   availableSlots,
  // );

  const slots = !selectedDate ? [] : availableSlots;

  const facilityPricePerHour =
    facilityInformation?.data.pricePerHour || "Price not available"; 

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
    setIsDateChecked(true);
  };

  useEffect(() => {
    if (selectedDate === null) {
      setIsDateChecked(false);
    }
  }, [selectedDate]);

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

  // Function to handle discount selection and adjust rewards in real-time
  const handleDiscountSelection = (discountValue: number) => {
    const totalRewards = user.rewards;
    setSelectedDiscount(discountValue);
    setTempRewards(totalRewards - discountValue); // Deduct rewards temporarily
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
    const discountedCost =
      totalCost - (totalCost * (discount / 100) * selectedDiscount) / 100;

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

      // Update user rewards after booking
      await updateUser({ _id: user.id, rewards: tempRewards }).unwrap();

      // Dispatch the updateRewards action to update the Redux state
      dispatch(updateRewards({ rewards: tempRewards }));

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

  const notificationKey = "discount-notification";

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
        {selectedDate === null ? (
          // Show "Select a date" if no date is selected
          <p>Select a date.</p>
        ) : (
          <>
            {isDateChecked ? (
              // If date is checked and there are slots, show slots
              slots.length > 0 ? (
                <>
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
                </>
              ) : (
                // If no slots are available after checking
                <p>No available slots for the selected date.</p>
              )
            ) : (
              // If a date is selected but availability hasn't been checked yet
              <p>Check Availability.</p>
            )}
          </>
        )}
      </Card>

      {/* Booking Confirmation Modal */}
      <Modal
        title={
          <div>
            <span
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginRight: "10%",
              }}
            >
              <b style={{ color: "black" }}>{user.name}</b>{" "}
              <b
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: "#c99648",
                    marginTop: "5px",
                  }}
                >
                  <BiSolidCoin />{" "}
                </span>
                {tempRewards}
              </b>
            </span>
            <span>Confirm Booking</span>
          </div>
        }
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
          {discount + selectedDiscount > 0 && (
            <span>({discount + selectedDiscount}% discount applied)</span>
          )}
        </Text>
        {
          // isPaymentLoading && <Spin tip="Initiating payment..." />
        }
        <br />
        <Text>Get discount using rewards points.&nbsp;</Text>
        <Text italic>
          (It will not reduce your total rewards count to upgrade your badge.)
        </Text>
        <div
          style={{
            marginTop: "3%",
          }}
        >
          {/* 5% Discount */}
          <Badge count={0} showZero>
            <button
              onClick={() => {
                handleDiscountSelection(0); // Apply the discount
                notification.success({
                  key: notificationKey,
                  message: "Discount Removed",
                  description: "Discount has been removed from your total.",
                  placement: "topRight",
                });
              }}
              style={{
                color: "transparent",
                backgroundColor: "transparent",
                border: "1px solid transparent",
              }}
            >
              <Avatar
                shape="square"
                size="large"
                icon={<RiDiscountPercentFill style={{ color: "black" }} />}
              />
            </button>
          </Badge>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {/* 5% Discount */}
          <Badge count={5}>
            <button
              onClick={() => {
                if (user.rewards > 4) {
                  // Apply the discount if the user has more than 4 rewards
                  handleDiscountSelection(5); // Apply the 5% discount
                  notification.success({
                    key: notificationKey,
                    message: "Discount Applied",
                    description:
                      "A 5% discount has been applied to your total.",
                    placement: "topRight",
                  });
                } else {
                  // Show an error if the user doesn't have enough rewards
                  notification.error({
                    key: notificationKey,
                    message: "Insufficient Rewards Points!",
                    description:
                      "Your rewards points are insufficient, earn more rewards.",
                    placement: "topRight",
                  });
                }
              }}
              style={{
                color: "transparent",
                backgroundColor: "transparent",
                border: "1px solid transparent",
              }}
            >
              <Avatar
                shape="square"
                size="large"
                icon={<RiDiscountPercentFill style={{ color: "black" }} />}
              />
            </button>
          </Badge>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {/* 10% Discount */}
          <Badge count={10}>
            <button
              onClick={() => {
                if (user.rewards > 9) {
                  handleDiscountSelection(10); // Apply the discount
                  notification.success({
                    key: notificationKey,
                    message: "Discount Applied",
                    description:
                      "A 10% discount has been applied to your total.",
                    placement: "topRight",
                  });
                } else {
                  // Show an error if the user doesn't have enough rewards
                  notification.error({
                    key: notificationKey,
                    message: "Insufficient Rewards Points!",
                    description:
                      "Your rewards points are insufficient, earn more rewards.",
                    placement: "topRight",
                  });
                }
              }}
              style={{
                color: "transparent",
                backgroundColor: "transparent",
                border: "1px solid transparent",
              }}
            >
              <Avatar
                shape="square"
                size="large"
                icon={<RiDiscountPercentFill style={{ color: "black" }} />}
              />
            </button>
          </Badge>
        </div>
      </Modal>
    </>
  );
};

export default CheckAvailability;
