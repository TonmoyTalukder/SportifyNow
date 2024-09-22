import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { TUser } from "../../../types/userType";

type TAuthState = {
    user: null | TUser;
    token: null | string;
    fromBooking: null | boolean;
    bookingURL: null | string;
}

const initialState: TAuthState = {
    user: null,
    token: null,
    fromBooking: null,
    bookingURL: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.fromBooking = null;
            state.bookingURL = null;
        },
        redirectBooking: (state, action) => {
            const { fromBooking, bookingURL } = action.payload;
            state.fromBooking = fromBooking;
            state.bookingURL = bookingURL;
        },

        resetRedirect: (state) => {
            state.fromBooking = null;
            state.bookingURL = null;
        },

        updateRewards: (state, action) => {
            if (state.user) {
                state.user.rewards = action.payload.rewards;
            }
        },
    },
});

export const { setUser, logout, redirectBooking, resetRedirect, updateRewards } = authSlice.actions;

export default authSlice.reducer;
export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;