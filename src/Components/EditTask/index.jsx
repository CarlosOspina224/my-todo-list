// src\Components\EditTask\index.jsx
import { useState } from "react";
import { editLocalStorageById } from "../../Tools/Local_Storage_Tools";

const LS_KEY = "To-Do-Saved: savedTasks";

export function EditTask({ task, onEdit }) {
    const [editedTitle, setEditedTitle] = useState(task.title);

    function handleSubmit(e) {
        e.preventDefault()

        const newTasks = task;
        newTasks.title = editedTitle
        onEdit(task.id)
        editLocalStorageById(LS_KEY, task.id, newTasks);
    }

    return (
        <div className={task.isEditing ? "edit-modal" : "edit-modal hidden"}>
            <div className="container">
                <h2>Edit task name</h2>
                <form onSubmit={handleSubmit}>
                    <input className="inputTask" placeholder="Type your new task title" type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                    <button type="button" className="buttonAddTask" onClick={() => onEdit(task.id)}>Cancel</button>
                    <button type="submit" className="buttonAddTask">Update</button>
                </form>
            </div>
        </div>
    );
}