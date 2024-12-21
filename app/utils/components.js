import { storageHandler } from "../utils/storage.js";

// Função para carregar um ficheiro HTML externo e inseri-lo como um placeholder
export function loadComponent(selector, url) {
    fetch(url)
      .then(response => response.text())
      .then(data => {
        document.getElementById(selector).innerHTML = data;
      })
      .catch(error => console.error('Error loading component:', error));
}

// Função para carregar os componentes de cada página dinamicamente
export function loadPage(pageName) {
  // Escreve em local storage
  storageHandler.setItem("currentPage", pageName)
  const pageUrl = `/app/pages/${pageName}/index.html`;
  loadComponent('body', pageUrl);
}
  