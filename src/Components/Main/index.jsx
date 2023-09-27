// Tasks.jsx
import React from "react";
import { Task } from "../Task";

export function Main({ tasks, onComplete, onDelete, onEdit }) {
    const taskQuantity = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
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
                {tasks.map((task, index) => (
                    <React.Fragment key={task.id}>
                        <Task task={task} onComplete={onComplete} onDelete={onDelete} onEdit={onEdit} />
                        {index !== tasks.length - 1 && <hr />}
                    </React.Fragment>
                ))}
            </section>
        </main>
    );
}