import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Todo, TasksState } from "../../types/todo";
import * as api from "../../api/todoApi";

// --- Load todos from localStorage ---
const loadLocalTodos = (): Todo[] => {
    try {
        const stored = localStorage.getItem("localTodos");
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

// --- Save todos to localStorage ---
const saveLocalTodos = (todos: Todo[]) => {
    localStorage.setItem("localTodos", JSON.stringify(todos));
};

// --- Async API thunks (still supported) ---
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
    async (task) => task
);

// --- Initial State (hydrate from localStorage) ---
const initialState: TasksState = {
    list: loadLocalTodos(),
    loading: false,
    error: null,
};

// --- Slice ---
const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        // Local-only todos (persisted to localStorage)
        addLocalTodo: (state, action: PayloadAction<Todo>) => {
            state.list.push(action.payload);
            saveLocalTodos(state.list);
        },
        updateLocalTodo: (state, action: PayloadAction<Todo>) => {
            const index = state.list.findIndex((t) => t.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = action.payload;
                saveLocalTodos(state.list);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
                // Merge API todos + localStorage todos (avoid duplicates by id)
                const local = loadLocalTodos();
                const merged = [...action.payload];
                local.forEach((lt) => {
                    if (!merged.find((t) => t.id === lt.id)) merged.push(lt);
                });

                state.list = merged;
                state.loading = false;
                saveLocalTodos(state.list); // keep storage synced
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch todos";
            })
            .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
                state.list.push(action.payload);
                saveLocalTodos(state.list);
            })
            .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
                const index = state.list.findIndex((todo) => todo.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                    saveLocalTodos(state.list);
                }
            });
    },
});

export const { addLocalTodo, updateLocalTodo } = todoSlice.actions;
export default todoSlice.reducer;
