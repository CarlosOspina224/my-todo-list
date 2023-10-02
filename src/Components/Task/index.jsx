import { useTasksContext } from "../../Context";

/**
 * Renders a single task item.
 * @param {Object} props - The props object.
 * @param {Object} props.task - The task object to render.
 * @returns {JSX.Element} - The task component.
 */

export function Task({ task }) {
  const { dispatch } = useTasksContext();

  return (
    <article>
      <div className="taskCompleted">
        {/* Agrega el botón para marcar como completada */}
        <button
          className={
            task.completed
              ? "completed-task-btn completed"
              : "completed-task-btn"
          }
          onClick={() =>
            dispatch({
              type: "TOGGLE_COMPLETED",
              payload: { completed: !task.completed, id: task.id },
            })
          }
        >
          {task.completed ? (
            <span className="material-symbols-outlined">check_circle</span>
          ) : (
            <span className="material-symbols-outlined">
              radio_button_unchecked
            </span>
          )}
        </button>
      </div>
      <div className="taskName">
        <p className={task.completed ? "task-completed" : ""}>{task.title}</p>
      </div>
      <div className="taskEdit">
        <span
          className="material-symbols-outlined"
          onClick={() => dispatch({ type: "TOGGLE_EDIT", payload: { isEditing: !task.isEditing, id: task.id } })}
        >
          edit
        </span>
      </div>
      <div className="taskDelete">
        <span
          className="material-symbols-outlined"
          onClick={() => dispatch({ type: "DELETE_TASK", payload: task.id })}
        >
          delete
        </span>
      </div>
    </article>
  );
}
