import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => {
                return ({
                    url: '/auth/login',
                    method: 'POST',
                    body: userInfo,
                }
                )
            }
        }),

        signUp: builder.mutation({
            query: (userInfo) => {
                return ({
                    url: '/auth/signup',
                    method: 'POST',
                    body: userInfo,
                }
                )
            }
        }),

        forgotPassword: builder.mutation({
            query: (userInfo) => {
                return ({
                    url: '/auth/forgot-password',
                    method: 'POST',
                    body: userInfo,
                }
                )
            }
        }),

        resetPassword: builder.mutation({
            query: ({ token, password }: { token: string, password: string }) => {
              // Log the values for debugging
              console.log("Reset Password Request:");
              console.log("Token:", token);
              console.log("Password:", password);
      
              return {
                url: `/auth/reset-password/${token}`,
                method: 'POST',
                body: { password },
              };
            },
          }),

    })
})

export const { useLoginMutation, useSignUpMutation, useForgotPasswordMutation, useResetPasswordMutation } = authApi;