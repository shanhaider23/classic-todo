import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Todo, TasksState } from "../../types/todo";
import * as api from "../../api/todoApi";


export const fetchTodos = createAsyncThunk<Todo[]>(
    "todos/fetch",
    async () => {
        return await api.fetchTodos();
    }
);

export const addTodo = createAsyncThunk<Todo, Omit<Todo, "id">>(
    "todos/add",
    async (todo) => {
        return await api.createTodo(todo);
    }
);

export const updateTodo = createAsyncThunk<Todo, Todo>(
    "todos/update",
    async (task) => task)

const initialState: TasksState = {
    list: [],
    loading: false,
    error: null,
};

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch todos";
            })
            .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
                state.list.push(action.payload);
            })
            .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
                const index = state.list.findIndex(todo => todo.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            });
    },
});

export default todoSlice.reducer;

