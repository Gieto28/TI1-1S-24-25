/*
Este ficheiro: Validação de Formulário de Contacto

Descrição:
Este ficheiro JavaScript é responsável pela validação de um formulário de contato na página de contacto. 
Este lida com a verificação dos campos obrigatórios, como nome, e-mail e mensagem, e exibe notificações de erro ou sucesso 
com base nos resultados da validação. A função `showToast` é utilizada para mostrar mensagens ao utilizador.
*/

// Importa a função para exibir mensagens de notificação (toast)
import { showToast } from "../../components/toast/script.js"; 

export const loadContactContent = () => {
    const form = document.getElementById('contactForm');

    // Adiciona o event listener ao formulário para validar os dados quando o formulário for enviado
    form.addEventListener('submit', validateForm);
}

/*
Função: validateForm

Descrição:
A função `validateForm` é chamada ao submeter o formulário. Esta impede o envio padrão do formulário e valida os campos:
- Verifica se o nome está preenchido.
- Valida o formato do e-mail.
- Garante que a mensagem tenha pelo menos 15 caracteres.
- Caso todos os campos sejam válidos, exibe uma mensagem de sucesso, caso contrário, exibe uma mensagem de erro.
*/
export const validateForm = (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    let isValid = true; // Flag para verificar se o formulário é válido

    // Limpa os erros anteriores, se houver
    document.getElementById('fullnameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('messageError').textContent = '';

    // Valida o campo "fullname"
    const fullname = document.getElementById('fullname').value;
    if (!fullname) {
        isValid = false; // Marca como inválido se o nome não for preenchido
    }

    // Valida o campo "email" com expressão regular para garantir formato correto
    const email = document.getElementById('email').value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailPattern.test(email)) {
        isValid = false; // Marca como inválido se o e-mail não for preenchido ou estiver no formato errado
    }

    // Valida o campo "message", garantindo que tenha pelo menos 15 caracteres
    const message = document.getElementById('message').value;
    if (!message || message.length < 15) {
        isValid = false; // Marca como inválido se a mensagem for muito curta ou não for preenchida
    }

    // Se o formulário for válido, exibe uma mensagem de sucesso e limpa o formulário
    if (isValid) {
        showToast('Success', 'Your message has been sent successfully.');
        cleanForm(); // Limpa os campos do formulário após sucesso
    } else {
        // Caso contrário, exibe uma mensagem de erro
        showToast('Error', 'Please fill in the required fields correctly.');
    }
};

/*
Função: cleanForm

Descrição:
A função `cleanForm` limpa todos os campos do formulário após o envio bem-sucedido da mensagem.
*/
const cleanForm = () => {
    document.getElementById('fullname').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
}
