// Objeto responsável por gerir o armazenamento local
export const storageHandler = {

    // Adiciona ou atualiza um item no localStorage
    setItem(key, value) {
        // Criptografa o valor e armazena como uma string JSON
        localStorage
            .setItem(key, JSON.stringify(value));
    },

    // Obtém um item do localStorage
    getItem(key) {
        // Descriptografa o valor recuperado e retorna como objeto ou valor original
        return JSON.parse(localStorage
            .getItem(key));
    },

    // Remove um item específico do localStorage
    removeItem(key) {
        localStorage
            .removeItem(key);
    },

    // Limpa todos os dados armazenados no localStorage
    clear() {
        localStorage.clear();
    }
}