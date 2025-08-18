import axios from 'axios';
import type { Todo, ApiTodo } from '../types/todo';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';


export const fetchTodos = async (): Promise<Todo[]> => {
    try {
        const res = await axios.get<ApiTodo[]>(API_URL, { params: { _limit: 5 } });
        console.log('todos:', res.data);
        return res.data.map((t) => ({
            id: t.id,
            title: t.title,
            date: new Date().toISOString(),
            status: t.completed ? "done" : "todo",
        }));
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
};

export const createTodo = async (todo: Omit<Todo, "id">): Promise<Todo> => {
    const res = await axios.post(API_URL, todo, {
        headers: { "Content-Type": "application/json" },
    });
    return { ...todo, id: res.data.id || Math.floor(Math.random() * 100000) };
};