// Helper function to load an external HTML file and insert it into a placeholder
export function loadComponent(selector, url) {
    fetch(url)
      .then(response => response.text())
      .then(data => {
        document.getElementById(selector).innerHTML = data;
      })
      .catch(error => console.error('Error loading component:', error));
}
  