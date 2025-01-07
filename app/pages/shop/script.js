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
    "mb-4"
  );

  // Define a apresentação do conteúdo do cartão em html, com imagem, nome, descrição, preço e botão de adicionar item ao carrinho
  card.innerHTML = `
      <div class="card h-100 d-flex flex-column">
        <img src="${product.image}" alt="${product.name}" class="card-img-top">
        <div class="card-body flex-grow-1">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          </div>
          <div class="card-footer p-0 mt-auto">
          <button class="btn btn-secondary w-100 rounded-top-0">Add to cart <strong>${product.price} ${product.currency}</strong> </button>
        </div>
      </div>
  `;

  const button = card.querySelector("button");

  // Adiciona um Event Listener ao botão que chama a função de adicionar item ao carrinho
  button.addEventListener("click", () => addItemToCartCallback(product));

  return card; // Retorna o card do produto
};

const renderProducts = (products) => {
  const productsContainer = document.getElementById("shopProducts");

  // Limpa o container antes de adicionar novos produtos
  productsContainer.innerHTML = "";

  // Cria e acrescenta cada card do produto ao container
  products.forEach((product) => {
    const card = createCard(product, addItemToCart); // Cria o card do produto
    productsContainer.appendChild(card); // Adiciona o card ao container
  });
};

const renderPaginationButtons = (productList) => {
  const paginationContainer = document.getElementById("shopPagination");

  // Clear the container before adding new elements
  paginationContainer.innerHTML = "";

  // Create wrapper for pagination elements to center them
  const paginationWrapper = document.createElement("div");
  paginationWrapper.classList.add(
    "d-flex",
    "justify-content-center",
    "align-items-center",
    "mb-3"
  );

  // Initialize state variables
  let currentPage = 0;
  let itemsPerPage = 5; // Default items per page

  // Calculate the total number of pages based on itemsPerPage
  const calculateTotalPages = () =>
    Math.ceil(productList.length / itemsPerPage);

  // Function to render the current page
  const renderCurrentPage = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToRender = productList.slice(startIndex, endIndex);
    renderProducts(itemsToRender); // Update the product display
  };

  // Create an items-per-page dropdown
  const itemsPerPageDropdown = document.createElement("select");
  itemsPerPageDropdown.classList.add("form-select", "w-auto", "ms-3");

  // Populate dropdown with options for limiting items per page
  [5, 10, 15, 20].forEach((optionValue) => {
    const option = document.createElement("option");
    option.value = optionValue;
    option.textContent = `${optionValue} items per page`;
    if (optionValue === itemsPerPage) option.selected = true;
    itemsPerPageDropdown.appendChild(option);
  });

  // Event listener to update items per page on dropdown change
  itemsPerPageDropdown.addEventListener("change", () => {
    itemsPerPage = parseInt(itemsPerPageDropdown.value, 10);
    currentPage = 0; // Reset to the first page
    renderCurrentPage();
    updatePagination();
  });

  // Function to update pagination buttons and info
  const updatePagination = () => {
    // Clear the wrapper
    paginationWrapper.innerHTML = "";

    const totalPages = calculateTotalPages();

    // Left button
    const leftButton = document.createElement("button");
    leftButton.classList.add("btn", "btn-secondary", "me-2");
    leftButton.textContent = "←";
    leftButton.disabled = currentPage === 0; // Disable on the first page
    leftButton.addEventListener("click", () => {
      currentPage--;
      renderCurrentPage();
      updatePagination();
    });

    // Current page indicator
    const currentPageIndicator = document.createElement("span");
    currentPageIndicator.classList.add("mx-3");
    currentPageIndicator.textContent = `Page ${
      currentPage + 1
    } of ${totalPages}`;

    // Right button
    const rightButton = document.createElement("button");
    rightButton.classList.add("btn", "btn-secondary", "ms-2");
    rightButton.textContent = "→";
    rightButton.disabled = currentPage === totalPages - 1; // Disable on the last page
    rightButton.addEventListener("click", () => {
      currentPage++;
      renderCurrentPage();
      updatePagination();
    });

    // Append buttons and indicator to the wrapper
    paginationWrapper.appendChild(leftButton);
    paginationWrapper.appendChild(currentPageIndicator);
    paginationWrapper.appendChild(rightButton);

    // Update item count display
    itemCountDisplay.textContent = `Showing ${Math.min(
      itemsPerPage,
      productList.length - currentPage * itemsPerPage
    )} of ${productList.length} items`;
  };

  // Create an item count display
  const itemCountDisplay = document.createElement("div");
  itemCountDisplay.classList.add("ms-auto", "text-end");

  // Append the wrapper, dropdown, and item count display to the pagination container
  paginationContainer.appendChild(paginationWrapper);
  paginationContainer.appendChild(itemsPerPageDropdown);
  paginationContainer.appendChild(itemCountDisplay);

  // Initial render
  renderCurrentPage();
  updatePagination();
};

const renderCarousel = () => {
  // Obtém o elemento do banner da loja através do id
  const shopBanner = document.getElementById("shopBanner");

  // Define as imagens do carrossel que vão ser exibidas na loja
  const carouselImages = [
    "../../app/assets/carousel/shop/products_1.jpg",
    "../../app/assets/carousel/shop/products_2.jpg",
    "../../app/assets/carousel/shop/products_3.jpg",
  ];

  // Define o id para o carrossel
  const carouselId = "shopCarousel";

  // Cria o carrossel usando as imagens e respetivo id
  const shopCarousel = createCarousel(carouselImages, carouselId);

  // Adiciona o carrossel criado ao conteúdo do banner da loja
  shopBanner.innerHTML = shopCarousel;
};
