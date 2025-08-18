export type TodoStatus = "todo" | "done";

export interface Todo {
    id: number;
    title: string;
    date: string; // ISO string
    status: TodoStatus;
}

export interface TasksState {
    list: Todo[];
    loading: boolean;
    error: string | null;
}

export type ApiTodo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};