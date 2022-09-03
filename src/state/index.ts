import { configureStore } from "@reduxjs/toolkit";
import repositorySlice from "./reducers";

const store = configureStore({
    reducer: {
        repoState:repositorySlice
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;