/*
Este ficheiro: Carregamento de Conteúdo da Loja e Renderização Dinâmica

Descrição:
Este ficheiro JavaScript é responsável por gerir o carregamento de conteúdo dinâmico para a página da loja. 
Inclui funções para renderizar o carrossel de imagens da loja, criar e renderizar cartões de produtos, 
e adicionar interatividade para adicionar produtos ao carrinho. Os dados dos produtos são configurados com base nas definições globais.
*/

// Importa a configuração global da aplicação
import { config } from "../../../config.js";

// Importa a função para criar carrosséis de imagens
import { createCarousel } from "../../components/carousel/script.js";

// Importa a função para adicionar produtos ao carrinho
import { addItemToCart } from "../../utils/shop.js";

export const loadShopContent = () => {
  renderCarousel(); // Renderiza o carrossel da loja
  renderProducts(config.productList); // Renderiza os produtos disponíveis na loja
  renderPaginationButtons(config.productList); // Renderiza os botões de paginação
};

const createCard = (product, addItemToCartCallback) => {
  // Cria um elemento div para representar o card do produto
  const card = document.createElement("div");
  card.classList.add(
    "col-12",
    "col-sm-6",
    "col-md-4",
    "col-xl-3",
    "col-xxl-2",
    "mb-4",
    "animate__animated", // Classe para animações
    "aos-init", // Necessário para a inicialização do AOS
    "aos-animate"
  );

  // Adiciona um atributo AOS ao cartão para que os produtos entrem com animação
  card.setAttribute("data-aos", "fade-up");
  card.setAttribute("data-aos-delay", Math.floor(Math.random() * 200)); // Atraso aleatório para efeito dinâmico

  // Define a apresentação do conteúdo do cartão em HTML
  card.innerHTML = `
    <div class="card h-100 d-flex flex-column">
      <img src="${product.image}" alt="${product.name}" class="card-img-top">
      <div class="card-body flex-grow-1">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">${product.description}</p>
      </div>
      <div class="card-footer p-0 mt-auto">
        <button class="btn btn-secondary w-100 rounded-top-0">
          Adicionar ao carrinho <strong>${product.price} ${product.currency}</strong>
        </button>
      </div>
    </div>
  `;

  const button = card.querySelector("button");

  // Adiciona um Event Listener ao botão que chama a função de adicionar item ao carrinho
  button.addEventListener("click", () => {
    // Adiciona um efeito de "bounce" rápido ao card quando o botão é clicado
    card.classList.add("animate__bounce");

    // Remove a classe de "bounce" depois que a animação termina para permitir re-ativação
    card.addEventListener("animationend", () => {
      card.classList.remove("animate__bounce");
    });

    // Chama a função de callback
    addItemToCartCallback(product);
  });

  return card; // Retorna o card do produto
};

const renderProducts = (products) => {
  const productsContainer = document.getElementById("shopProducts");
  const totalItemsCount = document.getElementById("totalItemsCount");

  // Limpa o conteúdo antes de adicionar os novos produtos
  productsContainer.innerHTML = "";

  // Cria e adiciona o card de cada produto com animação
  products.forEach((product) => {
    const card = createCard(product, addItemToCart);
    card.style.opacity = "0";
    card.style.transition = "opacity 0.5s ease-in-out";
    productsContainer.appendChild(card);
    setTimeout(() => (card.style.opacity = "1"), 50); // Animação de fade-in
  });

  // Atualiza a contagem total de itens
  totalItemsCount.textContent = `${products.length} de ${config.productList.length} produtos`;
};

