// TodoList.jsx
import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState("");
    const [editMode, setEditMode] = useState({});
    const [editedTaskText, setEditedTaskText] = useState("");
    const [completedTasks, setCompletedTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Cargar tareas al montar el componente
        fetch("http://localhost:3000/tasks")
            .then((response) => response.json())
            .then((data) => {
                // Verifica si la respuesta contiene un arreglo de tareas
                if (Array.isArray(data) && data.length > 0) {
                    setTasks(data); // Establece las tareas en el estado
                    setIsLoading(false);
                } else {
                    console.error(
                        "La respuesta del servidor no contiene un arreglo de tareas válido:",
                        data
                    );
                }
            })
            .catch((error) => {
                console.error("Error al cargar tareas:", error);
                setIsLoading(false);
            });
    }, []);

    const addTask = () => {
        if (taskText.trim() !== "") {
            const newTask = { text: taskText, completed: false };

            fetch("http://localhost:3000/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTask),
            })
                .then((response) => response.json())
                .then((data) => {
                    setTasks([...tasks, data]);
                    setTaskText("");
                })
                .catch((error) =>
                    console.error("Error al agregar tarea:", error)
                );
        } else {
            alert("Please type a task before adding it.");
        }
    };

    const deleteTask = (id) => {
        fetch(`http://localhost:3000/tasks/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                const newTasks = tasks.filter((task) => task.id !== id);
                setTasks(newTasks);
            })
            .catch((error) => console.error("Error al eliminar tarea:", error));
    };

    const toggleEditMode = (index) => {
        setEditMode({ ...editMode, [index]: !editMode[index] });
        // Si se activa el modo de edición, establece el texto de edición con el valor actual de la tarea
        if (!editMode[index]) {
            setEditedTaskText(tasks[index].text);
        }
    };

    const editTask = (index) => {
        const editedTask = tasks[index];
        editedTask.text = editedTaskText;

        fetch(`http://localhost:3000/tasks/${editedTask.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedTask),
        })
            .then((response) => response.json())
            .then((data) => {
                // Actualiza el estado local si la solicitud se realizó con éxito
                const newTasks = [...tasks];
                newTasks[index] = data;
                setTasks(newTasks);
                toggleEditMode(index); // Desactiva el modo de edición
            })
            .catch((error) => {
                console.error("Error al editar tarea:", error);
            });
    };

    const toggleComplete = (index) => {
        const updatedTasks = [...tasks]; // Copia el estado actual de las tareas
        const updatedCompletedTasks = [...completedTasks]; // Copia el estado actual de las tareas completadas

        if (completedTasks.includes(index)) {
            // Si la tarea ya está marcada como completada, quítala de las completadas
            updatedCompletedTasks.splice(
                updatedCompletedTasks.indexOf(index),
                1
            );
        } else {
            // Si la tarea no está marcada como completada, agrégala a las completadas
            updatedCompletedTasks.push(index);
        }

        const updatedTask = updatedTasks[index];
        updatedTask.completed = !updatedTask.completed;

        // Actualiza el estado local
        setTasks(updatedTasks);
        setCompletedTasks(updatedCompletedTasks);

        // Realiza la solicitud HTTP para actualizar el servidor
        fetch(`http://localhost:3000/tasks/${updatedTask.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTask),
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error("Error al cambiar el estado de la tarea:", error);
            });
    };

    if (isLoading) {
        return <div>Cargando tareas...</div>;
    }

    return (
        <main>
            <section className="addTaskSection">
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        className="inputTask"
                        type="text"
                        value={taskText}
                        onChange={(e) => setTaskText(e.target.value)}
                        placeholder="Type your task"
                    />
                    <button className="buttonAddTask" onClick={addTask}>
                        Add
                    </button>
                </form>
            </section>

            <section className="tasksSection">
                {tasks.map(
                    (
                        task,
                        index // Agrega el atributo key con el índice
                    ) => (
                        <TodoItem
                            key={task.id}
                            task={task}
                            onDelete={() => deleteTask(task.id)}
                            onToggleEdit={() => toggleEditMode(index)}
                            onEdit={() => editTask(index)}
                            isEditing={editMode[index]}
                            editedTaskText={editedTaskText}
                            onEditedTaskTextChange={(e) =>
                                setEditedTaskText(e.target.value)
                            }
                            completed={completedTasks.includes(index)}
                            onToggleComplete={() => toggleComplete(index)}
                        />
                    )
                )}
            </section>
        </main>
    );
}

export default TodoList;
