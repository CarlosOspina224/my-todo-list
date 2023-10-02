import { createContext, useContext, useEffect, useReducer } from "react";

import { loadFromLocalStorage, saveOnLocalStorage } from "../Tools/Local_Storage_Tools";

// Key del Local Storage
const LS_KEY = "SavedTasks";

/**
 * Reducer function for managing tasks state.
 * @param {Array} state - The current state of tasks.
 * @param {Object} action - The action object containing type and payload properties.
 * @param {string} action.type - The type of action to be performed.
 * @param {Object} action.payload - The data to be used for the action.
 * @param {string} action.payload.id - The id of the task.
 * @param {string} action.payload.title - The title of the task.
 * @param {boolean} action.payload.completed - The completion status of the task.
 * @param {boolean} action.payload.isEditing - The editing status of the task.
 * @returns {Array} The updated state of tasks.
 */

const tasksReducer = (state, action) => {
    // Action es un objeto con dos propiedades: type y payload
    const { type, payload } = action;

    switch (type) {
        case "LOAD_TASKS":
            return [...state, ...payload];

        case "ADD_TASK":
            const newTasks = {
                id: crypto.randomUUID(),
                title: payload,
                completed: false,
                isEditing: false,
            };
            const updatedTasks = [...state, newTasks];
            return updatedTasks;

        case "TOGGLE_COMPLETED":
            const taskIndex = state.findIndex((task) => task.id === payload.id)

            if (!(taskIndex == -1)) {
                const updatedTasks = [...state];
                updatedTasks[taskIndex].completed = payload.completed;
                return updatedTasks
            }
            return state

        case "TOGGLE_EDIT":
            const editIndex = state.findIndex((task) => task.id === payload.id);
            if (editIndex !== -1) {
                const updatedTasks = [...state];
                updatedTasks[editIndex].isEditing = payload.isEditing;
                return updatedTasks;
            }
            return state;

        case "EDIT_TASK":
            const editTaskIndex = state.findIndex((task) => task.id === payload.id);
            if (editTaskIndex !== -1) {
                const updatedTasks = [...state];
                updatedTasks[editTaskIndex].title = payload.title;
                updatedTasks[editTaskIndex].isEditing = payload.isEditing;
                return updatedTasks;
            }
            return state;

        case "DELETE_TASK":
            const filteredTasks = state.filter((task) => task.id !== payload);
            return filteredTasks;

        case "DELETE_ALL":
            return [];

        case "DELETE_COMPLETED":
            const filteredCompletedTasks = state.filter((task) => !task.completed);
            return filteredCompletedTasks;

        default:
            return state;
    }
}

// Creamos el Contexto
const tasksContext = createContext();

// Creamos el Provider
export const TaskProvider = ({ children }) => {
    const [state, dispatch] = useReducer(tasksReducer, [])

    // Cargamos los datos del Local Storage
    useEffect(() => {
        const savedTasks = loadFromLocalStorage(LS_KEY);
        if (savedTasks) {
            dispatch({ type: "LOAD_TASKS", payload: savedTasks })
        }
    }, [])

    // Cargamos los datos al Local Storage
    useEffect(() => {
        saveOnLocalStorage(LS_KEY, state);
    }, [state]) // Cada vez que cambie el estado, se ejecuta el useEffect

    return (
        // El value del Provider es el estado y el dispatch
        <tasksContext.Provider value={{ state, dispatch }}>
            {children}
        </tasksContext.Provider>
    );
}

export const useTasksContext = () => {
    return useContext(tasksContext);
}