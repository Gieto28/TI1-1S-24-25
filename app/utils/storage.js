/* 
Este ficheiro: Manipulador de Armazenamento Local

Descrição:
Este ficheiro contém um objeto utilitário para gerir interações com o localStorage. 
Fornece métodos para definir, obter, remover e limpar dados no localStorage. 
Os dados são armazenados como strings JSON.
*/

// Objeto responsável por gerir operações no localStorage
export const storageHandler = {

    // Adiciona ou atualiza um item no localStorage
    setItem(key, value) {
        // Encripta o valor e armazena-o como uma string JSON
        localStorage.setItem(key, JSON.stringify(value));
    },

    // Recupera um item do localStorage
    getItem(key) {
        // Desencripta o valor recuperado e devolve-o como um objeto ou valor original
        return JSON.parse(localStorage.getItem(key));
    },

    // Remove um item específico do localStorage
    removeItem(key) {
        localStorage.removeItem(key);
    },

    // Limpa todos os dados armazenados no localStorage
    clear() {
        localStorage.clear();
    }
}
