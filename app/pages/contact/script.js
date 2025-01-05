import { showToast } from "../../components/toast/script.js";

export const validateForm = (event) => {
    event.preventDefault();
    let isValid = true;

    document.getElementById('fullnameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('messageError').textContent = '';

    const fullname = document.getElementById('fullname').value;
    if (!fullname) {
        isValid = false;
    }

    const email = document.getElementById('email').value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailPattern.test(email)) {
        isValid = false;
    }

    const message = document.getElementById('message').value;
    if (!message || message.length < 30) {
        isValid = false;
    }

    if (isValid) {
        showToast('Success', 'Your message has been sent successfully.');
    } else {
        showToast('Error', 'Please fill in the required fields correctly.');
    }

    return false;
};