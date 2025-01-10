import { showToast } from "../../components/toast/script.js";

/*
Este ficheiro: Funcionalidade de Calendário de Agendamentos de Barbearia

Descrição:
Este ficheiro JavaScript é responsável por exibir e gerenciar o calendário de agendamentos de uma barbearia. 
Ele permite ao utilizador navegar entre os meses, visualizar os dias com agendamentos, adicionar novos eventos e interagir com os dias no calendário.
A funcionalidade é composta por renderização do calendário, navegação entre meses, e criação de eventos através de um formulário dentro de um modal.
*/

const today = new Date(); // Data atual
let year = today.getFullYear(); // Ano atual
let currentMonthIndex = today.getMonth(); // Mês atual (0 para Janeiro)
const currentDay = today.getDate(); // Dia atual
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const events = []; // Array para armazenar eventos no calendário

/*
Função: loadCalendarContent

Descrição:
A função `loadCalendarContent` é chamada para carregar todo o conteúdo do calendário. Ela chama outras funções responsáveis por:
- Renderizar o cabeçalho do calendário (mês e ano).
- Renderizar a grelha do mês atual.
- Anexar a navegação entre meses.
- Adicionar a funcionalidade de adicionar eventos.
*/
export const loadCalendarContent = () => {
    renderCalendarHeader(); // Renderiza o cabeçalho com o mês e ano
    renderMonthGrid(currentMonthIndex); // Renderiza a grelha do mês
    attachNavigation(); // Adiciona a funcionalidade de navegação entre meses
};

/*
Função: renderCalendarHeader

Descrição:
A função `renderCalendarHeader` é responsável por atualizar o cabeçalho do calendário, exibindo o mês atual no formato 'Mês Ano'.
Ela é chamada sempre que o mês é alterado, garantindo que o cabeçalho esteja sempre correto.
*/
const renderCalendarHeader = () => {
    const monthHeader = document.getElementById("currentMonth");
    if (monthHeader) {
        monthHeader.textContent = `${months[currentMonthIndex]} ${year}`; // Exibe o nome do mês atual e o ano
    }
};

/*
Função: renderMonthGrid

Descrição:
A função `renderMonthGrid` gera e exibe a grelha do calendário para o mês atual. Ela inclui:
- Determinar o primeiro e o último dia do mês.
- Adicionar os dias da semana como cabeçalhos.
- Preencher a grelha com os dias do mês, incluindo células vazias no início e no final do mês.
- Destacar os dias que possuem eventos.
- Desabilitar os dias anteriores ao dia atual.
*/
const renderMonthGrid = (monthIndex) => {
    const firstDay = new Date(year, monthIndex, 1); // Primeiro dia do mês
    const lastDay = new Date(year, monthIndex + 1, 0); // Último dia do mês
    const daysInMonth = lastDay.getDate(); // Número total de dias no mês
    const startDay = firstDay.getDay(); // Dia da semana para o primeiro dia do mês

    const calendarGrid = document.getElementById("calendarGrid");
    calendarGrid.innerHTML = ''; // Limpa o calendário antes de renderizar

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekRow = document.createElement('div');
    weekRow.classList.add('row', 'text-center', 'fw-bold');
    weekdays.forEach(day => {
        const dayColumn = document.createElement('div');
        dayColumn.classList.add('col');
        dayColumn.textContent = day; // Exibe o nome do dia da semana
        weekRow.appendChild(dayColumn);
    });
    calendarGrid.appendChild(weekRow); // Adiciona os cabeçalhos dos dias

    let daysRow = document.createElement('div');
    daysRow.classList.add('row');

    // Preenche os dias antes do primeiro dia do mês com células vazias
    for (let i = 0; i < startDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('col', 'border', 'py-3');
        daysRow.appendChild(emptyCell);
    }

    // Cria células para cada dia do mês
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('button');
        dayCell.classList.add('col', 'border', 'py-4', 'clickable', 'd-flex', 'justify-content-center', 'align-items-center');
        dayCell.textContent = day;

        // Desabilita os dias anteriores ao dia atual, mas apenas no ano atual
        const isBeforeToday =
            (year === today.getFullYear() && monthIndex === today.getMonth() && day < currentDay) ||
            (year === today.getFullYear() && monthIndex < today.getMonth()) ||
            (year < today.getFullYear());

        if (isBeforeToday) {
            dayCell.classList.add('bg-light', 'text-muted');

            // Adiciona evento para exibir toast
            dayCell.addEventListener('click', () => {
                showToast(
                    "Unavailable Date",
                    "You cannot select a date in the past.",
                    "failure"
                );
            });
        } else {
            dayCell.classList.add('valid-day');
            dayCell.addEventListener('click', () => {
                const eventDateInput = document.getElementById('eventDate');
                if (eventDateInput) {
                    eventDateInput.value = `${day} ${months[monthIndex]} ${year}`;
                }
                const modal = new bootstrap.Modal(document.getElementById('addEventModal'));
                modal.show();
            });
        }

        // Verifica se o dia tem eventos e destaca a célula
        const eventForDay = events.find(event => event.date === `${day} ${months[monthIndex]} ${year}`);
        if (eventForDay) {
            dayCell.classList.add('bg-warning');
        }

        daysRow.appendChild(dayCell);

        if ((startDay + day) % 7 === 0) {
            calendarGrid.appendChild(daysRow);
            daysRow = document.createElement('div');
            daysRow.classList.add('row');
        }
    }

    const remainingCells = 7 - daysRow.children.length;
    for (let i = 0; i < remainingCells && remainingCells !== 7; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('col', 'border', 'py-3');
        daysRow.appendChild(emptyCell);
    }

    if (daysRow.children.length > 0) {
        calendarGrid.appendChild(daysRow);
    }
};

const attachNavigation = () => {
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');

    const updateButtonStyles = (button, label) => {
        button.textContent = label;
        button.classList.add("btn", "btn-sm", 'pagination-container');
    };

    if (prevMonthButton) {
        updateButtonStyles(prevMonthButton, "← Previous");

        // Verifica se estamos no mês atual (não deixa ir para o mês anterior no ano atual)
        prevMonthButton.addEventListener('click', () => {
            if (currentMonthIndex > 0) {
                currentMonthIndex--;
            } else if (year > today.getFullYear()) {
                currentMonthIndex = 11; // Volta para dezembro
                year--; // Volta para o ano anterior
            } else {
                showToast(
                    "Invalid Navigation",
                    "You cannot navigate to a previous month in the current year.",
                    "failure"
                );
                return;
            }
            renderCalendarHeader();
            renderMonthGrid(currentMonthIndex);
        });
    }

    if (nextMonthButton) {
        updateButtonStyles(nextMonthButton, "Next →");

        // Verifica se estamos no último mês do ano
        nextMonthButton.addEventListener('click', () => {
            if (currentMonthIndex < 11) {
                currentMonthIndex++;
            } else {
                currentMonthIndex = 0; // Avança para janeiro
                year++; // Avança para o próximo ano
            }
            renderCalendarHeader();
            renderMonthGrid(currentMonthIndex);
        });
    }
};
