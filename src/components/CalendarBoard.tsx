import type { Todo } from "../types/todo";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { format } from "date-fns";
import { CheckCircle } from "lucide-react";

const localizer = momentLocalizer(moment);

interface CalendarBoardProps {
    tasks: Todo[];
    selectedDate: Date;
    onSelectDate: (date: Date) => void;
    onMarkComplete: (task: Todo) => void;
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
}) => {
    const events: CalendarEvent[] = tasks.map((t) => ({
        id: t.id,
        title: t.title,
        start: new Date(t.date),
        end: new Date(t.date),
    }));

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
                            <button onClick={() => onMarkComplete(task)}>
                                <CheckCircle className="text-green-600 hover:text-green-800" />
                            </button>
                        </div>
                    ))}

                <h2 className="text-lg font-semibold mt-6">Completed</h2>
                {tasks
                    .filter((t) => t.status === "done")
                    .map((task) => (
                        <div
                            key={task.id}
                            className="p-2 border rounded-md mb-1 line-through text-gray-500"
                        >
                            {task.title}
                        </div>
                    ))}
            </div>

            <div className="w-full ">
                <Calendar
                    localizer={localizer}


                />
            </div>
        </div>
    );
};
