import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => {
                return ({
                    url: `/auth/users`,
                    method: "GET",
                }
                )
            },
            providesTags: ["user"],
        }),

        getSingleUser: builder.query({
            query: (userId) => {
                return ({
                    url: `/auth/users/${userId}`,
                    method: "GET",
                }
                )
            },
            providesTags: ["singleUser"],
        }),

        updateUser: builder.mutation({
            query: (userInfo) => {
                return {
                    url: `/auth/users/${userInfo._id}`,
                    method: "PUT",
                    body: userInfo,
                };
            },
            invalidatesTags: ["singleUser", "user"],
        }),

        changePassword: builder.mutation({
            query: (passwordInfo) => ({
                url: `/auth/change-password`, // Adjust the URL if needed
                method: "POST",
                body: passwordInfo,
            }),
            invalidatesTags: ["singleUser"],
        }),

        // Add this to the `endpoints` in your `userApi` setup
        deleteUser: builder.mutation({
            query: (userId) => {
                console.log("userId => ", userId)
                return {
                    url: `/auth/users/${userId}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["user"],
        }),

        // Fetch existing referral code
        getReferralCode: builder.query({
            query: () => ({
                url: `/auth/referral-code`,
                method: "GET",
            }),
            providesTags: ["referralCode"],
        }),

        // Generate a new referral code
        generateReferralCode: builder.mutation({
            query: () => ({
                url: `/auth/generate-referral`,
                method: "POST",
            }),
            invalidatesTags: ["referralCode"],
        }),

        validateReferralCode: builder.mutation({
            query: (referralCode) => {
                console.log("referralCode => ", referralCode)
                return {
                    url: `/auth/validate-referral-code`,
                    method: "POST",
                    body: { referralCode },
                }
            },
        }),

    })
})

export const { useGetSingleUserQuery, useUpdateUserMutation, useChangePasswordMutation, useGetUsersQuery, useDeleteUserMutation, useGetReferralCodeQuery, useGenerateReferralCodeMutation, useValidateReferralCodeMutation } = userApi;