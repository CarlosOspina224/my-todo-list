// Local_Storage_Tools.jsx

export function loadFromLocalStorage(Local_Stogare_Key) {
    try {
        const data = localStorage.getItem(Local_Stogare_Key);
        if (data) {
            return JSON.parse(data);
        }
    } catch (error) {
        console.error("Error al parsear datos desde el almacenamiento local:", error);
    }

    return null;
}

export function saveOnLocalStorage(Local_Stogare_Key, data) {
    localStorage.setItem(Local_Stogare_Key, JSON.stringify(data));
}

export function clearLocalStorage(Local_Stogare_Key) {
    try {
        for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            if (key && key.startsWith(Local_Stogare_Key)) {
                localStorage.removeItem(key);
            }
        }
    } catch (error) {
        console.error("Error al limpiar el almacenamiento local:", error);
    }
}

export function clearLocalStorageByAtribute(Local_Stogare_Key) {
    try {
        for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            if (key && key.startsWith(Local_Stogare_Key)) {
                const data = localStorage.getItem(key);
                if (data) {
                    const item = JSON.parse(data);
                    if (item.completed === true) {
                        localStorage.removeItem(key);
                    }
                }
            }
        }
    } catch (error) {
        console.error("Error al eliminar tareas completadas del almacenamiento local:", error);
    }
}