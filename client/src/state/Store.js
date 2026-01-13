import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './alert';
import authReducer from './auth';
import profileReducer from './profile'

export default configureStore({
    reducer: {
        alert: alertReducer,
        auth: authReducer,
        profile: profileReducer
    }
});