export function EditTask({ isEditing}) {
    return (
        <div className={isEditing ? "edit-modal" : "edit-modal hidden"}>
            <div className="container">
                <h2>Edit task name</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input className="inputTask" placeholder="Type your new task title" type="text" />
                    <button className="buttonAddTask">Cancel</button>
                    <button className="buttonAddTask">Add</button>
                </form>
            </div>
        </div>
    );
}