import React, { useEffect } from "react";

import { Task } from "../Task";
import { EditTask } from "../EditTask";
import { useTasksContext } from "../../Context";

/**
 * Renders the main section of the todo list app, including the task header and task section.
 * @returns {JSX.Element} The JSX code for the main section of the app.
 */

export function Main() {
    const { state, dispatch } = useTasksContext();

    const taskQuantity = state.length;
    const completedTasks = state.filter(task => task.completed).length;

    return (
        <main>
            <section className="tasksHeader">
                <div>
                    <p>Created Tasks</p>
                    <span className="created-tasks">{taskQuantity}</span>
                </div>
                <div>
                    <p>Completed Tasks</p>
                    <span className="completed-tasks">{completedTasks} of {taskQuantity}</span>
                </div>
            </section>
            <section className="tasksSection">
                {state.map((task, index) => (
                    <React.Fragment key={task.id}>
                        <Task
                            task={task} />
                        <EditTask task={task} onEdit={() => dispatch({ type: 'TOGGLE_EDIT', payload: task.id })} />
                        {index !== state.length - 1 && <hr />}
                    </React.Fragment>
                ))}
            </section>
        </main>
    );
}