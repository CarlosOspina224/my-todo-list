import { useTasksContext } from '../../Context';

import logo from '../../assets/react.svg'

/**
 * Renders the header component with a logo, a form to add tasks and a button to submit the form.
 * @returns {JSX.Element} The header component.
 */

export function Header() {
    const { dispatch } = useTasksContext();

    // Enviamos el nombre de la tarea y limpiamos el campo
    function handleSubmit(e) {
        e.preventDefault();

        if (e.target[0].value === "") return;

        dispatch({ type: "ADD_TASK", payload: e.target[0].value });

        e.target[0].value = "";
    }

    return (
        <header>
            <h1><img className='logo' src={logo} /> To-Do List</h1>

            <section className="addTaskSection">
                <form onSubmit={handleSubmit}>
                    <input className="inputTask" placeholder="Type your task" type="text" />
                    <button type='submit' className="buttonAddTask">Add</button>
                </form>
            </section>
        </header>
    )
}