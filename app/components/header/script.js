// Atualiza o número de itens do carrinho de compras
import { getCartAmmount } from "../../utils/shop.js";

export const loadHeaderContent = () => {
  updateCart(); // Atualiza o número de itens no carrinho
};

// Função para atualizar o contador de itens do carrinho
export const updateCart = () => {
  const cartCount = document.getElementById("cartCount"); // Vai buscar o número atual de itens no carrinho
  const currentAmount = getCartAmmount(); // Atualiza o contador com o número atual de itens presentes no carrinho
  cartCount.textContent = currentAmount; // Define o contador de itens apresentado ao utilizador para o número atualizado de itens presentes no carrinho
};

export const closeNavabrCollapse = () => {
  const navbarCollapse = document.querySelector(".navbar-collapse");
  if (navbarCollapse.classList.contains("show")) {
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
      toggle: false,
    });
    bsCollapse.hide();
  }
};
