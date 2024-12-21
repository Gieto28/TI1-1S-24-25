// Variável global para armazenar o ID do intervalo
let toastTimer; // Para armazenar o temporizador do toast

// Função que inicia um timer para atualizar o texto do tempo no elemento do toast
const startClockForToast = (element) => {
    let time = 0;

    // Limpa os intervalos existentes para evitar múltiplos clocks
    if (toastTimer) {
        clearInterval(toastTimer);
    }

    // Função para atualizar o tempo mostrado no elemento
    const updateTime = () => {
        if (time === 0) {
            element.textContent = "now"; // Mostra noww quando o tempo é zero
        } else {
            element.textContent = `${time} min ago`; // Mostra o tempo em minutos passados
        }
        time += 1; // Incrementa o tempo
    };

    // Atualiza o tempo e inicia o intervalo que executa a cada minuto
    updateTime();
    toastTimer = setInterval(updateTime, 60000);

    return time;
};

// Função para exibir um toast com título, mensagem e atualização de tempo
export const showToast = (title, message) => {
    const toastTrigger = document.getElementById('liveToastBtn'); // Botão que ativa o toast
    const toastElement = document.getElementById('liveToast'); // Elemento principal do toast

    if (!toastElement) return; // Sai se o elemento do toast não existir

    const toastTitle = toastElement.querySelector("#toastTitle"); // Título do toast
    const toastMessage = toastElement.querySelector("#toastMessage"); // Mensagem do toast
    const toastTime = toastElement.querySelector("#toastTime"); // Elemento do tempo

    if (toastTitle && toastMessage && toastTime) {
        toastTitle.textContent = title; // Define o título
        toastMessage.textContent = message; // Define a mensagem
        startClockForToast(toastTime); // Inicia o timer para o tempo
    }

    if (toastTrigger) {
        const toastInstance = bootstrap.Toast.getOrCreateInstance(toastElement); // Obtém ou cria uma instância do toast do Bootstrap

        // Adiciona evento de click para exibir o toast
        toastTrigger.addEventListener('click', () => {
            toastInstance.show();
        });
    }

    // Esconde o toast automaticamente após 7 segundos
    setTimeout(() => {
        toastInstance.hide();
    }, 7000);
};

// Função para esconder o toast manualmente
export const hideToast = () => {
    const toastElement = document.getElementById('liveToast'); // Obtém o elemento do toast
    if (toastElement) {
        const toastInstance = bootstrap.Toast.getOrCreateInstance(toastElement); // Obtém ou cria uma instância do toast do Bootstrap
        toastInstance.hide(); // Esconde o toast
    }

    // Limpa o timer se o toast for escondido
    if (toastTimer) {
        clearInterval(toastTimer); // Para o timer do tempo
        toastTimer = null; // Faz reset à variável global
    }
};
