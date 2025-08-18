import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, addLocalTodo } from "../redux/slices/todoSlice";
import type { Todo } from "../types/todo";
import type { AppDispatch, RootState } from "../redux/store";

export default function AddTodo() {
    const dispatch = useDispatch<AppDispatch>();
    const tasks = useSelector((state: RootState) => state.todos.list);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");

    // Load todos (this will hydrate localStorage + API merged state)
    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) return alert("Enter a title");

        const todoDate = date || new Date().toISOString().split("T")[0];

        const newTodo: Todo = {
            id: Date.now(),
            title,
            date: todoDate,
            status: "todo",
        };

        // ✅ Add directly to Redux slice (persists to localStorage inside reducer)
        dispatch(addLocalTodo(newTodo));

        setTitle("");
        setDate("");
    };

    // Show todos for today
    const today = new Date().toISOString().split("T")[0];
    const displayTodos = tasks.filter((t) => t.date.split("T")[0] === today);

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Add Todo</h1>
            <form
                onSubmit={handleSubmit}
                className="space-y-4 border p-4 bg-white rounded-md border-gray-100 shadow-lg "
            >
                <input
                    type="text"
                    placeholder="Todo title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border rounded-md p-2"
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border rounded-md p-2"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md"
                >
                    Add Todo
                </button>
            </form>

            <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Todos for Today</h2>
                {displayTodos.length === 0 && <p>No todos for today</p>}
                {displayTodos.map((t) => (
                    <div
                        key={t.id}
                        className={`p-2 border rounded-md mb-1 border-gray-400 shadow-lg ${t.status === "done" ? "line-through text-gray-500" : ""
                            }`}
                    >
                        {t.title}
                    </div>
                ))}
            </div>
        </div>
    );
}
