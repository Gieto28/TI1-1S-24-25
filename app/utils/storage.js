//initial logic for storage handle
export const storageHandler = {
    setItem(key, value) {
        //encrypt
        localStorage
            .setItem(key, JSON.stringify(value));
    },
    getItem(key) {
        //decrypt
        return JSON.parse(localStorage
            .getItem(key));
    },
    removeItem(key) {
        localStorage
            .removeItem(key);
    },
    clear() {
        localStorage.clear();
    }
}

//ex: storageHandler.setItem(key, value)