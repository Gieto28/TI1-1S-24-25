import { updateCart } from "../components/header/script.js";
import { showToast } from "../components/toast/script.js";
import { updateOrderDetails } from "../pages/checkout/script.js";
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

  updateEverythingBasedOnCart();
};

export const removeItemFromCart = (id) => {
  const cart = storageHandler.getItem("cart") || [];

  console.log(typeof id);

  // Encontra o índice do item no carrinho
  const filteredCart = cart.filter((i) => i.id !== +id);

  console.log("Removing item from cart 2");

  console.log(filteredCart);

  storageHandler.setItem("cart", filteredCart); // Atualiza o carrinho no localStorage

  updateEverythingBasedOnCart();
};

export const decrementItemQuantity = (id) => {
  const cart = storageHandler.getItem("cart") || [];

  // Encontra o item no carrinho
  const item = cart.find((i) => i.id === +id);

  console.log(item);

  // Decrementa a quantidade do item
  item.quantity--;

  storageHandler.setItem("cart", cart); // Atualiza o carrinho no localStorage

  // Se a quantidade for zero, remove o item do carrinho

  console.log(item.quantity);
  console.log(typeof item.quantity);

  if (+item.quantity === 0) {
    console.log("Removing item from cart");
    removeItemFromCart(id);
    return;
  }

  updateEverythingBasedOnCart();
};

export const incrementItemQuantity = (id) => {
  const cart = storageHandler.getItem("cart") || [];

  // Encontra o item no carrinho
  const item = cart.find((i) => +i.id === +id);

  // Incrementa a quantidade do item
  item.quantity++;

  storageHandler.setItem("cart", cart); // Atualiza o carrinho no localStorage

  updateEverythingBasedOnCart();
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

  return cart.reduce((total, item) => {
    const normalizedPrice = Number(item.price.replace(",", ".")); // Replace comma with period
    const quantity = Number(item.quantity);

    return total + normalizedPrice * quantity;
  }, 0);
};

export const getCartAmmount = () => {
  const cart = storageHandler.getItem("cart") || []; // Obtém o carrinho do localStorage

  // Calcula a quantidade de itens no carrinho
  return cart.reduce((acc, item) => acc + item.quantity, 0);
};

export const removeAllItemsFromCart = () => {
  storageHandler.removeItem("cart"); // Remove o carrinho do localStorage

  updateEverythingBasedOnCart();
};

const updateEverythingBasedOnCart = () => {
  updateCart();

  updateOrderDetails();
};
