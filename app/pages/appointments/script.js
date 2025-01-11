/**
 * Este arquivo JavaScript é responsável por gerenciar o calendário de agendamentos da aplicação.
 *
 * Funcionalidades principais:
 * 1. Renderização do calendário interativo, exibindo:
 *    - Dias válidos para novos agendamentos.
 *    - Dias inválidos (passados ou indisponíveis).
 *    - Dias de folga (offDays) e com agendamentos existentes.
 * 2. Navegação entre meses com os botões "Anterior" e "Próximo".
 * 3. Interação com modais para:
 *    - Adicionar novos agendamentos.
 *    - Editar ou deletar agendamentos existentes.
 * 4. Integração com EmailJS para envio de notificações por email.
 * 5. Ferramentas visuais, como tooltips e mensagens de erro ou sucesso.
 */

import { showToast } from "../../components/toast/script.js"; // Importa função para exibir mensagens de erro ou sucesso.
import { sendAppointmentEmail } from "../../utils/email.js"; // Importa função para enviar emails via EmailJS.

const today = new Date(); // Data atual.
let year = today.getFullYear(); // Ano atual.
let currentMonthIndex = today.getMonth(); // Índice do mês atual.

const months = [
  // Lista de meses para exibição no cabeçalho.
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const scheduledAppointments = [
  // Lista de agendamentos predefinidos (exemplo: passado e futuro).
  {
    date: new Date(new Date().setDate(new Date().getDate() - 7)),
    title: "Past Appointment",
    description: "A chop done last week.",
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() + 7)),
    title: "Future Appointment",
    description: "Someone's chop scheduled for next week.",
  },
];

const userAppointments =
  JSON.parse(localStorage.getItem("userAppointments")) || []; // Recupera os agendamentos do usuário armazenados no localStorage.

const workHours = {
  offDays: [0], // Dias de folga (0 = Domingo).
};

// Função principal que carrega o conteúdo do calendário.
export const loadCalendarContent = () => {
  renderCalendarHeader(); // Renderiza o cabeçalho com mês e ano.
  renderMonthGrid(currentMonthIndex); // Renderiza os dias do mês.
  attachNavigation(); // Configura os botões de navegação entre meses.
};

// Renderiza o cabeçalho do calendário com o mês e ano atuais.
const renderCalendarHeader = () => {
  const monthHeader = document.getElementById("currentMonth");
  if (monthHeader) {
    monthHeader.textContent = `${months[currentMonthIndex]} ${year}`;
  }
};

// Cria uma tooltip que exibe informações sobre o agendamento.
const createHoverTooltip = (dayCell, appointment, isUserAppointment) => {
  if (window.innerWidth <= 768) return; // Não exibe tooltip em dispositivos móveis.

  const tooltip = document.createElement("div");
  tooltip.classList.add("hover-tooltip");
  tooltip.style.position = "fixed"; // A tooltip segue o cursor.
  tooltip.style.backgroundColor = "#fff";
  tooltip.style.border = "1px solid #ccc";
  tooltip.style.borderRadius = "5px";
  tooltip.style.padding = "10px";
  tooltip.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
  tooltip.style.display = "none";
  tooltip.style.zIndex = "1000";

  // Conteúdo dinâmico da tooltip (nome, descrição, data, etc.).
  tooltip.innerHTML = `
    <div style='font-size: 1rem; font-weight: bold;'>${appointment.title}</div>
    <div style='font-size: 0.9rem; color: #666;'>Date: ${new Date(
      appointment.date
    ).toDateString()}</div>
    <div style='margin-top: 5px;'>Description: ${appointment.description}</div>
    ${
      isUserAppointment
        ? `<div style='margin-top: 5px;'>Name: ${appointment.name}</div>`
        : ""
    }
    ${
      isUserAppointment
        ? `<div style='margin-top: 5px;'>Phone: ${appointment.phone}</div>`
        : ""
    }
    ${
      isUserAppointment
        ? `<div style='margin-top: 5px;'>Email: ${appointment.email}</div>`
        : ""
    }
  `;

  document.body.appendChild(tooltip); // Adiciona a tooltip ao documento.

  // Exibe a tooltip ao passar o mouse.
  dayCell.addEventListener("mouseover", (e) => {
    tooltip.style.display = "block";
    tooltip.style.top = `${e.clientY + 10}px`;
    tooltip.style.left = `${e.clientX + 10}px`;
  });

  // Move a tooltip conforme o cursor se move.
  dayCell.addEventListener("mousemove", (e) => {
    tooltip.style.top = `${e.clientY + 10}px`;
    tooltip.style.left = `${e.clientX + 10}px`;
  });

  // Esconde a tooltip quando o mouse sai.
  dayCell.addEventListener("mouseout", () => {
    tooltip.style.display = "none";
  });
};

