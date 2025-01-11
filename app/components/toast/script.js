// Variável para o temporizador do toast
let toastTimer;

// Função: createToastHTML
const createToastHTML = (id, title, message, imageUrl, type) => {
  const icons = {
    success: "✅",
    failure: "❕",
    warning: "⚠️",
    info: "ℹ️",
  };

  return `
        <div id="${id}" class="toast border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header ${
              type === "success"
                ? "bg-success text-white"
                : type === "failure"
                ? "bg-danger text-white"
                : "bg-primary text-white"
            }">
                <strong class="me-auto">${icons[type]} ${title}</strong>
                <small class="toast-time">now</small>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body d-flex align-items-center">
                ${
                  imageUrl
                    ? `<img src="${imageUrl}" class="rounded me-2" alt="${title}" style="width: 40px; height: 40px; object-fit: cover;" />`
                    : ""
                }
                <div>${message}</div>
            </div>
        </div>
    `;
};

// Função: startClockForToast
const startClockForToast = (toastElement) => {
  let time = 0;
  const timeElement = toastElement.querySelector(".toast-time");

  if (toastTimer) clearInterval(toastTimer);

  const updateTime = () => {
    timeElement.textContent = time === 0 ? "now" : `${time} min ago`;
    time += 1;
  };

  updateTime();
  toastTimer = setInterval(updateTime, 60000);
};

// Função: showToast
export const showToast = (title, message, type = "info", imageUrl = null) => {
  const container = document.getElementById("toastContainer");

  if (!container) return;

  // Ajusta a posição do container
  container.className =
    window.innerWidth < 768
      ? "toast-container position-fixed top-0 start-50 translate-middle-x p-3"
      : "toast-container position-fixed bottom-0 p-3";

  // Remove existing toasts on mobile smoothly
  const removeOldToasts = () => {
    return new Promise((resolve) => {
      if (window.innerWidth < 768) {
        const toasts = container.querySelectorAll(".toast");
        const removalPromises = Array.from(toasts).map((toast) => {
          return new Promise((res) => {
            const toastInstance = bootstrap.Toast.getOrCreateInstance(toast);
            toastInstance.hide();
            toast.addEventListener("hidden.bs.toast", () => {
              toast.remove();
              res();
            });
          });
        });
        Promise.all(removalPromises).then(resolve);
      } else {
        resolve();
      }
    });
  };

  removeOldToasts().then(() => {
    // Gera um ID único para o novo toast
    const toastId = `toast-${Date.now()}`;
    const toastHTML = createToastHTML(toastId, title, message, imageUrl, type);

    // Adiciona o novo toast ao container
    container.insertAdjacentHTML("beforeend", toastHTML);
    const toastElement = document.getElementById(toastId);

    if (toastElement) {
      const toastInstance = bootstrap.Toast.getOrCreateInstance(toastElement);
      startClockForToast(toastElement);

      // Exibe o toast
      toastInstance.show();

      // Define o tempo para o toast desaparecer (7s para sucesso, 10s para falha)
      const dismissTime = type === "failure" ? 10000 : 7000;
      setTimeout(() => {
        toastInstance.hide();

        // Remove o toast da DOM após ser escondido
        toastElement.addEventListener("hidden.bs.toast", () => {
          toastElement.remove();
        });
      }, dismissTime);
    }
  });
};

// Função: hideAllToasts
export const hideAllToasts = () => {
  const container = document.getElementById("toastContainer");
  if (container) {
    const toasts = container.querySelectorAll(".toast");
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
