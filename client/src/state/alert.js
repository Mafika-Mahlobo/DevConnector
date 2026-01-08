import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const initialState= {
        id: null,
        msg: '',
        alertType: ''
    };

export const alertSlice =  createSlice({
    name: "alert",
    initialState,
    reducers: {
        passwordNoMatch: (state, action) =>  {
            state.id = uuidv4();
            state.msg = action.payload.msg;
            state.alertType = action.payload.alertType;
        },

        clearAlert: (state) => {
            state.id = null;
            state.msg = '';
            state.alertType = '';
        }
    }
});

export default alertSlice.reducer;
export const { passwordNoMatch, clearAlert } = alertSlice.actions;