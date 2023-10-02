import { useTasksContext } from "../../Context";

/**
 * Renders a footer component with two buttons to delete all tasks or delete all completed tasks.
 * @returns {JSX.Element} The footer component.
 */

export function Footer() {
    const { dispatch } = useTasksContext();

    return (
        <footer>
            <button onClick={() => dispatch({ type: "DELETE_ALL" })}>Delete All</button>
            <button onClick={() => dispatch({ type: "DELETE_COMPLETED" })}>Delete All Completed</button>
        </footer>
    );
}