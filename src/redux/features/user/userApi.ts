import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
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
                url: `/auth/users/${userInfo.id}`,
                method: "PUT",
                body: userInfo,
              };
            },
            invalidatesTags: ["singleUser"],
          }),

          changePassword: builder.mutation({
            query: (passwordInfo) => ({
                url: `/auth/change-password`, // Adjust the URL if needed
                method: "POST",
                body: passwordInfo,
            }),
        }),

    })
})

export const { useGetSingleUserQuery, useUpdateUserMutation, useChangePasswordMutation } = userApi;