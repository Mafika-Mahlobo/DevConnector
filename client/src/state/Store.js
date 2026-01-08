import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './alert';
import registerReducer from './auth';

export default configureStore({
    reducer: {
        alert: alertReducer,
        auth: registerReducer
    }
});