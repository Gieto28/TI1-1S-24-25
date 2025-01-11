/*
Este ficheiro: Criação de Carrossel de Imagens

Descrição:
Este ficheiro contém a função `createCarousel`, que cria dinamicamente um carrossel de imagens, através de Bootstrap. 
Esta recebe dois argumentos:
- `images`: um array de URLs de imagens a serem exibidas no carrossel.
- `carouselId`: o ID a ser atribuído ao elemento HTML do carrossel, permitindo a manipulação específica de cada carrossel.
*/

export function createCarousel(images, carouselId) {
  // Verifica se o array de imagens é válido e não está vazio
  if (!images || images.length === 0) {
    console.error("Image array is empty. Cannot create carousel.");
    return ""; // Retorna uma string vazia se não houver imagens
  }

  // Inicia o HTML do carrossel com o container principal e a estrutura do Bootstrap
  let carouselHTML = `
          <div id="${carouselId}" class="carousel slide vh-33" data-bs-ride="carousel" data-bs-wrap="true" data-bs-interval="2000">
              <div class="carousel-inner h-100">
      `;

  /*
    Função para adicionar cada imagem como um item do carrossel

    Descrição:
    A função percorre o array `images` e cria uma estrutura de item para cada imagem. O primeiro item do carrossel é marcado como "ativo" (classe "active") para ser exibido inicialmente.
    */
  images.forEach((image, index) => {
    // O primeiro item deve ter a classe "active" para ser exibido inicialmente
    carouselHTML += `
            <div class="carousel-item ${index === 0 ? "active" : ""}">
                <img class="d-block w-100 h-100 object-fit-cover" src="${image}" alt="Slide ${
      index + 1
    }">
            </div>
        `;
  });

  // Fecha a secção de itens do carrossel e adiciona os botões de navegação (anterior e seguinte)
  carouselHTML += `
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
              </button>
          </div>
      `;

  // Retorna o HTML gerado para o carrossel, em formato de string
  return carouselHTML;
}
