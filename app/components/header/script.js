// Atualiza o número de itens do carrinho de compras
import { getCartAmmount } from "../../utils/shop.js";

// Função para atualizar o contador de itens do carrinho
export const updateCart = () => {
  const cartCount = document.getElementById('cartCount'); // Vai buscar o número atual de itens no carrinho
  let currentAmount = parseInt(cartCount.textContent); // Converte o número atual do contador de itens do carrinho para inteiro
  currentAmount = getCartAmmount(); // Atualiza o contador com o número atual de itens presentes no carrinho
  cartCount.textContent = currentAmount; // Define o contador de itens apresentado ao utilizador para o número atualizado de itens presentes no carrinho
}

// Função para incrementar o contador do carrinho por 1
export const incrementCartAmount = () => {
  const cartCount = document.getElementById('cartCount'); // Vai buscar o elemento do contador do carrinho
  let currentAmount = parseInt(cartCount.textContent); // Vai buscar o contador atual como um valor inteiro
  currentAmount += 1; // Aumenta o valor do contador por 1
  cartCount.textContent = currentAmount; // Atualiza o valor de itens no carrinho com o novo valor do contador
};
