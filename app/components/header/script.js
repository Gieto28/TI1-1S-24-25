import { loadComponent } from "../../utils/components.js";

export function loadPage(pageName) {
  const pageUrl = `../app/pages/${pageName}/index.html`;
  loadComponent('body', pageUrl);
}

window.loadPage = loadPage;