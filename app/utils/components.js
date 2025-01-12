/*
Este ficheiro: Carregamento Dinâmico de Componentes e Conteúdo de Páginas

Descrição:
Este ficheiro JavaScript gere o carregamento dinâmico de componentes HTML e conteúdos de páginas. 
Inclui funções para inserir placeholders de componentes, carregar páginas dinamicamente com base no nome da página, 
e invocar funções específicas para carregar conteúdos adicionais em páginas como a loja, contacto, ou checkout. 
Os estados das páginas são também sincronizados com o armazenamento local.
*/

// Importa funções para gestão da barra de navegação e carregamento de conteúdos específicos de páginas
import { setupVideoOverlay } from "../pages/home/script.js";
import {
  closeNavabrCollapse,
  setActiveLink,
} from "../components/header/script.js";
import { loadCheckoutContent } from "../pages/checkout/script.js";
import { loadContactContent } from "../pages/contact/script.js";
import { loadShopContent } from "../pages/shop/script.js";
import { storageHandler } from "../utils/storage.js"; // Importa o gestor de armazenamento local
import { loadCalendarContent } from "../pages/appointments/script.js";

// Função para carregar um ficheiro HTML externo e inseri-lo como um placeholder
export async function loadComponent(selector, url) {
  return fetch("/TI1-1S-24-25" + url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(selector).innerHTML = data;
    })
    .catch((error) => console.error("Error loading component:", error));
}

// Função para carregar os componentes de cada página dinamicamente
export const loadPage = async (pageName) => {
  closeNavabrCollapse();

  setActiveLink(pageName);

  storageHandler.setItem("currentPage", pageName);

  const pageUrl = `/app/pages/${pageName}/index.html`;
  await loadComponent("body", pageUrl);

  await loadPageContent[pageName]?.(pageName);

  window.scrollTo({
    top: 0, // Define a posição vertical como o topo
    behavior: "smooth", // Adiciona uma transição suave
  });
};

// Objeto com funções para carregar conteúdos adicionais de páginas
const loadPageContent = {
  shop: () => loadShopContent(),
  contact: () => loadContactContent(),
  checkout: () => loadCheckoutContent(),
  appointments: () => loadCalendarContent(),
  home: () => setupVideoOverlay("barberVideo", "videoOverlay"),
};
