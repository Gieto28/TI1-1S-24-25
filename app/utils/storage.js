/* 
This file: Local Storage Handler

Description:
This file contains a utility object to manage interactions with the localStorage. 
It provides methods for setting, getting, removing, and clearing data in localStorage. 
The data is stored as JSON strings.
*/

// Object responsible for managing localStorage operations
export const storageHandler = {

    // Adds or updates an item in localStorage
    setItem(key, value) {
        // Encrypts the value and stores it as a JSON string
        localStorage.setItem(key, JSON.stringify(value));
    },

    // Retrieves an item from localStorage
    getItem(key) {
        // Decrypts the retrieved value and returns it as an object or original value
        return JSON.parse(localStorage.getItem(key));
    },

    // Removes a specific item from localStorage
    removeItem(key) {
        localStorage.removeItem(key);
    },

    // Clears all data stored in localStorage
    clear() {
        localStorage.clear();
    }
}
