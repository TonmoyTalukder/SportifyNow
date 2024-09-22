import { baseApi } from "../../api/baseApi";

type Booking = {
    date: string; // ISO string representation of Date
    startTime: string; // ISO string representation of Date
    endTime: string; // ISO string representation of Date
    user: string; // Typically, user ID
    facility: string; // Typically, facility ID
    payableAmount: number;
    paymentStatus: string;
    transactionId: string;
    isBooked: 'confirmed' | 'unconfirmed' | 'canceled';
    isRefunded: boolean;
    refundDetails: string;
};

const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAdminBookings: builder.query({
            query: () => {
                return ({
                    url: `/bookings`,
                    method: "GET",
                }
                )
            },
            providesTags: ["booking"],
        }),

        getUserBookings: builder.query({
            query: () => {
                return ({
                    url: `/bookings/user`,
                    method: "GET",
                }
                )
            },
            providesTags: ["booking"],
        }),

        getCheckAvailability: builder.query({
            query: () => {
                return ({
                    url: `/check-availability`,
                    method: "GET",
                }
                )
            },
        }),

        // Query to get upcoming bookings for a facility
        getUpcomingBookings: builder.query<Booking[], { facilityId: string }>({
            query: ({ facilityId }) => {
              console.log("facility ID from bookingApi => ", facilityId);
              return {
                url: `/upcoming/${facilityId}`,
                method: 'GET',
              };
            },
            transformResponse: (response: { data: Booking[] }) => response.data,  // Extract the data array
          }),
          


        createBooking: builder.mutation({
            query: (bookingInfo) => {
                return {
                    url: `/bookings/`,
                    method: "POST",
                    body: bookingInfo,
                };
            },
            invalidatesTags: ["singleBooking", "booking"],
        }),

        deleteBooking: builder.mutation({
            query: (bookingId) => {
                console.log("bookingId => ", bookingId)
                return {
                    url: `/bookings/${bookingId}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["singleBooking", "booking"],
        }),
    })
})

export const { useGetAdminBookingsQuery, useCreateBookingMutation, useDeleteBookingMutation, useGetCheckAvailabilityQuery, useGetUserBookingsQuery, useGetUpcomingBookingsQuery } = bookingApi;