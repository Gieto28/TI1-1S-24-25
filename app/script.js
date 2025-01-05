import { loadComponent, loadPage } from "../app/utils/components.js";
import { intializeFeatureFlags } from "../app/utils/config.js";
import { storageHandler } from "../app/utils/storage.js";
import { loadHeaderContent } from "./components/header/script.js";

window.loadPage = (pageName) => {
  loadPage(pageName);
};

// IIFE para carregar o header e o footer por defeito
(async () => {
  // Carrega o header e o footer por defeito
  await loadComponent("header", "/app/components/header/index.html");

  loadHeaderContent();

  await loadComponent("footer", "/app/components/footer/index.html");

  const currentPage = storageHandler.getItem("currentPage");

  // Carrega a página atual ou a página inicial
  if (!currentPage) {
    loadPage("home");
  } else {
    loadPage(currentPage);
  }

  // Inicializa as Feature Flags
  intializeFeatureFlags();
})();
