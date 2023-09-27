// Task.jsx
export function Task({ task, onComplete, onDelete, onEdit }) {
    return (
        <article>
            <div className="taskCompleted">
                {/* Agrega el botón para marcar como completada */}
                <button className={task.completed ? "completed-task-btn completed" : "completed-task-btn"} onClick={() => onComplete(task.id)}>
                    {task.completed ?
                        <span className="material-symbols-outlined">check_circle</span>
                        :
                        <span className="material-symbols-outlined">radio_button_unchecked</span>
                    }
                </button>
            </div>
            <div className="taskName">
                {/* Agrega ek binvre de la tarea */}
                <p className={task.completed ? "task-completed" : ""}>{task.title}</p>
            </div>
            <div className="taskEdit">
                {/* Agrega el botón para editar*/}
                {/* {task.isEditing ?
                    <span className="material-symbols-outlined">save</span>
                    :
                    <span className="material-symbols-outlined" onClick={() => console.log(task.isEditing)}>edit</span>
                } */}
            </div>
            <div className="taskDelete">
                {/* Agrega el botón para eliminar */}
                <span className="material-symbols-outlined" onClick={() => onDelete(task.id)}>delete</span>
            </div>
        </article>
    );
}