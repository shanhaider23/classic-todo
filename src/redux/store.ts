import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";

export const store = configureStore({
    reducer: {
        todos: todoReducer, // ✅ make sure the key is `todos`
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
