/* 
Este ficheiro: Carregador de Páginas Dinâmico com Header, Footer e Inicialização de Sinalizadores de Funcionalidades

Descrição:
Este ficheiro JavaScript é responsável por carregar componentes (como o header e o footer), gerir a página atual e inicializar os sinalizadores de funcionalidades da aplicação. 
Carrega dinamicamente componentes utilizando funções utilitárias e controla qual página carregar com base nos dados armazenados. 
Também configura definições globais e preferências do utilizador, como os sinalizadores de funcionalidades.
*/

// Importação de funções utilitárias para o carregamento de componentes, gestão de páginas, manipulação de armazenamento e conteúdo do header
import { loadComponent, loadPage } from "../app/utils/components.js";
import { intializeFeatureFlags } from "../app/utils/config.js";
import { storageHandler } from "../app/utils/storage.js";
import { loadHeaderContent } from "./components/header/script.js";
import { showCookieModal } from "./components/cookies/script.js";

// Função global para carregar dinamicamente uma página
window.loadPage = (pageName) => {
  loadPage(pageName); // Chama a função para carregar uma página específica com base no nome da página
};

document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 800, // Duração da animação em milissegundos
    easing: "ease-in-out", // Tipo de transição
    once: true, // Executa a animação apenas uma vez
  });
});

// Expressão de Função Invocada Imediatamente (IIFE) para carregar componentes padrão (header e footer) e a página
(async () => {
  // Inicializa o serviço de EmailJS com a chave de API especificada
  emailjs.init("sTT65t2NQGiGE5-IK");

  // Carrega o componente do header a partir do caminho especificado
  await loadComponent("header", "/app/components/header/index.html");

  // Carrega conteúdo específico do header (pode incluir informações dinâmicas como itens de navegação)
  loadHeaderContent();

  // Carrega o componente do footer a partir do caminho especificado
  await loadComponent("footer", "/app/components/footer/index.html");

  // Recupera a página atual armazenada no localStorage
  const currentPage = storageHandler.getItem("currentPage");

  // Carrega a página inicial se nenhuma página estiver armazenada, caso contrário, carrega a página armazenada
  if (!currentPage) {
    loadPage("home"); // A página padrão é "home"
  } else {
    loadPage(currentPage); // Carrega a página armazenada em "currentPage"
  }

  // Inicializa os sinalizadores de funcionalidades com base nas definições armazenadas ou padrões
  intializeFeatureFlags();

  showCookieModal();
})();
