import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, addLocalTodo, updateLocalTodo, deleteLocalTodo } from "../redux/slices/todoSlice";
import type { Todo } from "../types/todo";
import type { RootState, AppDispatch } from "../redux/store";

export function useTodos() {
    const dispatch = useDispatch<AppDispatch>();
    const { list: todos, loading } = useSelector((state: RootState) => state.todos);


    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);


    const addTodo = (todo: Todo) => dispatch(addLocalTodo(todo));
    const markComplete = (todo: Todo) => dispatch(updateLocalTodo({ ...todo, status: "done" }));
    const deleteTodo = (id: number) => dispatch(deleteLocalTodo(id));

    return { todos, loading, addTodo, markComplete, deleteTodo };
}
