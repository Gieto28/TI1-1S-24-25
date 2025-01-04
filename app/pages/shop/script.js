import { config } from "../../../config.js";
import { addItemToCart } from "../../utils/shop.js";

/* Cria navlinks dinâmicos */

export const loadShopContent = () => {
  renderProducts(config.products);
};

export const createCard = (product, addItemToCartCallback) => {
  const card = document.createElement("div");
  card.classList.add("col-12", "col-sm-6", "col-md-4", "col-xl-3", "col-xxl-2", "mb-4");

  card.innerHTML = `
      <div class="card h-100 d-flex flex-column">
        <img src="${product.image}" alt="${product.name}" class="card-img-top">
        <div class="card-body flex-grow-1">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          </div>
          <div class="card-footer mt-auto">
          <p class="card-text mb-2">${product.price} ${product.currency}</p>
          <button class="btn btn-primary w-100">Add to cart</button>
        </div>
      </div>
  `;

  const button = card.querySelector("button");

  // Adiciona um Event Listener ao botão que chama a função de adicionar item ao carrinho
  button.addEventListener("click", () => addItemToCartCallback(product));

  return card; // Retorna o card do produto
};

export const renderProducts = (products) => {
  const productsContainer = document.getElementById("shopProducts");

  // Limpa o container antes de adicionar novos produtos
  productsContainer.innerHTML = "";

  // Cria e acrescenta cada card do produto ao container
  products.forEach((product) => {
    const card = createCard(product, addItemToCart); // Cria o card do produto
    productsContainer.appendChild(card); // Adiciona o card ao container
  });
};
