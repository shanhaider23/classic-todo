import { Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddTodo from "./pages/AddTodo";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-4 py-3 flex gap-4">
        <NavLink to="/" className="font-semibold">
          Dashboard
        </NavLink>
        <NavLink to="/add" className="font-semibold">
          Add Todo
        </NavLink>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddTodo />} />
        </Routes>
      </main>
    </div>
  );
}
