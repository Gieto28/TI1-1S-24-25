/*
Este ficheiro: Funcionalidades de gestão do carrinho.

Descrição:
Este ficheiro JavaScript lida com funcionalidades de gestão do carrinho.
Permite adicionar, remover e atualizar itens no carrinho, bem como calcular totais e aplicar descontos. 
Os dados do carrinho são armazenados no localStorage, e as atualizações são refletidas através de renderização dinâmica de conteúdo. As notificações toast e os detalhes da encomenda são atualizados em conformidade.
*/

// Importa funções utilitárias e componentes para gestão do carrinho, notificações e manipulação de armazenamento
import { updateCart } from "../components/header/script.js";
import { showToast } from "../components/toast/script.js";
import { updateOrderDetails } from "../pages/checkout/script.js";
import { storageHandler } from "./storage.js";

// Adiciona um item ao carrinho, incrementando a sua quantidade se já existir ou adicionando-o se não existir
export const addItemToCart = (item) => {
  const cart = storageHandler.getItem("cart") || [];

  // Verifica se o item já existe no carrinho
  const itemInCart = cart.find((i) => i.id === item.id);

  // Se o item já existir, incrementa a sua quantidade
  if (itemInCart) {
    itemInCart.quantity++;
  } else {
    // Se o item não existir, adiciona-o com uma quantidade de 1
    cart.push({ ...item, quantity: 1 });
  }

  storageHandler.setItem("cart", cart); // Atualiza o carrinho no localStorage

  showToast("Item added to cart", item.name); // Mostra uma notificação toast

  updateEverythingBasedOnCart(); // Atualiza a interface do carrinho e os detalhes da encomenda
};

// Remove um item do carrinho com base no seu ID
export const removeItemFromCart = (id) => {
  const cart = storageHandler.getItem("cart") || [];

  // Filtra o item a ser removido do carrinho
  const filteredCart = cart.filter((i) => i.id !== +id);

  storageHandler.setItem("cart", filteredCart); // Atualiza o carrinho no localStorage

  updateEverythingBasedOnCart(); // Atualiza a interface do carrinho e os detalhes da encomenda
};

// Decrementa a quantidade de um item no carrinho, removendo-o se a quantidade chegar a zero
export const decrementItemQuantity = (id) => {
  const cart = storageHandler.getItem("cart") || [];

  // Encontra o item no carrinho
  const item = cart.find((i) => i.id === +id);

  // Decrementa a quantidade do item
  item.quantity--;

  storageHandler.setItem("cart", cart); // Atualiza o carrinho no localStorage

  // Se a quantidade chegar a zero, remove o item do carrinho
  if (+item.quantity === 0) {
    removeItemFromCart(id);
    return;
  }

  updateEverythingBasedOnCart(); // Atualiza a interface do carrinho e os detalhes da encomenda
};

// Incrementa a quantidade de um item no carrinho
export const incrementItemQuantity = (id) => {
  const cart = storageHandler.getItem("cart") || [];

  // Encontra o item no carrinho
  const item = cart.find((i) => +i.id === +id);

  // Incrementa a quantidade do item
  item.quantity++;

  storageHandler.setItem("cart", cart); // Atualiza o carrinho no localStorage

  updateEverythingBasedOnCart(); // Atualiza a interface do carrinho e os detalhes da encomenda
};

// Calcula o preço com desconto de um item
export const getDiscountedPrice = (price, discount) => {
  // Se nenhum desconto for aplicado, retorna o preço original
  if (!discount) {
    return price;
  }

  // Calcula o preço após aplicar o desconto
  return +price - ((+price * discount) / 100).toFixed(2);
};

// Calcula o preço total de todos os itens no carrinho
export const getCartTotal = () => {
  const cart = storageHandler.getItem("cart") || [];

  // Reduz os itens do carrinho a um montante total considerando a quantidade e o preço de cada item
  return cart.reduce((total, item) => {
    const normalizedPrice = Number(item.price.replace(",", ".")); // Converte o preço de string para número
    const quantity = Number(item.quantity);

    return total + normalizedPrice * quantity;
  }, 0);
};

// Calcula a quantidade total de itens no carrinho
export const getCartAmmount = () => {
  const cart = storageHandler.getItem("cart") || [];

  // Soma as quantidades de todos os itens no carrinho
  return cart.reduce((acc, item) => acc + item.quantity, 0);
};

// Remove todos os itens do carrinho
export const removeAllItemsFromCart = () => {
  storageHandler.removeItem("cart"); // Remove os dados do carrinho do localStorage

  updateEverythingBasedOnCart(); // Atualiza a interface do carrinho e os detalhes da encomenda
};

// Função auxiliar para atualizar a interface do carrinho e os detalhes da encomenda com base no estado atual do carrinho
const updateEverythingBasedOnCart = () => {
  updateCart(); // Atualiza a interface do carrinho
  updateOrderDetails(); // Atualiza os detalhes da encomenda
};
