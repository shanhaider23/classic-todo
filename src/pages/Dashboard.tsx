import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, updateTodo } from "../redux/slices/todoSlice";
import type { RootState, AppDispatch } from "../redux/store";
import type { Todo } from "../types/todo";
import { CalendarBoard } from "../components/CalendarBoard";

export default function Dashboard() {
    const dispatch = useDispatch<AppDispatch>();
    const { list: tasks, loading } = useSelector((state: RootState) => state.tasks);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleMarkComplete = (task: Todo) => {
        dispatch(updateTodo({ ...task, status: "done" }));
    };

    return (
        <div className="p-5">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <CalendarBoard
                    tasks={tasks}
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                    onMarkComplete={handleMarkComplete}
                />
            )}
        </div>
    );
}
