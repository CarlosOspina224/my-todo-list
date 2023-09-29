// App.jsx
import { useEffect, useState } from "react";
import { loadFromLocalStorage, saveOnLocalStorage, clearLocalStorage, clearLocalStorageByAttribute, editLocalStorageById } from "./Tools/Local_Storage_Tools";

// Components
import { Header } from "./Components/Header";
import { Main } from "./Components/Main";
import { Footer } from "./Components/Footer";

// Styles
import "./App.css";

// Variables
const LS_KEY = "To-Do-Saved: savedTasks";

function App() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const data = loadFromLocalStorage(LS_KEY);

        if (data !== null) {
            setTasks(data);
        }
    }, [])

    function addTask(taskTitle) {
        const newTasks = {
            id: crypto.randomUUID(),
            title: taskTitle,
            completed: false,
            isEditing: false,
        };

        const updatedTasks = [...tasks, newTasks];
        setTasks(updatedTasks);
        saveOnLocalStorage(LS_KEY, updatedTasks);
    }

    function toggleTaskCompleted(taskId) {
        const taskIndice = tasks.findIndex((task) => task.id === taskId)

        if (!(taskIndice == -1)) {
            const newTasks = tasks[taskIndice];
            newTasks.completed = !(newTasks.completed)

            editLocalStorageById(LS_KEY, newTasks.id, newTasks);
            setTasks([...tasks]);
        }
    }

    function toggleEditTask(taskId) {
        const taskIndice = tasks.findIndex((task) => task.id === taskId)

        if (!(taskIndice == -1)) {
            const newTasks = tasks[taskIndice];
            newTasks.isEditing = !(newTasks.isEditing)

            editLocalStorageById(LS_KEY, newTasks.id, newTasks);
            setTasks([...tasks]);
        }
    }

    function deleteTask(taskId) {
        const newTasks = tasks.filter(task => task.id !== taskId);

        setTasks(newTasks);
        saveOnLocalStorage(LS_KEY, newTasks);
    }

    function deleteAllTasks() {
        const clearer = clearLocalStorage(LS_KEY);
        setTasks(clearer);
    }

    function deleteAllCompletedTasks() {
        clearLocalStorageByAttribute(LS_KEY, "completed", true);
        // loadTasks();
    }

    return (
        <>
            <Header handleAddTask={addTask} />
            <Main tasks={tasks} onComplete={toggleTaskCompleted} onDelete={deleteTask} onEdit={toggleEditTask} />
            <Footer tasks={setTasks} onDeleteAll={deleteAllTasks} onDeleteAllCompleted={deleteAllCompletedTasks} />
        </>
    );
}

export default App;
