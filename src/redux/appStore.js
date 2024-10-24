import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./slices/userSlice";
import feedReducer from "./slices/feedSlice";
import connectionsReducer from "./slices/connectionSlice";
import requestReducer from "./slices/requestSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connections: connectionsReducer,
        request: requestReducer
    },
})

export default store;