import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // Fetch all reviews
    getAllReviews: builder.query({
      query: () => ({
        url: '/review/',
        method: 'GET',
      }),
      providesTags: ['reviews'],
    }),
    
    // Fetch reviews by facility ID
    getReviewsByFacility: builder.query({
      query: (facilityId) => ({
        url: `/review/facility/${facilityId}`,
        method: 'GET',
      }),
      providesTags: ['facilityReviews'],
    }),
    
    // Create a new review
    createReview: builder.mutation({
      query: (reviewData) => ({
        url: '/review/',
        method: 'POST',
        body: reviewData,
      }),
      invalidatesTags: ['reviews', 'facilityReviews'],
    }),

    // Update a review
    updateReview: builder.mutation({
      query: ({ reviewId, reviewData }) => ({
        url: `/review/${reviewId}`,
        method: 'PUT',
        body: reviewData,
      }),
      invalidatesTags: ['reviews', 'facilityReviews', 'userReviews'],
    }),

    // Delete a review (soft delete)
    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `/review/${reviewId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['reviews', 'facilityReviews', 'userReviews'],
    }),

    // Delete a reply (soft delete)
    deleteReply: builder.mutation<void, { reviewId: string, replyId: string }>({
      query: ({ reviewId, replyId }) => ({
        url: `/review/${reviewId}/replies/${replyId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['reviews', 'facilityReviews', 'userReviews'],
    }),


    // Admin delete a review
    adminDeleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `/review/${reviewId}/admin`,
        method: 'DELETE',
      }),
      invalidatesTags: ['reviews', 'facilityReviews'],
    }),

    // Add a reply to a review
    addReply: builder.mutation({
      query: ({ reviewId, replyData }) => ({
        url: `/review/${reviewId}/replies`,
        method: 'POST',
        body: replyData,
      }),
      invalidatesTags: ['reviews', 'facilityReviews'],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useGetReviewsByFacilityQuery,

  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useAdminDeleteReviewMutation,
  useAddReplyMutation,
  useDeleteReplyMutation,
} = reviewApi;