// Configura o comportamento para dias inválidos (passados).
const handleInvalidDay = (dayCell) => {
  dayCell.classList.add("bg-light", "text-muted");
  dayCell.addEventListener("click", () => {
    showToast(
      "Unavailable Date",
      "You cannot select a date in the past.",
      "failure"
    );
  });
};

// Configura o comportamento para dias de folga.
const handleOffDay = (dayCell) => {
  dayCell.classList.add("off-day");
  dayCell.textContent = "✖"; // Exibe um ícone em vez do número do dia.
  dayCell.addEventListener("click", () => {
    showToast(
      "Closed Day",
      "Appointments cannot be booked on this day.",
      "warning"
    );
  });
};

// Configura o comportamento para dias já agendados.
const handleScheduledDay = (dayCell, appointment, isBeforeToday) => {
  dayCell.classList.add("bg-schedule");
  dayCell.textContent = ""; // Remove o número do dia.
  const logo = document.createElement("img");
  logo.src = "/TI1-1S-24-25/app/assets/logos/banner-light-mode.png";
  logo.alt = "Scheduled";
  logo.classList.add("logo-on-day");
  dayCell.appendChild(logo);

  createHoverTooltip(dayCell, appointment);

  dayCell.addEventListener("click", (e) => {
    e.stopPropagation();
    showToast(
      "Scheduled Date",
      isBeforeToday
        ? "This is a past scheduled appointment."
        : "Date already scheduled. There will already be a chop on this day!",
      "warning"
    );
  });
};

const handleUserDay = (dayCell, appointment) => {
  dayCell.classList.add("bg-user");
  const logo = document.createElement("img");
  logo.src = "/TI1-1S-24-25/app/assets/logos/banner-light-mode.png";
  logo.alt = "User Appointment";
  logo.classList.add("logo-on-day");
  dayCell.appendChild(logo);

  createHoverTooltip(dayCell, appointment, true);

  dayCell.addEventListener("click", (e) => {
    e.stopPropagation();
    showEditModal(appointment);
  });
};

const handleValidDay = (dayCell, currentDate) => {
  dayCell.classList.add("valid-day");
  dayCell.addEventListener("click", () => {
    showAddModal(currentDate);
  });
};

const renderMonthGrid = (monthIndex) => {
  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDay = firstDay.getDay();

  const calendarGrid = document.getElementById("calendarGrid");
  calendarGrid.innerHTML = "";

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekRow = document.createElement("div");
  weekRow.classList.add("row", "text-center", "fw-bold");
  weekdays.forEach((day) => {
    const dayColumn = document.createElement("div");
    dayColumn.classList.add("col");
    dayColumn.textContent = day;
    weekRow.appendChild(dayColumn);
  });
  calendarGrid.appendChild(weekRow);

  let daysRow = document.createElement("div");
  daysRow.classList.add("row");

  for (let i = 0; i < startDay; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("col", "border", "py-3");
    daysRow.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement("button");
    dayCell.classList.add(
      "col",
      "border",
      "py-4",
      "clickable",
      "d-flex",
      "justify-content-center",
      "align-items-center"
    );
    dayCell.textContent = day;

    const currentDate = new Date(year, monthIndex, day);
    const isBeforeToday = currentDate < today;
    const scheduled = scheduledAppointments.find(
      (appt) =>
        currentDate.toDateString() === new Date(appt.date).toDateString()
    );
    const user = userAppointments.find(
      (appt) =>
        currentDate.toDateString() === new Date(appt.date).toDateString()
    );

    // Check if the day is an off day
    if (workHours.offDays.includes(currentDate.getDay())) {
      handleOffDay(dayCell);
    } else if (scheduled) {
      handleScheduledDay(dayCell, scheduled, isBeforeToday);
    } else if (user) {
      handleUserDay(dayCell, user);
    } else if (isBeforeToday) {
      handleInvalidDay(dayCell);
    } else {
      handleValidDay(dayCell, currentDate);
    }

    daysRow.appendChild(dayCell);

    if ((startDay + day) % 7 === 0) {
      calendarGrid.appendChild(daysRow);
      daysRow = document.createElement("div");
      daysRow.classList.add("row");
    }
  }

  const remainingCells = 7 - daysRow.children.length;
  for (let i = 0; i < remainingCells && remainingCells !== 7; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("col", "border", "py-3");
    daysRow.appendChild(emptyCell);
  }

  if (daysRow.children.length > 0) {
    calendarGrid.appendChild(daysRow);
  }
};

