/**
 * Loads data from local storage based on the provided key.
 * @param {string} Local_Storage_Key - The key used to retrieve data from local storage.
 * @returns {Array|null} - The data retrieved from local storage, or null if an error occurred.
 */

export function loadFromLocalStorage(Local_Storage_Key) {
    try {
        const data = JSON.parse(localStorage.getItem(Local_Storage_Key));

        if (Array.isArray(data)) {
            return data;
        }
    } catch (error) {
        console.error("Error al cargar el almacenamiento local:", error);
    }

    return null;
}

export function saveOnLocalStorage(Local_Storage_Key, data) {
    localStorage.setItem(Local_Storage_Key, JSON.stringify(data));
}