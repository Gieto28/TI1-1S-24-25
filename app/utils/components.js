import { closeNavabrCollapse } from "../components/header/script.js";
import { loadContactContent } from "../pages/contact/script.js";
import { loadShopContent } from "../pages/shop/script.js";
import { storageHandler } from "../utils/storage.js";

// Função para carregar um ficheiro HTML externo e inseri-lo como um placeholder
export async function loadComponent(selector, url) {
  console.log("location", window.location.origin);
  console.log("location", window.location);

  return fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(selector).innerHTML = data;
    })
    .catch((error) => console.error("Error loading component:", error));
}

// Função para carregar os componentes de cada página dinamicamente
export const loadPage = async (pageName) => {
  console.log("Loading page:", pageName);

  closeNavabrCollapse();

  storageHandler.setItem("currentPage", pageName);

  const pageUrl = `/app/pages/${pageName}/index.html`;
  await loadComponent("body", pageUrl);

  await loadPageContent[pageName]?.(pageName);
};

// Objeto com funções para carregar conteúdos adicionais de páginas
const loadPageContent = {
  shop: () => loadShopContent(),
  contact: () => loadContactContent(),
};
