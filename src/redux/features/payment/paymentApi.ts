import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        initiatePayment: builder.mutation({
            query: (bookingId) => {
                console.log("bookingId => ", bookingId);
                return {
                    url: `/payment/initiate-payment/${bookingId}`,
                    method: "POST",
                };
            },
        }),

    })
})

export const { useInitiatePaymentMutation } = paymentApi;