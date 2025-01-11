export const setupVideoOverlay = (videoId, overlayId) => {
    const video = document.getElementById(videoId);
    const overlay = document.getElementById(overlayId);
    const countdownElement = document.getElementById('countdown');

    // Add an event listener for the end of the video
    video.addEventListener('ended', () => {
      overlay.classList.remove('d-none'); // Show the overlay immediately
      video.pause(); // Pause the video immediately
      startCountdown(countdownElement, video, overlay); // Start the countdown immediately
    });

    // Function to start the countdown and restart the video after 5 seconds
    function startCountdown(countdownElement, videoElement, overlayElement) {
      let countdown = 5; // Countdown from 5 seconds

      // Ensure the countdown is displayed immediately with "Next Video in ..."
      countdownElement.textContent = `Next video in ${countdown}`;

      const countdownInterval = setInterval(() => {
        countdownElement.textContent = `Next video in ${countdown}`; // Update the countdown text
        countdown--;

        if (countdown < 0) {
          clearInterval(countdownInterval); // Stop the countdown
          videoElement.currentTime = 0; // Reset the video to the beginning
          videoElement.play(); // Play the video again
          overlayElement.classList.add('d-none'); // Hide the overlay
        }
      }, 1000); // Update the countdown every 1 second
    }
};
