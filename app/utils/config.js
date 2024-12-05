
import { config } from "../../config.js";
import { storageHandler } from "./storage.js";

export const intializeFeatureFlags = async () => {
    Object.entries(config.featureFlags).forEach(([key, value]) => storageHandler.setItem(key, value));
}

export const toggleLDMode = async () => {
    const ldMode = storageHandler.getItem("ldMode");

    config.isLightMode = !ldMode;

    storageHandler.setItem("ldMode", !ldMode);
}

export const toggleLanguage = async (lang) => {
    if (!config.languages.includes(lang)) {
        console.log("Language not supported");

        return;
    }

    config.language = lang;

    storageHandler.setItem("lang", lang);
}