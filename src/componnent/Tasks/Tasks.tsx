import { db } from "../../../firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import type { TaskType } from "../Home/Home";

interface TasksProps {
  tasks: TaskType[];
  editTask: (id: string, newTitle: string) => void; // وظيفة تعديل المهمة
}

const Tasks = ({ tasks, editTask }: TasksProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const toggleDone = async (task: TaskType) => {
    try {
      await updateDoc(doc(db, "tasks", task.id), {
        done: !task.done,
      });
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleDoubleClick = (task: TaskType) => {
    setEditingId(task.id);
    setEditText(task.title);
  };

  const handleEditSubmit = async (task: TaskType) => {
    if (editText.trim() === "") return;
    await editTask(task.id, editText);
    setEditingId(null);
  };

  return (
    <>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex flex-wrap justify-between items-center my-4 bg-white dark:bg-slate-700  rounded-2xl py-2 px-3 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center gap-0 md:gap-3 w-[80%]  ">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleDone(task)}
              className="checkbox text-gray-900 bg-slate-200 me-6 dark:bg-slate-800 dark:text-slate-200"
            />

            <div className="flex flex-col gap-1 w-full pe-2 ">
              {editingId === task.id ? (
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={() => handleEditSubmit(task)}
                  onKeyDown={(e) => e.key === "Enter" && handleEditSubmit(task)}
                  autoFocus
                  className="w-full border-b-2 border-blue-400 focus:outline-none py-1 px-2 rounded dark:text-white"
                />
              ) : (
                <p
                  onDoubleClick={() => handleDoubleClick(task)}
                  className={`wrap-break-word whitespace-normal dark:text-white ${
                    task.done ? "line-through text-gray-400" : "text-gray-800"
                  } cursor-pointer`}
                >
                  {task.title}
                </p>
              )}

              <p className="text-sm text-gray-500">
                {task.createdAt?.toDate
                  ? task.createdAt.toDate().toLocaleString("en-US")
                  : ""}
              </p>
            </div>
          </div>

          <button
            className="bg-red-100 py-1.5 px-3 rounded-2xl mt-2 mx-auto text-red-700 text-[15px] dark:bg-slate-300 dark:text-red-600 dark:border-2 dark:border-white shrink-0 h-fit hover:bg-red-200 transition-colors cursor-pointer"
            onClick={() => handleDelete(task.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
};

export default Tasks;
