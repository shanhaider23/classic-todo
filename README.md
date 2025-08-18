# Todo Calendar App

A simple Todo application with a calendar view built using **React**, **Redux Toolkit**, **TypeScript**, and **TailwindCSS**. This app allows users to create, complete, and manage todos both locally and via an API, while keeping data persistent in **localStorage**.

---

## Features

- Add new todos with a title and date.
- View todos for a selected date in a **calendar** or list view.
- Mark todos as completed.
- Delete local todos.
- Persist todos in **localStorage** to survive page refreshes.
- Sync todos with a backend API (simulated with async thunks).
- Separate handling of local vs API todos while maintaining a single source of truth via Redux.
- Responsive UI with TailwindCSS.

---

## Technologies Used

- **React + TypeScript** – Frontend framework with strong typing.
- **Redux Toolkit** – State management for todos.
- **react-big-calendar** – Calendar display with month/week/day views.
- **TailwindCSS** – Styling and layout.
- **localStorage** – Persistent storage for local todos.
- **Async Thunks** – Handling API calls and synchronization.
- **date-fns / moment** – Date formatting and calendar integration.
- **lucide-react** – Icons for actions like complete and delete.

---

## Project Structure

src/
├─ api/ # API functions for fetch/create todos
├─ components/ # CalendarBoard
├─ hooks/ # Custom hooks: useTodos
├─ redux/
│ ├─ slices/ # Redux slices for todos
│ └─ store.ts
├─ types/ # TypeScript types (Todo, TasksState)
├─ pages/ # AddTodo and Dashboard pages

---

## How It Works

1. **Local + API Todos**

   - Todos are stored in **Redux** as the single source of truth.
   - Local todos are also saved in **localStorage** for persistence across page refreshes.
   - On app load, local todos are merged with API todos to create a combined state.

2. **Custom Hooks**

   - `useTodos` (or Redux) handles the main state and API synchronization.

3. **CalendarBoard**

   - Displays todos in a calendar using `react-big-calendar`.
   - Users can select a date, see todos for that day, mark them complete, or delete local todos.
   - Supports **month, week, and day views**.

4. **Adding Todos**

   - Todos can be added via the `AddTodo` page.
   - Each new todo is saved to **Redux** and **localStorage**.
   - Only today's todos are shown in the list below the form.

5. **State Synchronization**
   - Redux slice handles API fetching, adding, deleting local todos.
   - Local todos are loaded from localStorage and merged on fetch.
   - Actions like `addLocalTodo`, `updateLocalTodo`, and `deleteLocalTodo` update both Redux state and localStorage.

---

## Approach

This project was built using a **bottom-up approach**:

1. Defined **types** (`Todo`, `TasksState`) for clear structure.
2. Implemented **Redux slices** for todo management with async thunks.
3. Created **custom hooks** for handling localStorage.
4. Built **UI components** starting with the Todo form and list.
5. Integrated the **calendar view**, connecting it to Redux and localStorage state.
6. Handled edge cases like duplicate keys, date filtering, and merging API + local todos.

---

## Future Improvements

- Full API integration for delete and update operations.
- Drag-and-drop support for todos in calendar.
- User authentication for multi-user support.
- Notifications for upcoming todos.

---

## Usage

1. Clone the repo:

```bash
git clone https://github.com/shanhaider23/todo-calendar-app.git

npm install


npm run dev
```
