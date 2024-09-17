import { baseApi } from "../../api/baseApi";

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

export const { useGetAdminBookingsQuery, useCreateBookingMutation, useDeleteBookingMutation, useGetCheckAvailabilityQuery, useGetUserBookingsQuery } = bookingApi;