/* 
Este ficheiro: Gestão de Consentimento de Cookies

Descrição:
Este ficheiro JavaScript é responsável por exibir e gerir a modal de consentimento de cookies na aplicação.
Inclui funções para criar dinamicamente a estrutura HTML da modal, exibi-la, e armazenar a decisão do utilizador no localStorage.
A modal só será exibida se o utilizador ainda não tiver aceitado os cookies.
*/

// Função: createCookieModalHTML
// Cria dinamicamente a estrutura HTML da modal de consentimento de cookies.
const createCookieModalHTML = () => {
    return `
        <div class="modal fade" id="cookieConsentModal" tabindex="-1" aria-labelledby="cookieConsentModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="cookieConsentModalLabel">Cookies & Privacy</h5>
                    </div>
                    <div class="modal-body">
                        <p class="mb-3">
                            This website uses cookies to ensure you get the best experience on our website.
                        </p>
                        <!-- Necessary cookies -->
                        <div class="form-check mb-3">
                            <input class="form-check-input" type="checkbox" id="necessaryCookies" checked disabled />
                            <label class="form-check-label" for="necessaryCookies">
                                <strong>Necessary cookies</strong> 
                                <span class="text-muted d-block">These cookies enable the basic functionality of our website, e.g., remembering your cookie preferences.</span>
                            </label>
                        </div>
                        <!-- Analytical cookies -->
                        <div class="form-check mb-3">
                            <input class="form-check-input" type="checkbox" id="analyticalCookies" />
                            <label class="form-check-label" for="analyticalCookies">
                                <strong>Analytical cookies</strong> 
                                <span class="text-muted d-block">Help us gather statistics about website usage to improve user experience.</span>
                            </label>
                        </div>
                        <!-- Marketing cookies -->
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="marketingCookies" />
                            <label class="form-check-label" for="marketingCookies">
                                <strong>Marketing cookies</strong> 
                                <span class="text-muted d-block">Allow us to show relevant ads and social media content on our website and other platforms.</span>
                            </label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" id="acceptNecessary">Accept necessary</button>
                        <button type="button" class="btn btn-secondary" id="acceptAll">Accept all</button>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Função: showCookieModal
// Exibe a modal de consentimento de cookies se o utilizador ainda não aceitou.
export const showCookieModal = () => {
    const modalContainer = document.getElementById("modalContainer");

    if (!modalContainer) {
        console.error("Modal container not found. Please ensure a container with ID 'modalContainer' exists.");
        return;
    }

    // Verifica se o utilizador já aceitou os cookies
    const hasAcceptedCookies = localStorage.getItem("cookiesAccepted");

    if (!hasAcceptedCookies) {
        // Insere o HTML da modal no container
        modalContainer.innerHTML = createCookieModalHTML();

        // Inicializa e exibe a modal
        const modalElement = document.getElementById("cookieConsentModal");
        const modalInstance = new bootstrap.Modal(modalElement, {
            backdrop: "static",
            keyboard: false,
        });
        modalInstance.show();

        // Adiciona eventos aos botões
        document.getElementById("acceptNecessary").addEventListener("click", () => {
            // Apenas aceita os cookies necessários
            localStorage.setItem("cookiesAccepted", "necessary");
            modalInstance.hide();
        });

        document.getElementById("acceptAll").addEventListener("click", () => {
            // Aceita todos os tipos de cookies
            const preferences = {
                necessary: true,
                analytical: document.getElementById("analyticalCookies").checked,
                marketing: document.getElementById("marketingCookies").checked,
            };
            localStorage.setItem("cookiesAccepted", JSON.stringify(preferences));
            modalInstance.hide();
        });
    }
};
