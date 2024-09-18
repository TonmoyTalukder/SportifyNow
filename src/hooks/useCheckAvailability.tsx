import { useState } from "react";
import { Button, DatePicker } from "antd";
import moment from "moment";
import { useGetCheckAvailabilityQuery } from "../redux/features/booking/bookingApi";
import { SerializedError } from "@reduxjs/toolkit";

const CheckAvailability = ({ facilityId }: { facilityId: string }) => {
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);
  const [isDateSelected, setIsDateSelected] = useState(false);

  // Fetch availability using hook when date is selected
  const { data: availabilityData, isLoading, error } = useGetCheckAvailabilityQuery(
    { 
      date: selectedDate ? moment(selectedDate).format("YYYY-MM-DD") : undefined, 
      facility: facilityId 
    },
    { skip: !isDateSelected }  // Prevent the query from running until the date is selected
  );

  const handleDateChange = (date: moment.Moment | null) => {
    setSelectedDate(date);
    setIsDateSelected(true);  // Set flag to trigger the query
  };

  const handleCheckAvailability = () => {
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }
  };

  // Error handling logic
  const renderErrorMessage = () => {
    if (!error) return null;

    // Check if error is a SerializedError (e.g., network or query errors)
    if (error && typeof error === "object" && "message" in error) {
      return <p>Error loading availability: {(error as SerializedError).message}</p>;
    }

    // Check if error contains a custom API error response
    if (error && typeof error === "object" && "data" in error && (error as any).data?.message) {
      return <p>Error loading availability: {(error as any).data.message}</p>;
    }

    return <p>An unknown error occurred.</p>;
  };

  return (
    <div>
      <h2>Check Availability</h2>
      <DatePicker onChange={handleDateChange} />
      <Button onClick={handleCheckAvailability}>Check Availability</Button>

      {isLoading && <p>Loading...</p>}
      {renderErrorMessage()}

      {availabilityData && (
        <div>
          <h3>Available Time Slots</h3>
          {availabilityData.data.length > 0 ? (
            availabilityData.data.map((slot: any, index: number) => (
              <p key={index}>{`${slot.startTime} - ${slot.endTime}`}</p>
            ))
          ) : (
            <p>No available slots for the selected date.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckAvailability;
