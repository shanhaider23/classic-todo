import type { Todo } from "../types/todo";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { format } from "date-fns";
import { CheckCircle, Trash2 } from "lucide-react";

const localizer = momentLocalizer(moment);

// Extend Todo for calendar-specific usage
interface CalendarTodo extends Todo {
    isLocal?: boolean; // flag to know if the todo is from localStorage
}

interface CalendarBoardProps {
    tasks: CalendarTodo[];
    selectedDate: Date;
    onSelectDate: (date: Date) => void;
    onMarkComplete: (task: CalendarTodo) => void;
    onDeleteLocal: (task: CalendarTodo) => void; // callback for local todos
}

interface CalendarEvent {
    id: number;
    title: string;
    start: Date;
    end: Date;
}

export const CalendarBoard: React.FC<CalendarBoardProps> = ({
    tasks,
    selectedDate,
    onSelectDate,
    onMarkComplete,
    onDeleteLocal,
}) => {
    const events: CalendarEvent[] = tasks.map((t) => ({
        id: t.id,
        title: t.title,
        start: new Date(t.date),
        end: new Date(t.date),
    }));

    const handleDelete = (task: CalendarTodo) => {

        console.log("Deleting task:", task);
        if (task.isLocal) {
            onDeleteLocal(task);
        } else {
            alert("Deleting API todo not implemented yet");
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-5">
            <div className="w-full lg:w-1/3">
                <h1 className="text-xl font-bold mb-3">
                    Todos for {format(selectedDate, "PPP")}
                </h1>

                {tasks
                    .filter(
                        (t) =>
                            format(new Date(t.date), "PPP") === format(selectedDate, "PPP") &&
                            t.status === "todo"
                    )
                    .map((task) => (
                        <div
                            key={task.id}
                            className="flex items-center justify-between p-3 border rounded-md mb-2"
                        >
                            <span>{task.title}</span>
                            <div className="flex gap-2">
                                <button onClick={() => onMarkComplete(task)}>
                                    <CheckCircle className="text-green-600 hover:text-green-800" />
                                </button>
                                <button onClick={() => handleDelete(task)}>
                                    <Trash2 className="text-red-600 hover:text-red-800" />
                                </button>
                            </div>
                        </div>
                    ))}

                <h2 className="text-lg font-semibold mt-6">Completed</h2>
                {tasks
                    .filter((t) => t.status === "done")
                    .map((task) => (
                        <div
                            key={task.id}
                            className="flex items-center justify-between p-2 border rounded-md mb-1 line-through text-gray-500"
                        >
                            <span>{task.title}</span>
                            {task.isLocal && (
                                <button onClick={() => handleDelete(task)}>
                                    <Trash2 className="text-red-600 hover:text-red-800" />
                                </button>
                            )}
                        </div>
                    ))}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4 w-full lg:w-2/3">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 600 }}
                    onSelectEvent={(event) => console.log(event)}
                    views={["month", "week", "day"]}
                    defaultView="month"
                    toolbar={true}
                    popup={true}
                    onNavigate={(date) => onSelectDate(date)}
                    date={selectedDate}
                />
            </div>
        </div>
    );
};
