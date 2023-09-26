// TodoItem.jsx
function TodoItem({
    task,
    onDelete,
    onToggleEdit,
    onEdit,
    isEditing,
    editedTaskText,
    onEditedTaskTextChange,
    completed,
    onToggleComplete,
}) {
    return (
        <article className={completed ? "completed" : ""}>
            <div className="taskCompleted">
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={onToggleComplete}
                />
            </div>
            <div className="taskName">
                {isEditing ? (
                    <input
                        type="text"
                        className="inputTask"
                        value={editedTaskText}
                        onChange={onEditedTaskTextChange}
                    />
                ) : (
                    <p>{task.text}</p>
                )}
            </div>
            <div className="taskDone">
                {/* Agrega el botón para marcar como completada */}
                <span
                    className="material-symbols-outlined"
                    onClick={onToggleComplete}
                >
                    done
                </span>
            </div>
            <div className="taskEdit">
                {/* Agrega el botón para editar */}
                {isEditing ? (
                    <span
                        className="material-symbols-outlined"
                        onClick={onEdit}
                    >
                        save
                    </span>
                ) : (
                    <span
                        className="material-symbols-outlined"
                        onClick={onToggleEdit}
                    >
                        edit
                    </span>
                )}
            </div>
            <div className="taskDelete">
                {/* Agrega el botón para eliminar */}
                <span className="material-symbols-outlined" onClick={onDelete}>
                    delete
                </span>
            </div>
        </article>
    );
}

export default TodoItem;
