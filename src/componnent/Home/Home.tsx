import { addDoc, collection, onSnapshot, query, serverTimestamp, where, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import Tasks from "../Tasks/Tasks";
import useAuth from "../UseAuth/UseAuth";

export type TaskType = {
  id: string; 
  title: string;
  done: boolean;
  createdAt: any; 
  updatedAt?: any;
  userId: string;
};

const Home = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const { user, loading } = useAuth();
  const [filter, setFilter] = useState<"all" | "active" | "done">("all");

  const addTask = async () => {
    if (task.trim() === "") return;
    if (!auth.currentUser) return;

    try {
      await addDoc(collection(db, "tasks"), {
        title: task,
        done: false,
        createdAt: serverTimestamp(),
        userId: auth.currentUser.uid,
      });
      setTask("");
    } catch (err) {
      console.error("Error adding task: ", err);
    }
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  const clearDoneTasks = async () => {
    const doneTasks = tasks.filter((t) => t.done);
    for (const t of doneTasks) {
      await deleteDoc(doc(db, "tasks", t.id));
    }
  };

  const resetTasks = async () => {
    for (const t of tasks) {
      await deleteDoc(doc(db, "tasks", t.id));
    }
  };

  const editTask = async (id: string, newTitle: string) => {
    const taskRef = doc(db, "tasks", id);
    await updateDoc(taskRef, {
      title: newTitle,
      updatedAt: serverTimestamp(),
    });
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return;

    const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<TaskType, "id">),
      }));
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, [user, loading]);

  return (
    <div className="flex justify-center items-center py-5 bg-white text-black  dark:bg-slate-950">
      <div className="md:w-[45%] w-72 bg-gray-200 dark:bg-slate-800 dark:text-white px-5 rounded-2xl shadow-[20px_20px_40px_rgba(0,0,0,0.3)]">
        {/* Header */}
        <div className="flex justify-between items-center w-full my-3">
          <h1 className="text-[23px] md:text-3xl font-bold whitespace-nowrap">
            <i className="fa-solid fa-calendar-check  text-green-700 fa-fa-2x"></i> To-Do List
          </h1>
          <p className="w-20 text-[18px]">{tasks.length} items</p>
        </div>

        {/* Input  */}
        <div className="flex items-center justify-around my-4">
          <input
            type="text"
            placeholder="Type a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-[85%] px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-300 text-gray-800 dark:text-slate-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button onClick={addTask} type="button" className="bg-green-700 ms-3 py-2 rounded-2xl px-5 text-white cursor-pointer">
            Add
          </button>
        </div>

        <div className="md:flex md:justify-between md:items-center mb-3">
          <div>
            <button onClick={() => setFilter("all")} className="bg-white dark:bg-slate-800 dark:border-2 dark:border-white py-1 px-3 rounded-3xl hover:bg-gray-400 cursor-pointer">
              All
            </button>
            <button onClick={() => setFilter("active")} className="bg-white dark:bg-slate-800 dark:border-2 dark:border-white py-1 px-3 rounded-3xl hover:bg-gray-400 mx-3 cursor-pointer">
              Active
            </button>
            <button onClick={() => setFilter("done")} className="bg-white dark:bg-slate-800 dark:border-2 dark:border-white mt-2 py-1 px-3 rounded-3xl hover:bg-gray-400 cursor-pointer">
              Done
            </button>
          </div>
          <div>
            <button onClick={clearDoneTasks} className="bg-white dark:bg-slate-800 dark:border-2 dark:border-white py-1 px-3 rounded-3xl hover:bg-gray-400 cursor-pointer">
              Clear Done
            </button>
            <button onClick={resetTasks} className="bg-white dark:bg-slate-800 dark:border-2 dark:border-white py-1 px-3 mt-2 rounded-3xl hover:bg-gray-400 ms-2 me-4 cursor-pointer">
              Reset
            </button>
          </div>
        </div>

        <Tasks tasks={filteredTasks} editTask={editTask} />

        <div className="justify-end flex my-2">
          <p className="text-gray-800 text-[13px] dark:text-white">Double‑click a task to edit ✏️</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
