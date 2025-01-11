/*
Este ficheiro: Atualização do Contador de Itens no Carrinho e Fecho do Menu de Navegação

Descrição:
Este ficheiro JavaScript é responsável por atualizar o número de itens no carrinho de compras exibido no header e 
também fornece a funcionalidade para fechar o menu de navegação (quando o menu está expandido).
Este interage com o método `getCartAmmount` para obter o número de itens no carrinho e atualizar o contador visível ao utilizador.
*/

// Importa a função para obter a quantidade atual de itens no carrinho
import { getCartAmmount } from "../../utils/shop.js";

// Função que carrega o conteúdo do header, incluindo a atualização do contador de itens no carrinho
export const loadHeaderContent = () => {
  updateCart(); // Atualiza o número de itens no carrinho de compras
};

/*
Função: updateCart

Descrição:
A função `updateCart` é responsável por buscar o número atual de itens no carrinho e atualizar o contador exibido 
no header da página. Esta utiliza a função `getCartAmmount` para obter a quantidade de itens e exibe essa quantidade
no elemento com o id `cartCount`.
*/
export const updateCart = () => {
  const cartCount = document.getElementById("cartCount"); // Vai buscar o número atual de itens no carrinho
  const currentAmount = getCartAmmount(); // Atualiza o contador com o número atual de itens presentes no carrinho
  cartCount.textContent = currentAmount; // Define o contador de itens apresentado ao utilizador para o número atualizado de itens presentes no carrinho
};

/*
Função: closeNavabrCollapse

Descrição:
A função `closeNavabrCollapse` é responsável por fechar o menu de navegação quando este está expandido. 
Esta verifica se o menu está visível e, se estiver, utiliza o Bootstrap Collapse para fechá-lo.
*/
export const closeNavabrCollapse = () => {
  const navbarCollapse = document.querySelector(".navbar-collapse"); // Encontra o menu de navegação
  if (navbarCollapse.classList.contains("show")) {
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
      toggle: false, // Impede o alternar de estado, forçando o fecho
    });
    bsCollapse.hide(); // Fecha o menu de navegação
  }
};

export const setActiveLink = (currentPage) => {
  // Remove a classe 'active' de todos os links
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  // Adiciona a classe 'active' ao link da página atual
  const activeLink = document.querySelector(`.navbar-nav .nav-link[onclick*="${currentPage}"]`);
  if (activeLink) {
    activeLink.classList.add("active");
  }
};