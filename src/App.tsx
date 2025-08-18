import { Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddTodo from "./pages/AddTodo";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">

      <header className="bg-white border-b shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-50">

        <div className="flex items-center gap-2">
          <img
            src="/todo-list.png"
            alt="Logo"
            className="h-9 w-9 rounded-full shadow"
          />
          <span className="text-xl font-bold text-gray-800">Classic Todos</span>
        </div>


        <nav className="flex gap-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `font-medium transition-colors ${isActive
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/add"
            className={({ isActive }) =>
              `font-medium transition-colors ${isActive
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
              }`
            }
          >
            Add Todo
          </NavLink>
        </nav>
      </header>


      <main className="p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddTodo />} />
        </Routes>
      </main>
    </div>
  );
}
