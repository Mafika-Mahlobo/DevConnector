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

// Get current profile
export const getCurrentProfile = createAsyncThunk(
    "profile/current",
    async (_, thunkAPI) => {
        try {
    
            const res = await axios.get('/api/profile/me');

            return res.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

//Get all profiles
export const getProfiles = createAsyncThunk(
    "profiles",
    async (_, thunkAPI) => {
        try {

            const res = await axios.get('/api/profile');

            return res.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

//Get profile by id
export const getProfileById = createAsyncThunk(
    "profile/byId",
    async (UserId, thunkAPI) => {
        try {
            const res = await axios.get(`/api/profile/user/${UserId}`);

            return res.data[0];

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Get github repos
export const getGithubRepos = createAsyncThunk(
    "profile/github",
    async (username, thunkAPI) => {
        try {
            const res = await axios.get(`/api/profile/github/${username}`);

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
);

//Delete experience
export const deleteExperience = createAsyncThunk(
    "profile/delete/experience",
    async (id, thunkAPI) => {
        try {
            const res = await axios.delete(`/api/profile/experience/${id}`);

            thunkAPI.dispatch(setAlert({msg: "Experience has been deleted", alertType: ALERT_SUCCESS}));
            return res.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
);

//Delete education
export const deleteEducation = createAsyncThunk(
    "profile/delete/education",
    async (id, thunkAPI) => {
        try {
            const res = await axios.delete(`/api/profile/education/${id}`);

            thunkAPI.dispatch(setAlert({msg: "Education has been deleted", alertType: ALERT_SUCCESS}));
            return res.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
);

//Delete acoount and profile
export const deleteAccount = createAsyncThunk(
    "profile/delete",
    async (__, thunkAPI) => {

        if (window.confirm("Are you sure? This cannot be undone.")) {

            try {
            await axios.delete("/api/profile");

            thunkAPI.dispatch(setAlert("Account has been deleted", ALERT_SUCCESS));
            thunkAPI.dispatch(logout());

            } catch (error) {
                return thunkAPI.rejectWithValue(error.response.data)
            }

        }
    }
);

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        clearProfileErrors: (state) => {
            state.errors = null;
        },

        clearProfile: (state) => {
            state.profile = null;
        },
        clearRepos: (state) => {
            state.repos = [];
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
        .addCase(getProfiles.pending, (state) => {
            state.loading = true;
        })
        .addCase(getProfiles.fulfilled, (state, action) => {
            state.loading = false;
            state.profiles = action.payload;
        })
        .addCase(getProfiles.rejected, (state, action) => {
            state.loading = false;
            state.errors = action.payload;
        })
        .addCase(getProfileById.pending, (state) => {
            state.loading = true;
        })
        .addCase(getProfileById.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
        })
        .addCase(getProfileById.rejected, (state, action) => {
            state.loading = false;
            state.errors = action.payload;
        })
        .addCase(getGithubRepos.pending, (state) => {
            state.loading = true;
        })
        .addCase(getGithubRepos.fulfilled, (state, action) => {
            state.loading = false;
            state.repos = action.payload;
        })
        .addCase(getGithubRepos.rejected, (state, action) => {
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
        .addCase(deleteExperience.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
        })
        .addCase(deleteEducation.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
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
export const {clearProfileErrors, clearProfile, clearRepos} = profileSlice.actions;