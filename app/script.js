/* 
This File: Dynamic Page Loader with Header, Footer, and Feature Flags Initialization

Description:
This JavaScript file is responsible for loading components (such as the header and footer), managing the current page, and initializing feature flags for the application. 
It dynamically loads components using utility functions and controls which page to load based on stored data. 
It also sets up global configurations and user preferences such as feature flags.

Purpose:
The purpose of this code is to handle the loading of common components (header, footer), dynamically manage page navigation based on stored data, and initialize the application’s feature flags for customizing behavior and appearance.
It ensures the correct page is loaded when the application starts and enables default UI components.
*/

// Importing utility functions for component loading, page management, storage handling, and header content
import { loadComponent, loadPage } from "../app/utils/components.js";
import { intializeFeatureFlags } from "../app/utils/config.js";
import { storageHandler } from "../app/utils/storage.js";
import { loadHeaderContent } from "./components/header/script.js";

// Global function to load a page dynamically
window.loadPage = (pageName) => {
  loadPage(pageName); // Calls the function to load a specific page based on the page name
};

// Immediately Invoked Function Expression (IIFE) to load default components (header and footer) and page
(async () => {
  // Loads the header component from the specified path
  await loadComponent("header", "/app/components/header/index.html");

  // Loads header-specific content (can include dynamic information like navigation items)
  loadHeaderContent();

  // Loads the footer component from the specified path
  await loadComponent("footer", "/app/components/footer/index.html");

  // Retrieves the current page stored in localStorage or sessionStorage
  const currentPage = storageHandler.getItem("currentPage");

  // Loads the home page if no page is stored, otherwise loads the stored page
  if (!currentPage) {
    loadPage("home"); // Default page is "home"
  } else {
    loadPage(currentPage); // Loads the page stored in "currentPage"
  }

  // Initializes the feature flags based on stored or default settings
  intializeFeatureFlags();
})();
