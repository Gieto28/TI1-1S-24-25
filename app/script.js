import {loadComponent} from "../app/utils/components.js"
import {intializeFeatureFlags} from "../app/utils/config.js"

(() => {
    loadComponent("header", "/app/components/header/index.html")
    loadComponent("footer", "/app/components/footer/index.html")
    
    intializeFeatureFlags();
})();