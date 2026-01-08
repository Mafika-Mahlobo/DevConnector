import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


 const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    errors: null
 }

export const registerSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
         register: async (state, {name, email, password}) => {
            
            //Using axios to send a post request
            const userData = {
                name,
                email,
                password
            }

            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }

                const body = JSON.stringify(userData);

                const res = await axios.post('/api/users', body, config);
                

            } catch (error) {
                console.error(error);
            }
         }
    }
});

export default registerSlice.reducer;
export const { register } = registerSlice.actions;