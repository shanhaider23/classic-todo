import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, updateLocalTodo } from "../redux/slices/todoSlice";
import type { Todo } from "../types/todo";
import type { RootState, AppDispatch } from "../redux/store";
import { CalendarBoard } from "../components/CalendarBoard";

export default function Dashboard() {
    const dispatch = useDispatch<AppDispatch>();
    const { list: todos, loading } = useSelector((state: RootState) => state.todos);
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Fetch todos on mount (API + local are merged in slice)
    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleMarkComplete = (task: Todo) => {
        // Update todo status in Redux slice (slice handles localStorage)
        dispatch(updateLocalTodo({ ...task, status: "done" }));
    };

    // Filter tasks for selected date if needed in CalendarBoard
    const tasksForDate = todos.filter(
        (t) => t.date.split("T")[0] === selectedDate.toISOString().split("T")[0]
    );

    return (
        <div className="p-5">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <CalendarBoard
                    tasks={tasksForDate}
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                    onMarkComplete={handleMarkComplete}
                />
            )}
        </div>
    );
}
