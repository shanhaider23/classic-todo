import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { CalendarBoard } from "../components/CalendarBoard";
import type { Todo } from "../types/todo";

export default function Dashboard() {
    const { todos, loading, markComplete, deleteTodo } = useTodos();
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div className="p-5">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <CalendarBoard
                    tasks={todos}
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                    onMarkComplete={markComplete}
                    onDeleteLocal={(task: Todo) => deleteTodo(task.id)}
                />
            )}
        </div>
    );
}
