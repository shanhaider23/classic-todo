import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, updateTodo, } from "../redux/slices/todoSlice";
import type { Todo, } from "../types/todo";
import type { RootState, AppDispatch } from "../redux/store";
import { CalendarBoard } from "../components/CalendarBoard";

export default function Dashboard() {
    const dispatch = useDispatch<AppDispatch>();
    const todosState = useSelector((state: RootState) => state.todos); // ✅ use 'todos'
    const { list: apiTodos, loading } = todosState;
    const [localTodos, setLocalTodos] = useState<Todo[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Load local todos from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("localTodos");
        if (stored) setLocalTodos(JSON.parse(stored));
    }, []);

    // Fetch API todos
    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleMarkComplete = (task: Todo) => {
        // Update both API and local todos
        if (localTodos.find((t) => t.id === task.id)) {
            setLocalTodos((prev) =>
                prev.map((t) => (t.id === task.id ? { ...t, status: "done" } : t))
            );
            localStorage.setItem(
                "localTodos",
                JSON.stringify(
                    localTodos.map((t) => (t.id === task.id ? { ...t, status: "done" } : t))
                )
            );
        } else {
            dispatch(updateTodo({ ...task, status: "done" }));
        }
    };

    // Combine API + local todos
    const combinedTodos = [...apiTodos, ...localTodos];

    return (
        <div className="p-5">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <CalendarBoard
                    tasks={combinedTodos}
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                    onMarkComplete={handleMarkComplete}
                />
            )}
        </div>
    );
}
