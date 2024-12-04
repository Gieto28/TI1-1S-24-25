// Helper function to load an external HTML file and insert it into a placeholder
function loadComponent(selector, url) {
    fetch(url)
      .then(response => response.text())
      .then(data => {
        document.querySelector(selector).innerHTML = data;
      })
      .catch(error => console.error('Error loading component:', error));
}
  