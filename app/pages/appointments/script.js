/*
Este ficheiro: Funcionalidade de Calendário de Agendamentos de Barbearia

Descrição:
Este ficheiro JavaScript é responsável por exibir e gerenciar o calendário de agendamentos de uma barbearia. 
Ele permite ao utilizador navegar entre os meses, visualizar os dias com agendamentos, adicionar novos eventos e interagir com os dias no calendário.
A funcionalidade é composta por renderização do calendário, navegação entre meses, e criação de eventos através de um formulário dentro de um modal.
*/

const year = 2025; // Definição do ano fixo para o calendário
let currentMonthIndex = 0; // Índice do mês atual (0 para Janeiro)
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
    attachAddEventButton(); // Adiciona a funcionalidade de adicionar evento
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
        const dayCell = document.createElement('div');
        dayCell.classList.add('col', 'border', 'py-3', 'clickable', 'd-flex', 'justify-content-center', 'align-items-center');
        dayCell.textContent = day;

        dayCell.addEventListener('click', () => {
            document.getElementById('eventDate').value = `${day} ${months[monthIndex]} ${year}`; // Preenche a data do evento ao clicar no dia
        });

        // Verifica se o dia tem eventos e destaca a célula
        const eventForDay = events.find(event => event.date === `${day} ${months[monthIndex]} ${year}`);
        if (eventForDay) {
            dayCell.classList.add('bg-warning'); // Destaca os dias com eventos
        }

        daysRow.appendChild(dayCell);

        // Quando chega no sábado, começa uma nova linha
        if ((startDay + day) % 7 === 0) {
            calendarGrid.appendChild(daysRow); // Adiciona a linha anterior à grelha
            daysRow = document.createElement('div'); // Cria uma nova linha para a próxima semana
            daysRow.classList.add('row');
        }
    }

    // Se restar dias após o sábado, adiciona a linha final com células vazias
    const remainingCells = 7 - daysRow.children.length;
    for (let i = 0; i < remainingCells && remainingCells !== 7; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('col', 'border', 'py-3');
        daysRow.appendChild(emptyCell);
    }

    if (daysRow.children.length > 0) {
        calendarGrid.appendChild(daysRow); // Adiciona a última linha à grelha
    }
};

/*
Função: attachNavigation

Descrição:
A função `attachNavigation` é responsável por adicionar os listeners de evento aos botões de navegação, permitindo ao utilizador navegar entre os meses.
Ela verifica se o mês atual não é o primeiro ou o último, para evitar erros na navegação.
*/
const attachNavigation = () => {
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');

    if (prevMonthButton) {
        prevMonthButton.addEventListener('click', () => {
            if (currentMonthIndex > 0) {
                currentMonthIndex--; // Decrementa o índice do mês
                renderCalendarHeader(); // Atualiza o cabeçalho
                renderMonthGrid(currentMonthIndex); // Atualiza a grelha do mês
            }
        });
    }

    if (nextMonthButton) {
        nextMonthButton.addEventListener('click', () => {
            if (currentMonthIndex < 11) {
                currentMonthIndex++; // Incrementa o índice do mês
                renderCalendarHeader(); // Atualiza o cabeçalho
                renderMonthGrid(currentMonthIndex); // Atualiza a grelha do mês
            }
        });
    }
};

/*
Função: attachAddEventButton

Descrição:
A função `attachAddEventButton` adiciona a funcionalidade de adicionar um evento ao calendário. 
Ela escuta o envio do formulário dentro do modal e adiciona um novo evento ao array de eventos.
Ao submeter o formulário, o evento é armazenado e o calendário é atualizado.
*/
const attachAddEventButton = () => {
    const addEventForm = document.getElementById('addEventForm');

    if (addEventForm) {
        addEventForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário

            const eventDate = document.getElementById('eventDate').value;
            const eventTitle = document.getElementById('eventTitle').value;
            const eventDescription = document.getElementById('eventDescription').value;

            // Adiciona o novo evento ao array
            events.push({
                date: eventDate,
                title: eventTitle,
                description: eventDescription
            });

            addEventForm.reset(); // Reseta os campos do formulário
            const modal = new bootstrap.Modal(document.getElementById('addEventModal'));
            modal.hide(); // Fecha o modal após adicionar o evento

            renderMonthGrid(currentMonthIndex); // Atualiza a grelha do mês
        });
    }
};
