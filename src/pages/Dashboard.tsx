import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, updateLocalTodo } from "../redux/slices/todoSlice";
import type { Todo } from "../types/todo";
import type { RootState, AppDispatch } from "../redux/store";
import { CalendarBoard } from "../components/CalendarBoard";
import { deleteLocalTodo } from "../redux/slices/todoSlice";

export default function Dashboard() {
    const dispatch = useDispatch<AppDispatch>();
    const { list: todos, loading } = useSelector((state: RootState) => state.todos);
    const [selectedDate, setSelectedDate] = useState(new Date());


    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleMarkComplete = (task: Todo) => {
        dispatch(updateLocalTodo({ ...task, status: "done" }));
    };



    return (
        <div className="p-5">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <CalendarBoard
                    tasks={todos}
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                    onMarkComplete={handleMarkComplete}
                    onDeleteLocal={(task) => dispatch(deleteLocalTodo(task.id))}
                />
            )}
        </div>
    );
}
