import { config } from "../../../config.js";
import { createCarousel } from "../../components/carousel/script.js";
import { addItemToCart } from "../../utils/shop.js";

export const loadShopContent = () => {
  renderCarousel(); // Renderiza o carrossel da loja
  renderProducts(config.products); // Renderiza os produtos disponíveis na loja
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
