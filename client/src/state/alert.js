import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const initialState= []

export const alertSlice =  createSlice({
    name: "alert",
    initialState,
    reducers: {
        setAlert: (state, action) =>  {
            state.push(
                {id: uuidv4(),
                 msg: action.payload.msg,
                 alertType : action.payload.alertType
                })
        },

        clearAlert: () => {
            return [];
        }
    }
});

export default alertSlice.reducer;
export const { setAlert, clearAlert } = alertSlice.actions;