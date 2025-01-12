/*
Este ficheiro: Carregamento e Gestão do Carrinho de Compras e Checkout

Descrição:
Este ficheiro JavaScript lida com a funcionalidade do carrinho de compras e o processo de checkout na página de finalização de compra. 
Inclui funções para adicionar, remover e ajustar as quantidades dos itens no carrinho, exibir o total da compra, 
e processar o checkout. A função `showToast` é utilizada para mostrar notificações ao utilizador.
*/

// Importa funções necessárias para exibir notificações e manipular o carrinho e o armazenamento local
import { showToast } from "../../components/toast/script.js";
import {
  decrementItemQuantity,
  getCartTotal,
  incrementItemQuantity,
  removeAllItemsFromCart,
  removeItemFromCart,
} from "../../utils/shop.js";
import { storageHandler } from "../../utils/storage.js";

// Função principal que carrega o conteúdo da página de checkout
export const loadCheckoutContent = () => {
  populateCart(); // Popula o carrinho com itens do armazenamento

  const checkoutButton = document.getElementById("checkoutButton");

  // Adiciona um event listener ao botão de checkout
  checkoutButton.addEventListener("click", checkout);
};

/*
Função: populateCart

Descrição:
A função `populateCart` popula dinamicamente a área do carrinho com os itens armazenados no armazenamento local.
Se não houver itens no carrinho, exibe uma mensagem a informar que o carrinho está vazio. 
A função também é responsável por renderizar os itens, incluindo a imagem, nome, descrição, quantidade e preço de cada produto.
*/
export const populateCart = () => {
  const cart = storageHandler.getItem("cart") || [];
  const cartContainer = document.querySelector(".col-12.col-md-8");

  // Limpa os itens existentes no carrinho
  cartContainer.innerHTML = "";

  // Popula o carrinho com os itens
  cart.forEach((item, index) => {
    const itemCard = document.createElement("div");

    // Adiciona as classes de estilo e AOS para animação
    itemCard.className = "card mb-4 shadow-sm border-light";

    // Define o conteúdo do card do item
    itemCard.innerHTML = `
      <div class="row g-0">
        <div class="col-md-4 d-flex justify-content-center align-items-center">
          <img src="${
            item.image || "https://via.placeholder.com/150"
          }" class="img-fluid rounded" alt="${item.name}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title fw-bold text-center">${item.name}</h5>
            <p class="text-muted small text-center">${
              item.description || "No description available"
            }</p>
            <div class="d-flex justify-content-center align-items-center mb-3">
              <button class="btn btn-outline-secondary btn-sm me-2" data-action="decrement" data-id="${
                item.id
              }">-</button>
              <input type="number" class="form-control text-center" disabled value="${
                item.quantity
              }" min="1">
              <button class="btn btn-outline-secondary btn-sm ms-2" data-action="increment" data-id="${
                item.id
              }">+</button>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <p class="fw-bold mb-0">${item.price} €</p>
              <button class="btn btn-outline-danger btn-sm" data-action="remove" data-id="${
                item.id
              }">
                <i class="bi bi-trash"></i> Remove
              </button>
            </div>
          </div>
        </div>
      </div>`;

    // Adiciona o card ao container do carrinho
    cartContainer.appendChild(itemCard);
  });

  // Se o carrinho estiver vazio, exibe uma mensagem com essa informação
  if (cart.length === 0) {
    cartContainer.innerHTML =
      "<p class='text-muted text-center' data-aos='fade-up'>Your cart is empty.</p>";
  }

  updateOrderDetails(); // Atualiza os detalhes do pedido (preços, totais, etc.)
};

/*
Função: updateOrderDetails

Descrição:
A função `updateOrderDetails` atualiza o total da compra, incluindo o preço dos produtos e o custo de envio. 
Esta calcula e exibe o preço total, o custo de envio (assumido como fixo de 14 €) e o total estimado.
*/
export const updateOrderDetails = () => {
  // Encontra os elementos com a classe "fw-bold"
  const boldElements = document.querySelectorAll(".fw-bold");

  // Localiza o elemento com o texto "Est. Total:"
  const totalElement = Array.from(boldElements).find(
    (el) => el.textContent.trim() === "Est. Total:"
  );

  if (!totalElement) {
    console.error("Could not find the 'Est. Total:' element.");
    return;
  }

  const totalValueElement = totalElement.nextElementSibling;

  // Localiza o elemento "Price:"
  const priceElements = document.querySelectorAll("p");
  const priceElement = Array.from(priceElements).find(
    (el) => el.textContent.trim() === "Price:"
  );

  if (!priceElement) {
    console.error("Could not find the 'Price:' element.");
    return;
  }

  const shippingValue = document.getElementById("shippingValue");

  const priceValueElement = priceElement.nextElementSibling;

  const cartTotal = getCartTotal(); // Obtém o total do carrinho

  // Atualiza os valores dos elementos com os totais calculados
  priceValueElement.textContent = `${cartTotal.toLocaleString("en", {
    minimumFractionDigits: 2,
  })} €`;

  shippingValue.innerHTML =
    (cartTotal ? 14 : 0).toLocaleString("en", {
      minimumFractionDigits: 2,
    }) + " €"; // Aplica o custo de envio fixo de 14 €

  totalValueElement.textContent = `${(
    cartTotal + (+cartTotal ? 14 : 0)
  ).toLocaleString("en", { minimumFractionDigits: 2 })} €`; // Total estimado com envio
};

/*
Função: checkout

Descrição:
A função `checkout` é chamada quando o utilizador clica no botão de checkout. 
Esta exibe uma mensagem de sucesso ou erro e limpa o carrinho de compras após a finalização do checkout.
*/
function checkout() {
  const cart = storageHandler.getItem("cart") || [];

  if (cart.length === 0) {
    showToast("Checkout failed!", "Your cart is empty.", "failure");
    return;
  }

  showToast(
    "Checkout success!",
    "You'll soon receive a confirmation email.",
    "success"
  );

  // Remove todos os itens do carrinho
  removeAllItemsFromCart();

  populateCart(); // Re-renderiza o carrinho após o checkout
}

/*
Event listener global para ações no carrinho (remover item, aumentar/decrementar quantidade)
Descrição:
Este listener escuta eventos de clique e executa ações no carrinho, como remover itens ou ajustar quantidades.
Após qualquer ação, o carrinho é re-renderizado.
*/
document.addEventListener("click", (e) => {
  const action = e.target.dataset.action;
  const id = e.target.dataset.id;

  if (!action || !id) return;

  switch (action) {
    case "remove":
      removeItemFromCart(id); // Remove o item do carrinho
      break;
    case "decrement":
      decrementItemQuantity(id); // Decrementa a quantidade do item
      break;
    case "increment":
      incrementItemQuantity(id); // Incrementa a quantidade do item
      break;
  }

  populateCart(); // Re-renderiza o carrinho após qualquer ação
});
