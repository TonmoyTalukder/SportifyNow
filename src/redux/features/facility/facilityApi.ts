import { baseApi } from "../../api/baseApi";

const facilityApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getFacility: builder.query({
            query: () => {
                return ({
                    url: `/facility/`,
                    method: "GET",
                }
                )
            },
            providesTags: ["facility"],
        }),

        getSingleFacility: builder.query({
            query: (facilityId) => {
                return ({
                    url: `/facility/${facilityId}`,
                    method: "GET",
                }
                )
            },
            providesTags: ["singleFacility"],
        }),

        updateFacility: builder.mutation({
            query: (facilityInfo) => {
                return {
                    url: `/facility/${facilityInfo._id}`,
                    method: "PUT",
                    body: facilityInfo,
                };
            },
            invalidatesTags: ["singleFacility", "facility"],
        }),

        createFacility: builder.mutation({
            query: (facilityInfo) => {
                return {
                    url: `/facility/`,
                    method: "POST",
                    body: facilityInfo,
                };
            },
            invalidatesTags: ["singleFacility", "facility"],
        }),

        deleteFacility: builder.mutation({
            query: (facilityId) => {
                console.log("userId => ", facilityId)
                return {
                    url: `/facility/${facilityId}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["facility"],
        }),

    })
})

export const { useGetFacilityQuery, useCreateFacilityMutation, useDeleteFacilityMutation, useGetSingleFacilityQuery, useUpdateFacilityMutation } = facilityApi;