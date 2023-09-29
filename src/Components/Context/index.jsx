// src\Components\Context\index.jsx
import { createContext, useContext } from "react";

const TaskContext = createContext();

export function useTaskContect() {
    return useContext(TaskContext);
}