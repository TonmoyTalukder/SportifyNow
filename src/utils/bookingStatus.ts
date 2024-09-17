import moment from "moment";

export const isPreviousBooking = (booking: any) => {
    const today = moment();
    const bookingDate = moment(booking.date);
    const bookingEndTime = moment(booking.endTime, 'HH:mm');
    return bookingDate.isBefore(today, 'day') || (bookingDate.isSame(today, 'day') && bookingEndTime.isBefore(today));
  };
  
export  const isUpcomingBooking = (booking: any) => {
    const today = moment();
    const bookingDate = moment(booking.date);
    const bookingStartTime = moment(booking.startTime, 'HH:mm');
    return bookingDate.isAfter(today, 'day') || (bookingDate.isSame(today, 'day') && bookingStartTime.isAfter(today));
  };
  