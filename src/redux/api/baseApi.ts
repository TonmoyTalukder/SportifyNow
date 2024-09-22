import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

// export const baseApi = createApi({
//     reducerPath: 'baseApi',
//     baseQuery: fetchBaseQuery({
//         baseUrl: 'http://localhost:5000/api',
//         // baseUrl: 'https://sportify-now-server.vercel.app/api',
//         credentials: 'include',
//     }),
//     tagTypes: ['singleUser', 'user', 'facility', 'singleFacility', 'referralCode', "singleBooking", "booking", 'reviews', 'facilityReviews', 'userReviews'],
//     endpoints: () => ({}),
// });


// import { BaseQueryApi, BaseQueryFn, createApi, DefinitionType, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store";
// import { setUser } from "../features/auth/authSlice";
// // import { logout, setUser } from "../features/auth/authSlice";

// const baseQuery = fetchBaseQuery({
//     baseUrl: 'http://localhost:5000/api',
//     credentials: 'include',
//     prepareHeaders: (headers, { getState }) => {
//         const token = (getState() as RootState).auth.token;

//         console.log('authorization => ', token)

//         if (token) {
//             headers.set('authorization', `${token}`)
//         }

//         return headers;
//     },
// });

// const baseQueryWithRefreshToken: BaseQueryFn<FetchArgs, BaseQueryApi, DefinitionType> = async (args, api, extraOptions): Promise<any> => {
//     let result = await baseQuery(args, api, extraOptions);

//     console.log("response from baseApi => ", result)

//     if (result.error?.status === 401) {
//         //! Send Refresh
//         console.log("Sending Refresh");

//         const res = await fetch('http://localhost:5000/api/auth/refresh-token', {
//             method: 'POST',
//             credentials: 'include',
//         });

//         console.log("response of fetch refresh token => ", res);

//         const data = await res.json();

//         if (data?.newAccessToken) {
//             const user = (api.getState() as RootState).auth.user;
//             api.dispatch(
//                 setUser({
//                     user,
//                     token: data.newAccessToken,
//                 })
//             )
//             result = await baseQuery(args, api, extraOptions);
//         }

//         // else {
//         //     api.dispatch(logout());
//         // }
//     }

//     return result;
// }

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://sportify-now-server.vercel.app/api',  // http://localhost:5000  https://sportify-now-server.vercel.app
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token; // Access token from the state
            if (token) {
              headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
          },
    }),
    tagTypes: ['singleUser', 'user', 'facility', 'singleFacility', 'referralCode', "singleBooking", "booking", 'reviews', 'facilityReviews', 'userReviews'],
    endpoints: () => ({})
})