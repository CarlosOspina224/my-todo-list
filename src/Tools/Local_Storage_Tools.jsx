// Local_Storage_Tools.jsx

export function loadFromLocalStorage(Local_Storage_Key) {
    try {
        const data = localStorage.getItem(Local_Storage_Key);
        if (data) {
            return JSON.parse(data);
        }
    } catch (error) {
        console.error("Error al parsear datos desde el almacenamiento local:", error);
    }

    return null;
}

export function saveOnLocalStorage(Local_Storage_Key, data) {
    localStorage.setItem(Local_Storage_Key, JSON.stringify(data));
}

export function clearLocalStorage(Local_Storage_Key) {
    try {
        for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            if (key && key.startsWith(Local_Storage_Key)) {
                localStorage.removeItem(key);
            }
        }

        return [];
    } catch (error) {
        console.error("Error al limpiar el almacenamiento local:", error);
    }
}

export function clearLocalStorageByAttribute(Local_Storage_Key, attribute, valueToMatch) {
    try {
        const data = JSON.parse(localStorage.getItem(Local_Storage_Key));

        if (Array.isArray(data)) {
            for (let i = data.length - 1; i >= 0; i--) {
                const item = data[i];
                if (item[attribute] === valueToMatch) {
                    // Encuentra un elemento que coincide con el atributo y valor 
                    data.splice(i, 1);
                }
            }

            // Guarda el arreglo actualizado en el localStorage
            saveOnLocalStorage(Local_Storage_Key, data);
        }
    } catch (error) {
        console.error("Error al eliminar elementos por atributo del almacenamiento local:", error);
    }
}


export function editLocalStorageById(Local_Storage_Key, Local_Storage_Id, updatedData) {
    try {
        // Obtén el valor actual del localStorage
        const data = loadFromLocalStorage(Local_Storage_Key);
        const dataId = data.findIndex((item) => item.id === Local_Storage_Id)

        if (data && !(dataId == -1)) {
            data[dataId] = updatedData;
            saveOnLocalStorage(Local_Storage_Key, data)
        }

    } catch (error) {
        console.error("Error al actualizar elemento en el almacenamiento local:", error);
    }

    return null;
}