const attachNavigation = () => {
  const prevMonthButton = document.getElementById("prevMonth");
  const nextMonthButton = document.getElementById("nextMonth");

  const updateButtonStyles = (button, label) => {
    button.textContent = label;
    button.classList.add("btn", "btn-sm", "pagination-container");
  };

  if (prevMonthButton) {
    updateButtonStyles(prevMonthButton, "← Previous");

    prevMonthButton.addEventListener("click", () => {
      if (currentMonthIndex > 0) {
        currentMonthIndex--;
      } else {
        currentMonthIndex = 11;
        year--;
      }
      renderCalendarHeader();
      renderMonthGrid(currentMonthIndex);
    });
  }

  if (nextMonthButton) {
    updateButtonStyles(nextMonthButton, "Next →");

    nextMonthButton.addEventListener("click", () => {
      if (currentMonthIndex < 11) {
        currentMonthIndex++;
      } else {
        currentMonthIndex = 0;
        year++;
      }
      renderCalendarHeader();
      renderMonthGrid(currentMonthIndex);
    });
  }
};

const showAddModal = (date) => {
  const modal = document.getElementById("addEventModal");
  ensureModalAccessibility(modal); // Fix accessibility issues

  const eventDateInput = document.getElementById("eventDate");
  const eventTitleInput = document.getElementById("eventTitle");
  const eventDescriptionInput = document.getElementById("eventDescription");
  const eventEmailInput = document.getElementById("userEmail");
  const eventNameInput = document.getElementById("userName");
  const eventPhoneInput = document.getElementById("userPhone");

  const addEventModalLabel = document.getElementById("addEventModalLabel");
  const eventModalButton = document.getElementById("eventModalButton");
  const deleteEventButton = document.getElementById("deleteEventButton");

  addEventModalLabel.textContent = "Add Appointment";
  eventModalButton.textContent = "Add Appointment";

  // Ensure delete button is hidden
  if (deleteEventButton) {
    deleteEventButton.style.display = "none";
  }

  eventDateInput.value = date.toISOString().split("T")[0];
  eventTitleInput.value = "";
  eventDescriptionInput.value = "";
  eventEmailInput.value = "";
  eventNameInput.value = "";
  eventPhoneInput.value = "";

  const form = document.getElementById("addEventForm");
  form.onsubmit = (e) => {
    e.preventDefault();

    const newAppointment = {
      date: eventDateInput.value,
      title: eventTitleInput.value,
      description: eventDescriptionInput.value,
      email: eventEmailInput.value,
      name: eventNameInput.value,
      phone: eventPhoneInput.value,
    };

    const selectedDate = new Date(newAppointment.date);
    const isOffDay = workHours.offDays.includes(selectedDate.getDay());
    const isScheduled = scheduledAppointments.some(
      (appt) =>
        new Date(appt.date).toDateString() === selectedDate.toDateString()
    );
    const isUserDay = userAppointments.some(
      (appt) =>
        new Date(appt.date).toDateString() === selectedDate.toDateString()
    );

    if (selectedDate < today || isOffDay || isScheduled || isUserDay) {
      showToast(
        "Invalid Date",
        isOffDay
          ? "This is an off day. Appointments cannot be booked."
          : isScheduled
          ? "This date already has a scheduled appointment."
          : isUserDay
          ? "You already have an appointment on this day."
          : "This date is in the past.",
        "failure"
      );
      return;
    }

    userAppointments.push(newAppointment);
    localStorage.setItem("userAppointments", JSON.stringify(userAppointments));
    renderMonthGrid(currentMonthIndex);
    sendAppointmentEmail("new", newAppointment);

    showToast("Success", "Appointment added successfully.", "success");
    bootstrap.Modal.getInstance(modal).hide();
  };

  const bootstrapModal = new bootstrap.Modal(modal);
  bootstrapModal.show();
};

