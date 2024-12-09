let toastTimer; // To store the interval ID globally

const startClockForToast = (element) => {
    let time = 0;

    // Clear any existing interval to prevent duplicates
    if (toastTimer) {
        clearInterval(toastTimer);
    }

    const updateTime = () => {
        if (time === 0) {
            element.textContent = "now";
        } else {
            element.textContent = `${time} min ago`;
        }
        time += 1;
    };

    // Update the time initially and then start the interval
    updateTime();
    toastTimer = setInterval(updateTime, 60000);

    return time;
};

export const showToast = (title, message) => {
    const toastTrigger = document.getElementById('liveToastBtn');
    const toastElement = document.getElementById('liveToast');

    if (!toastElement) return;

    const toastTitle = toastElement.querySelector("#toastTitle");
    const toastMessage = toastElement.querySelector("#toastMessage");
    const toastTime = toastElement.querySelector("#toastTime");

    if (toastTitle && toastMessage && toastTime) {
        toastTitle.textContent = title;
        toastMessage.textContent = message;
        startClockForToast(toastTime);
    }

    if (toastTrigger) {
        const toastInstance = bootstrap.Toast.getOrCreateInstance(toastElement);

        toastTrigger.addEventListener('click', () => {
            toastInstance.show();
        });
    }

    setTimeout(() => {
        toastInstance.hide();
    }, 7000);
};

export const hideToast = () => {
    const toastElement = document.getElementById('liveToast');
    if (toastElement) {
        const toastInstance = bootstrap.Toast.getOrCreateInstance(toastElement);
        toastInstance.hide();
    }

    // Clear the timer if hiding the toast
    if (toastTimer) {
        clearInterval(toastTimer);
        toastTimer = null;
    }
};
