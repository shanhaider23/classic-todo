import { useEffect, useState } from "react";
import type { Todo } from "../types/todo";

export function useLocalTodos() {
    const [localTodos, setLocalTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem("localTodos");
        if (stored) {
            setLocalTodos(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("localTodos", JSON.stringify(localTodos));
    }, [localTodos]);

    const markLocalComplete = (taskId: number) => {
        setLocalTodos((prev) =>
            prev.map((t) => (t.id === taskId ? { ...t, status: "done" } : t))
        );
    };

    return { localTodos, setLocalTodos, markLocalComplete };
}

// Utility helpers
export function loadLocalTodos(): Todo[] {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem("localTodos");
    return data ? JSON.parse(data) : [];
}

export function saveLocalTodos(todos: Todo[]) {
    localStorage.setItem("localTodos", JSON.stringify(todos));
}
