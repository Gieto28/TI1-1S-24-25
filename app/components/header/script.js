/* Atualiza o número de itens adicionados ao carrinho */

import { getCartAmmount } from "../../utils/shop.js";

export const updateCart = () => {
  const cartAmmount = document.getElementById('cartAmmount');

  cartAmmount.innerHTML = getCartAmmount();
}