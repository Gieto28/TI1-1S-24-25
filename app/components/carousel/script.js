// Função para criar um carrossel em bootstrap com imagens, que contém 2 argumentos:
// images - array de imagens
// carouselId - id do carrosel
export function createCarousel(images, carouselId) {
    // Verifica se o array de imagens é válido e não está vazio
    if (!images || images.length === 0) {
        console.error("Image array is empty. Cannot create carousel.");
        return ""; // Retorna uma string vazia se não houver imagens
    }

    /// Inicia o html do carrossel com o container principal e respetivo bootstrap
    let carouselHTML = `
        <div id="${carouselId}" class="carousel slide vh-33" data-bs-ride="carousel">
            <div class="carousel-inner h-100">
    `;

    // Função que adiciona cada imagem como um item do carrossel
    images.forEach((image, index) => {
        // O primeiro item deve ter a classe "active" para ser exibido inicialmente
        carouselHTML += `
            <div class="carousel-item ${index === 0 ? "active" : ""}">
                <img class="d-block w-100 h-100 object-fit-cover" src="${image}" alt="Slide ${index + 1}">
            </div>
        `;
    });

    // Fecha a secção de itens do carrossel e adiciona os botões de navegação do mesmo (anterior e seguinte)
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

    // Retorna o html gerado para o carrossel, em string
    return carouselHTML;
}
