import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/slices/todoSlice";
import type { AppDispatch } from "../redux/store";

export default function AddTodo() {
    const dispatch = useDispatch<AppDispatch>();
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !date) return alert("Enter title and date");
        dispatch(addTodo({ title, date, status: "todo" }));
        setTitle("");
        setDate("");
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Add Todo</h1>
            <form
                onSubmit={handleSubmit}
                className="space-y-4 border p-4 rounded-md shadow-sm bg-white"
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
        </div>
    );
}
