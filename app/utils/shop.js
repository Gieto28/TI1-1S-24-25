import { updateCart } from "../components/header/script.js";
import { showToast } from "../components/toast/script.js";
import { storageHandler } from "./storage.js";

export const addItemToCart = (item) => {
  const cart = storageHandler.getItem("cart") || [];

  // Verifica se o item já existe no carrinho
  const itemInCart = cart.find((i) => i.id === item.id);

  // Se o item já existe, incrementa a quantidade
  if (itemInCart) {
    itemInCart.quantity++;
  } else {
    // Se o item não existe, adiciona ao carrinho
    cart.push({ ...item, quantity: 1 });
  }

  storageHandler.setItem("cart", cart); // Atualiza o carrinho no

  showToast("Item adicionado ao carrinho", item.name); // Exibe um toast informando que o item foi adicionado ao carrinho

  updateCart(); // Atualiza o número de itens no carrinho
};

export const removeItemFromCart = (id) => {
  const cart = storageHandler.getItem("cart") || [];
  // Encontra o índice do item no carrinho
  const index = cart.findIndex((i) => i.id === id);

  // Remove o item do carrinho
  cart.splice(index, 1);
};

export const decrementItemQuantity = (id) => {
  const cart = storageHandler.getItem("cart") || [];
  // Encontra o item no carrinho
  const item = cart.find((i) => i.id === id);

  // Decrementa a quantidade do item
  item.quantity--;

  // Se a quantidade for zero, remove o item do carrinho
  if (item.quantity === 0) {
    removeItemFromCart(id);
  }
};

export const incrementItemQuantity = (id) => {
  const cart = storageHandler.getItem("cart") || [];

  // Encontra o item no carrinho
  const item = cart.find((i) => i.id === id);

  // Incrementa a quantidade do item
  item.quantity++;
};

export const getDiscountedPrice = (price, discount) => {
  // Se não houver desconto, retorna o preço original
  if (!discount) {
    return price;
  }

  // Calcula o preço com desconto
  return +price - ((+price * discount) / 100).toFixed(2);
};

export const getCartTotal = () => {
  const cart = storageHandler.getItem("cart") || [];

  // Calcula o total do carrinho
  return cart
    .reduce((total, item) => total + +item.price * item.quantity, 0)
    .toFixed(2);
};

export const getCartAmmount = () => {
  const cart = storageHandler.getItem("cart") || []; // Obtém o carrinho do localStorage

  // Calcula a quantidade de itens no carrinho
  return cart.reduce((acc, item) => acc + item.quantity, 0);
};
