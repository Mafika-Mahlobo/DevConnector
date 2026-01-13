import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logout } from "./auth";
import axios from "axios";

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
                Headers: {
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

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        // Actions (owned by this slice)
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
        }).addCase(logout, (state) => {
            state.profile = null;
            state.errors = null;
            state.repos = []
        });
    }
});

export default profileSlice.reducer;