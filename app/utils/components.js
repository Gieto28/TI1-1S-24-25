import { loadShopContent } from "../pages/shop/script.js";
import { storageHandler } from "../utils/storage.js";

// Função para carregar um ficheiro HTML externo e inseri-lo como um placeholder
export async function loadComponent(selector, url) {
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

  storageHandler.setItem("currentPage", pageName);
  
  const pageUrl = `/app/pages/${pageName}/index.html`;
  await loadComponent("body", pageUrl);

  await loadPageContent[pageName]?.(pageName);
};

const loadPageContent = {
  shop: () => loadShopContent()
};
