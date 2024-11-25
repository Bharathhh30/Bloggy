import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const store = configureStore({
    reducer :{
        auth : authSlice,
        // Todo : add more slice
    }
});

export default store;