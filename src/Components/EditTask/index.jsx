import { useTasksContext } from "../../Context";

/**
 * Renders a form to edit a task's title.
 * @param {Object} props - Component props.
 * @param {Object} props.task - The task to be edited.
 * @returns {JSX.Element} - The EditTask component.
 */

export function EditTask({ task }) {
    const { dispatch } = useTasksContext();

    // Función para manejar el submit del formulario
    function handleSubmit(e) {
        e.preventDefault();

        // Crear un objeto con el nuevo título y el resto de las propiedades
        const newTasks = {
            id: task.id,
            title: e.target[0].value,
            completed: task.completed,
            isEditing: false,
        };

        // Enviar el objeto al reducer
        dispatch({ type: "EDIT_TASK", payload: newTasks });
    }

    return (
        <div className={task.isEditing ? "edit-modal" : "edit-modal hidden"}>
            <div className="container">
                <h2>Edit task name</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        className="inputTask"
                        placeholder="Type your new task title"
                        type="text"
                        defaultValue={task.title}
                    />
                    <button
                        type="button"
                        className="buttonAddTask"
                        onClick={() =>
                            dispatch({
                                type: "TOGGLE_EDIT",
                                payload: {
                                    isEditing: !task.isEditing,
                                    id: task.id,
                                },
                            })
                        }
                    >
                        Cancel
                    </button>
                    <button type="submit" className="buttonAddTask">
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}