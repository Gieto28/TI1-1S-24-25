import i18n from 'vanilla-i18n';

// Import translation files
import en from './locales/en.json';
import pt from './locales/pt.json';
import es from './locales/es.json';

// Initial i18n configuration
i18n.configure({
    locales: {
        en: en,
        pt: pt,
        es: es,
    },
    defaultLocale: 'en', // Default language
});

// Central application configuration
export const config = {
    featureFlags: {
        formPage: true, // Feature flag for a specific feature (example)
    },
    isLightMode: true, // Theme setting (example)
    language: "en", // Active language
    languages: ["en", "es", "pt"], // Supported languages
};

// Function to change the language using `config`
export const setLanguage = (lang) => {
    if (config.languages.includes(lang)) {
        config.language = lang; // Update the language in the config
        i18n.setLocale(lang);   // Set the language in i18n
    } else {
        throw new Error(`Unsupported language: ${lang}`);
    }
};

// Function to retrieve translations
export const translate = (key) => i18n.t(key);
