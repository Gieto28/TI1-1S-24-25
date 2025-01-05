// images is an array of image paths
export function createCarousel(images, carouselId) {
    if (!images || images.length === 0) {
        console.error("Image array is empty. Cannot create carousel.");
        return "";
    }

    // Start the carousel wrapper
    let carouselHTML = `
        <div id="${carouselId}" class="carousel slide vh-33" data-bs-ride="carousel">
            <div class="carousel-inner h-100">
    `;

    // Add images as carousel items
    images.forEach((image, index) => {
        carouselHTML += `
            <div class="carousel-item ${index === 0 ? "active" : ""}">
                <img class="d-block w-100 h-100 object-fit-cover" src="${image}" alt="Slide ${index + 1}">
            </div>
        `;
    });

    // Close the carousel-inner and add controls
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

    return carouselHTML;
}