const showEditModal = (appointment) => {
  const modal = document.getElementById("addEventModal");
  ensureModalAccessibility(modal); // Fix accessibility issues

  const eventDateInput = document.getElementById("eventDate");
  const eventTitleInput = document.getElementById("eventTitle");
  const eventDescriptionInput = document.getElementById("eventDescription");
  const eventEmailInput = document.getElementById("userEmail");
  const eventNameInput = document.getElementById("userName");
  const eventPhoneInput = document.getElementById("userPhone");

  const addEventModalLabel = document.getElementById("addEventModalLabel");
  const eventModalButton = document.getElementById("eventModalButton");
  const deleteEventButton = document.getElementById("deleteEventButton");

  if (!deleteEventButton) {
    console.error("Delete button not found. Ensure it exists in the HTML.");
    return;
  }

  addEventModalLabel.textContent = "Edit Appointment";
  eventModalButton.textContent = "Edit Appointment";
  deleteEventButton.style.display = "block";

  eventDateInput.value = new Date(appointment.date).toISOString().split("T")[0];
  eventTitleInput.value = appointment.title;
  eventDescriptionInput.value = appointment.description;
  eventEmailInput.value = appointment.email;
  eventNameInput.value = appointment.name;
  eventPhoneInput.value = appointment.phone;

  const form = document.getElementById("addEventForm");
  form.onsubmit = (e) => {
    e.preventDefault();

    const newDate = new Date(eventDateInput.value);
    const isOffDay = workHours.offDays.includes(newDate.getDay());
    const isScheduled = scheduledAppointments.some(
      (appt) => new Date(appt.date).toDateString() === newDate.toDateString()
    );
    const isUserDay = userAppointments.some(
      (appt) =>
        new Date(appt.date).toDateString() === newDate.toDateString() &&
        appt !== appointment
    );

    if (newDate < today || isOffDay || isScheduled || isUserDay) {
      showToast(
        "Invalid Edit",
        isOffDay
          ? "This is an off day. Appointments cannot be moved here."
          : isScheduled
          ? "This date already has a scheduled appointment."
          : isUserDay
          ? "You already have another appointment on this day."
          : "This date is in the past.",
        "failure"
      );
      return;
    }

    appointment.date = eventDateInput.value;
    appointment.title = eventTitleInput.value;
    appointment.description = eventDescriptionInput.value;
    appointment.email = eventEmailInput.value;
    appointment.name = eventNameInput.value;
    appointment.phone = eventPhoneInput.value;

    localStorage.setItem("userAppointments", JSON.stringify(userAppointments));

    showToast("Success", "Appointment updated successfully.", "success");
    renderMonthGrid(currentMonthIndex);
    bootstrap.Modal.getInstance(modal).hide();
  };

  deleteEventButton.onclick = () => {
    const index = userAppointments.findIndex(
      (appt) => appt.date === appointment.date
    );
    if (index !== -1) {
      userAppointments.splice(index, 1);
      localStorage.setItem(
        "userAppointments",
        JSON.stringify(userAppointments)
      );
      renderMonthGrid(currentMonthIndex);
      bootstrap.Modal.getInstance(modal).hide();
      sendAppointmentEmail("delete", appointment);
      showToast("Success", "Appointment deleted successfully.", "success");
    }
  };

  const bootstrapModal = new bootstrap.Modal(modal);
  bootstrapModal.show();
};

const ensureModalAccessibility = (modal) => {
  if (modal.getAttribute("aria-hidden") === "true") {
    modal.removeAttribute("aria-hidden");
  }
};
