// Variable for the toast timer
let toastTimer;

// Function to dynamically create the HTML structure for a toast
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

// Function to start the clock for the toast time
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

// Function to show a toast with dynamic content
export const showToast = (title, message, imageUrl = null) => {
    const container = document.getElementById('toastContainer');
    
    if (!container) return;

    // Generate a unique ID for the new toast
    const toastId = `toast-${Date.now()}`;
    const toastHTML = createToastHTML(toastId, title, message, imageUrl);

    // Add the new toast to the container
    container.insertAdjacentHTML('beforeend', toastHTML);
    const toastElement = document.getElementById(toastId);

    if (toastElement) {
        const toastInstance = bootstrap.Toast.getOrCreateInstance(toastElement);
        startClockForToast(toastElement);

        // Show the toast
        toastInstance.show();

        // Auto-hide after 7 seconds
        setTimeout(() => {
            toastInstance.hide();

            // Remove the toast element from the DOM after hiding
            toastElement.addEventListener('hidden.bs.toast', () => {
                toastElement.remove();
            });
        }, 7000);
    }

    // Adjust positioning for mobile and desktop
    container.className = window.innerWidth < 768 
        ? 'toast-container position-fixed top-0 start-50 translate-middle-x p-3'
        : 'toast-container position-fixed top-0 end-0 p-3';
};

// Function to hide all toasts
export const hideAllToasts = () => {
    const container = document.getElementById('toastContainer');
    if (container) {
        const toasts = container.querySelectorAll('.toast');
        toasts.forEach((toast) => {
            const toastInstance = bootstrap.Toast.getOrCreateInstance(toast);
            toastInstance.hide();
        });
    }

    // Clear the timer
    if (toastTimer) {
        clearInterval(toastTimer);
        toastTimer = null;
    }
};
