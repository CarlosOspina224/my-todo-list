// src\Components\Header\index.jsx
import { useState } from 'react'
import logo from '../../assets/react.svg'

export function Header({ handleAddTask }) {
    const [title, setTitle] = useState('');

    // Enviamos el nombre de la tarea y limpiamos el campo
    function handleSubmit(event) {
        event.preventDefault();

        if(title.trim() === '') {
            alert('Please, type a task before adding it');
            return;
        }
        handleAddTask(title)
        setTitle('');
    }

    // Establecemos el valor de title
    function onChangeTitle(event) {
        setTitle(event.target.value);
    }

    return (
        <header>
            <h1><img className='logo' src={logo} /> To-Do List</h1>

            <section className="addTaskSection">
                <form onSubmit={handleSubmit}>
                    <input className="inputTask" placeholder="Type your task" type="text" onChange={onChangeTitle} value={title} />
                    <button className="buttonAddTask">Add</button>
                </form>
            </section>
        </header>
    )
}