const renderPaginationButtons = (productList) => {
  const dropdownContainer = document.getElementById("shopProductsDropdown");
  const paginationContainer = document.getElementById("shopPagination");

  // Limpa os containers antes de adicionar novos elementos
  dropdownContainer.innerHTML = "";
  paginationContainer.innerHTML = "";

  // Dropdown de Itens por Página
  const itemsPerPageDropdown = document.createElement("select");
  itemsPerPageDropdown.classList.add(
    "form-select",
    "form-select-sm",
    "w-auto",
    "mb-3"
  );

  let currentPage = 0;
  let itemsPerPage = 5;

  // Criação das opções de itens por página
  [5, 10, 15, 20].forEach((optionValue) => {
    const option = document.createElement("option");
    option.value = optionValue;
    option.textContent = `${optionValue} itens por página`;
    if (optionValue === itemsPerPage) option.selected = true;
    itemsPerPageDropdown.appendChild(option);
  });

  // Alteração de itens por página
  itemsPerPageDropdown.addEventListener("change", () => {
    itemsPerPage = parseInt(itemsPerPageDropdown.value, 10);
    currentPage = 0; // Reseta para a primeira página
    renderCurrentPage();
    updatePagination();
  });

  dropdownContainer.appendChild(itemsPerPageDropdown);

  // Calcula o total de páginas
  const calculateTotalPages = () =>
    Math.ceil(productList.length / itemsPerPage);

  // Renderiza a página atual
  const renderCurrentPage = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToRender = productList.slice(startIndex, endIndex);
    renderProducts(itemsToRender);
  };

  // Atualiza a navegação de paginação
  const updatePagination = () => {
    paginationContainer.innerHTML = "";

    const totalPages = calculateTotalPages();

    // Botão de Anterior
    const leftButton = document.createElement("button");
    leftButton.classList.add("btn", "btn-secondary", "btn-sm");
    leftButton.textContent = "← Anterior";
    leftButton.disabled = currentPage === 0;
    leftButton.addEventListener("click", () => {
      if (currentPage > 0) {
        currentPage--;
        renderCurrentPage();
        updatePagination();
      }
    });

    // Indicador da Página
    const pageIndicator = document.createElement("span");
    pageIndicator.classList.add(
      "page-indicator",
      "text-muted",
      "mx-3",
      "fw-bold"
    );
    pageIndicator.textContent = `Página ${currentPage + 1} de ${totalPages}`;

    // Botão de Próximo
    const rightButton = document.createElement("button");
    rightButton.classList.add("btn", "btn-secondary", "btn-sm");
    rightButton.textContent = "Próximo →";
    rightButton.disabled = currentPage === totalPages - 1;
    rightButton.addEventListener("click", () => {
      if (currentPage < totalPages - 1) {
        currentPage++;
        renderCurrentPage();
        updatePagination();
      }
    });

    // Adiciona os elementos ao container de paginação
    paginationContainer.appendChild(leftButton);
    paginationContainer.appendChild(pageIndicator);
    paginationContainer.appendChild(rightButton);
  };

  // Renderização inicial
  renderCurrentPage();
  updatePagination();
};

const renderCarousel = () => {
  // Obtém o elemento do banner da loja através do id
  const shopBanner = document.getElementById("shopBanner");

  // Define as imagens do carrossel que vão ser exibidas na loja
  const carouselImages = [
    "../../TI1-1S-24-25/app/assets/carousel/shop/products_1.jpg",
    "../../TI1-1S-24-25/app/assets/carousel/shop/products_2.jpg",
    "../../TI1-1S-24-25/app/assets/carousel/shop/products_3.jpg",
  ];

  // Define o id para o carrossel
  const carouselId = "shopCarousel";

  // Cria o carrossel usando as imagens e respetivo id
  const shopCarousel = createCarousel(carouselImages, carouselId);

  // Adiciona o carrossel criado ao conteúdo do banner da loja
  shopBanner.innerHTML = shopCarousel;

  const carouselElement = document.getElementById(carouselId);

  if (carouselElement) {
    const bootstrapCarousel = new bootstrap.Carousel(carouselElement, {
      interval: 2000, // Intervalo de 2 segundos
      wrap: true, // Faz o loop
    });

    bootstrapCarousel.cycle(); // Inicia o carrossel
  }
};
