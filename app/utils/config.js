
import { config } from "../../config.js";
import { storageHandler } from "./storage.js";

// Inicializa as feature flags ao iterar pelo objeto config.featureFlags e armazena cada key e value no storage handler
export const intializeFeatureFlags = async () => {
    Object.entries(config.featureFlags).forEach(([key, value]) => storageHandler.setItem(key, value));
}

// Alterna entre o modo claro/escuro, lendo o estado atual do armazenamento, invertendo o valor e atualizando tanto a configuração como o armazenamento
export const toggleLDMode = async () => {
    const ldMode = storageHandler.getItem("ldMode"); // Obtém o modo atual do armazenamento

    config.isLightMode = !ldMode; // Alterna o estado do modo claro

    storageHandler.setItem("ldMode", !ldMode); // Salva o modo atualizado em armazenamento
}

// Altera o idioma da aplicação e regista uma mensagem de erro e sai se o idioma não estiver na lista suportada
export const toggleLanguage = async (lang) => {
    if (!config.languages.includes(lang)) {
        console.log("Language not supported"); // Regista erro caso o idioma não seja suportado

        return; // Sai para evitar processamento adicional
    }

    config.language = lang; // Atualiza o idioma atual na configuração

    storageHandler.setItem("lang", lang); // Mantém a alteração do idioma em armazenamento
}