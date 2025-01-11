/*
Este ficheiro: Envio notificações de email relacionadas com agendamentos

Descrição:
Envia um email quando um novo agendamento é criado ou apagado.
Utiliza o EmailJS para facilitar o envio de emails.
Aceita dois tipos de emails: "new" (novo agendamento) e "delete" (apagar agendamento).
Exibe notificações visuais de sucesso ou erro utilizando a função `showToast`.
*/

// Importa a função showToast para exibir notificações visuais de sucesso ou erro.
import { showToast } from "../components/toast/script.js";

// Função principal para enviar emails de notificações relacionadas com agendamentos.
export const sendAppointmentEmail = (type, appointment) => {
  // Determina o ID do template com base no tipo de email ("new" ou "delete").
  const templateID =
    type === "new"
      ? "template_x4u500o" // ID do template para novos agendamentos.
      : type === "delete"
      ? "template_wb59v73" // ID do template para agendamentos eliminados.
      : null;

  // Verifica se o tipo de email é válido.
  if (!templateID) {
    // Mostra um erro na consola caso o tipo de email seja inválido.
    console.error("Invalid email type provided.");
    return;
  }

  // Define os parâmetros que serão enviados ao template do EmailJS.
  const templateParams = {
    to_name: appointment.name, // Nome do destinatário.
    to_email: appointment.email, // Email do destinatário.
    title: appointment.title, // Título do agendamento.
    date: new Date(appointment.date).toDateString(), // Data do agendamento em formato legível.
    description: appointment.description, // Descrição do agendamento.
    name: appointment.name, // Nome do criador do agendamento.
    phone: appointment.phone, // Telefone do criador do agendamento.
    email: appointment.email, // Email do criador do agendamento.
  };

  // Envia o email utilizando o EmailJS com os parâmetros especificados.
  emailjs.send("service_kkh8ne9", templateID, templateParams).then(
    // Se o envio do email for bem-sucedido, mostra uma mensagem de sucesso.
    (response) => {
      // Exibe no console o status e a resposta do envio.
      console.info("Email sent successfully:", response.status, response.text);
      // Mostra uma notificação de sucesso ao utilizador.
      showToast("Success", "Notification email sent.", "success");
    },
    // Se o envio do email falhar, mostra uma mensagem de erro.
    (error) => {
      // Exibe no console detalhes sobre o erro.
      console.error("Failed to send email:", error);
      // Mostra uma notificação de erro ao utilizador.
      showToast("Error", "Failed to send notification email.", "failure");
    }
  );
};
