import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setAuthToken } from "./utils/setAuthToken";
import { AUTH_LOAD_USER, AUTH_REGISTER } from "./types";

 const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: false,
    user: null,
    errors: null
 };

 //Load user
export const loadUser = createAsyncThunk(
    AUTH_LOAD_USER,
    async (thunkAPI) => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        } 

        try {

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const res = await axios.get('/api/auth', config);

            //return user object
            return res.data

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
) ;


 //Register user
 export const registerUser = createAsyncThunk(
    AUTH_REGISTER,
    async ({name, email, password}, thunkAPI) => {
        try {
            const config = {
                headers: {
                    "ContentType": "application/json"
                }
            };

            const res = await axios.post('/api/users', {name, email, password}, config);

            //add token to local storage
            const token = res.data.token;
            localStorage.setItem('token', token);
            
            //add token to headers
            setAuthToken(token);

            //dispath load user
            thunkAPI.dispatch(loadUser());

            //return JWT
            return res.data

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

//login user
 export const loginUser = createAsyncThunk(
    "auth/login",
    async ({email, password}, thunkAPI) => {
        try {
            const config = {
                headers: {
                    "ContentType": "application/json"
                }
            };

            const res = await axios.post('/api/auth', {email, password}, config);

            //add token to local storage
            const token = res.data.token;
            localStorage.setItem('token', token);
            
            //add token to headers
            setAuthToken(token);

            //dispath load user
            thunkAPI.dispatch(loadUser());

            //return JWT
            return res.data

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.errors = null;
            state.loading = false;
        },
        clearAuthErrors: (state) => {
            state.errors = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.token = action.payload.token;
            state.loading = false;
            state.isAuthenticated = true;
            state.errors = null;
        })
        .addCase(registerUser.rejected, (state, action) => {
            localStorage.removeItem('token');
            state.loading = false;
            state.isAuthenticated = false;
            state.errors = action.payload;
            state.token = null;
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload
            state.isAuthenticated = true;
            state.errors = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
            localStorage.removeItem('token');
            state.loading = false;
            state.isAuthenticated = false;
            state.errors = action.payload;
            state.token = null;
        })
        .addCase(loadUser.fulfilled, (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true;
        })
        .addCase(loadUser.rejected, (state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.user = null
        });
    }
});

export default authSlice.reducer;
export const { logout, clearAuthErrors } = authSlice.actions;