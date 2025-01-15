/*
Este ficheiro: Integra o Landbot à aplicação, configurando um popup interativo.
 
Descrição:
1. Inicializa o Landbot ao interagir pela primeira vez com a página (mouseover ou toque).
2. Carrega o script necessário do Landbot de forma assíncrona.
3. Configura o Landbot Popup com um URL de configuração específica.
4. Garante que o Landbot seja carregado apenas uma vez por sessão.
 */

window.addEventListener("mouseover", initLandbot, { once: true });
// Adiciona um evento para inicializar o Landbot quando o mouse passa sobre a janela pela primeira vez.

window.addEventListener("touchstart", initLandbot, { once: true });
// Adiciona um evento para inicializar o Landbot quando ocorre o primeiro toque em dispositivos móveis.

let myLandbot;
// Variável para armazenar a instância do Landbot, garantindo que não seja inicializado mais de uma vez.

function initLandbot() {
  // Função responsável por inicializar o Landbot.

  if (!myLandbot) {
    // Verifica se o Landbot já foi inicializado para evitar carregamentos repetidos.

    const s = document.createElement("script");
    // Cria um elemento <script> para carregar o script do Landbot dinamicamente.

    s.type = "module";
    // Define o tipo do script como módulo para compatibilidade com ES6+.

    s.async = true;
    // Garante que o script será carregado de forma assíncrona, sem bloquear o restante do carregamento.

    s.addEventListener("load", function () {
      // Adiciona um evento para configurar o Landbot após o carregamento do script.

      myLandbot = new Landbot.Livechat({
        // Inicializa o Landbot Live Chat com a URL de configuração.
        configUrl:
          "https://storage.googleapis.com/landbot.online/v3/H-2748028-24OJ9SS10M0LOBB3/index.json",
      });
    });

    s.src = "https://cdn.landbot.io/landbot-3/landbot-3.0.0.mjs";
    // Define o endereço do script do Landbot para carregamento.

    const x = document.getElementsByTagName("script")[0];
    // Obtém o primeiro script existente na página para inserir o novo script antes dele.

    x.parentNode.insertBefore(s, x);
    // Insere o script do Landbot na página logo antes do primeiro script existente.
  }
}
