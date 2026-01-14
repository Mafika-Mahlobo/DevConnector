import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logout } from "./auth";
import axios from "axios";
import { setAlert } from "./alert";
import { ALERT_SUCCESS } from "./types";
import { Navigate } from "react-router-dom";

const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    repos: [],
    errors: null
};

// Get logged-in user's profile
export const getCurrentProfile = createAsyncThunk(
    "profile/current",
    async (_, thunkAPI) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };

            const res = await axios.get('/api/profile/me', config);

            return res.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Add profile
export const AddUserProfile = createAsyncThunk(
    "profile/create",
    async ({formData, edit}, thunkAPI) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };

            const res = await axios.post('/api/profile', formData, config);

            thunkAPI.dispatch(setAlert({msg: edit ? "Profile edited" : "Profile created", alertType: ALERT_SUCCESS}));

            if (!edit) Navigate("/dashboard");

            return res.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        clearProfileErrors: (state) => {
            state.errors = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrentProfile.pending, (state) => {
            state.loading = true;
        })
        .addCase(getCurrentProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
        })
        .addCase(getCurrentProfile.rejected, (state, action) => {
            state.loading = false;
            state.errors = action.payload;
        })
        .addCase(AddUserProfile.pending, (state) => {
            state.loading = true;
        })
        .addCase(AddUserProfile.fulfilled, (state, action) => {
            state.profile = action.payload;
            state.loading = false;
        })
        .addCase(AddUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.errors = action.payload;
        })
        .addCase(logout, (state) => {
            state.profile = null;
            state.errors = null;
            state.repos = []
        });
    }
});

export default profileSlice.reducer;
export const {clearProfileErrors} = profileSlice.actions;