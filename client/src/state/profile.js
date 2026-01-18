import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logout } from "./auth";
import axios from "axios";
import { setAlert } from "./alert";
import { ALERT_SUCCESS } from "./types";
import { setAuthToken } from "./utils/setAuthToken";

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

            return res.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Add experience
export const addExperience = createAsyncThunk(
    "profile/experience",
     async (formData, thunkAPI) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };

            const res = await axios.put('/api/profile/experience', formData, config);

            thunkAPI.dispatch(setAlert({msg: "Experience Added", alertType: ALERT_SUCCESS}));

            return res.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
     }
);

//Add education
export const addEducation = createAsyncThunk(
    "profile/education",
     async (formData, thunkAPI) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };

            const res = await axios.put('/api/profile/education', formData, config);

            thunkAPI.dispatch(setAlert({msg: "Education Added", alertType: ALERT_SUCCESS}));

            return res.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
     }
)

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
        .addCase(addExperience.pending, (state) => {
            state.loading = true;
        })
        .addCase(addExperience.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
        })
        .addCase(addExperience.rejected, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
        })
        .addCase(addEducation.pending, (state) => {
            state.loading = true;
        })
        .addCase(addEducation.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
        })
        .addCase(addEducation.rejected, (state, action) => {
            state.loading = false;
            state.profile = action.payload
        })
        .addCase(logout, (state) => {
            state.profile = null;
            state.errors = null;
            state.repos = []
            setAuthToken(null);
        });
    }
});

export default profileSlice.reducer;
export const {clearProfileErrors} = profileSlice.actions;