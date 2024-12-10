import { storageHandler } from "../utils/storage.js";

// Helper function to load an external HTML file and insert it into a placeholder
export function loadComponent(selector, url) {
    fetch(url)
      .then(response => response.text())
      .then(data => {
        document.getElementById(selector).innerHTML = data;
      })
      .catch(error => console.error('Error loading component:', error));
}

// Function to dynamically load the components of each page
export function loadPage(pageName) {
  //write in local storage
  storageHandler.setItem("currentPage", pageName)
  const pageUrl = `/app/pages/${pageName}/index.html`;
  loadComponent('body', pageUrl);
}
  