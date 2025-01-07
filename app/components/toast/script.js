/*
Este ficheiro: Gestão de Toasts

Descrição:
Este ficheiro JavaScript é responsável por exibir e gerir toasts (notificações rápidas) na aplicação.
Este contém funções para criar a estrutura HTML do toast, exibir toasts com conteúdo dinâmico, atualizar o tempo exibido no toast,
e esconder todos os toasts ativos após um certo tempo. Além disso, este também ajusta o posicionamento dos toasts para diferentes tamanhos de ecrã.
*/

// Variável para o temporizador do toast
let toastTimer;

/*
Função: createToastHTML

Descrição:
A função `createToastHTML` é responsável por criar dinamicamente a estrutura HTML do toast.
Esta recebe o `id`, `title`, `message` e `imageUrl` como parâmetros e retorna a string de HTML que representa o toast.
Se uma imagem for fornecida, esta será incluída no header do toast.
*/
const createToastHTML = (id, title, message, imageUrl) => {
    return `
        <div id="${id}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                ${imageUrl ? `<img src="${imageUrl}" class="rounded me-2" alt="${imageUrl}" />` : ''}
                <strong class="me-auto">${title}</strong>
                <small class="toast-time">now</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">${message}</div>
        </div>
    `;
};

/*
Função: startClockForToast

Descrição:
A função `startClockForToast` inicia um contador para mostrar o tempo desde que o toast foi exibido.
O tempo é atualizado a cada minuto, e é exibido no formato "now" ou "X min ago".
*/
const startClockForToast = (toastElement) => {
    let time = 0;
    const timeElement = toastElement.querySelector('.toast-time');

    if (toastTimer) clearInterval(toastTimer);

    const updateTime = () => {
        timeElement.textContent = time === 0 ? 'now' : `${time} min ago`;
        time += 1;
    };

    updateTime();
    toastTimer = setInterval(updateTime, 60000);
};

/*
Função: showToast

Descrição:
A função `showToast` é responsável por exibir um toast com conteúdo dinâmico. Esta recebe o `title`, `message` e opcionalmente uma `imageUrl`.
Esta gera um ID único para cada toast, cria o HTML necessário, e adiciona o toast à página. O toast é exibido por 7 segundos e depois é removido automaticamente.
Além disso, a função ajusta a posição do container do toast dependendo do tamanho do ecrã.
*/
export const showToast = (title, message, imageUrl = null) => {
    const container = document.getElementById('toastContainer');
    
    if (!container) return;

    // Gera um ID único para o novo toast
    const toastId = `toast-${Date.now()}`;
    const toastHTML = createToastHTML(toastId, title, message, imageUrl);

    // Adiciona o novo toast ao container
    container.insertAdjacentHTML('beforeend', toastHTML);
    const toastElement = document.getElementById(toastId);

    if (toastElement) {
        const toastInstance = bootstrap.Toast.getOrCreateInstance(toastElement);
        startClockForToast(toastElement);

        // Exibe o toast
        toastInstance.show();

        // Esconde automaticamente após 7 segundos
        setTimeout(() => {
            toastInstance.hide();

            // Remove o toast da DOM (Document Object Model) após ser escondido
            toastElement.addEventListener('hidden.bs.toast', () => {
                toastElement.remove();
            });
        }, 7000);
    }

    // Ajusta a posição do container para dispositivos móveis e desktop
    container.className = window.innerWidth < 768 
        ? 'toast-container position-fixed top-0 start-50 translate-middle-x p-3'
        : 'toast-container position-fixed left-0 bottom-0 p-3';
};

/*
Função: hideAllToasts

Descrição:
A função `hideAllToasts` é responsável por esconder todos os toasts ativos na página. Esta percorre todos os toasts dentro do container 
e chama a função `hide` para cada um. Além disso, esta limpa o temporizador para a atualização do tempo.
*/
export const hideAllToasts = () => {
    const container = document.getElementById('toastContainer');
    if (container) {
        const toasts = container.querySelectorAll('.toast');
        toasts.forEach((toast) => {
            const toastInstance = bootstrap.Toast.getOrCreateInstance(toast);
            toastInstance.hide();
        });
    }

    // Limpa o temporizador
    if (toastTimer) {
        clearInterval(toastTimer);
        toastTimer = null;
    }
};
