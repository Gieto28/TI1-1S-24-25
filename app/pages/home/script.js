/*
Este ficheiro: Gestão de Sobreposição de Vídeo com Contagem Decrescente

Descrição:
Este ficheiro JavaScript é responsável por gerir a sobreposição de um vídeo no fim da sua execução. 
Inclui funcionalidades para exibir uma sobreposição, iniciar uma contagem decrescente e reiniciar o vídeo automaticamente.
*/

export const setupVideoOverlay = (videoId, overlayId) => {
  const video = document.getElementById(videoId);
  const overlay = document.getElementById(overlayId);
  const countdownElement = document.getElementById('countdown');

  // Adiciona um event listener para o fim do vídeo
  video.addEventListener('ended', () => {
    overlay.classList.remove('d-none'); // Mostra a sobreposição imediatamente
    video.pause(); // Pausa o vídeo imediatamente
    startCountdown(countdownElement, video, overlay); // Inicia a contagem decrescente
  });

  // Função para iniciar a contagem decrescente e reiniciar o vídeo após 5 segundos
  function startCountdown(countdownElement, videoElement, overlayElement) {
    let countdown = 5; // Contagem decrescente de 5 segundos

    // Exibe imediatamente "Next video in ..."
    countdownElement.textContent = `Next video in ${countdown}`;

    const countdownInterval = setInterval(() => {
      countdownElement.textContent = `Next video in ${countdown}`; // Atualiza o texto da contagem decrescente
      countdown--;

      if (countdown < 0) {
        clearInterval(countdownInterval); // Para a contagem decrescente
        videoElement.currentTime = 0; // Reposição do vídeo para o início
        videoElement.play(); // Reproduz o vídeo novamente
        overlayElement.classList.add('d-none'); // Esconde a sobreposição
      }
    }, 1000); // Atualiza a contagem a cada 1 segundo
  }
};
