Here's the documentation rewritten and expanded in **English** based on your provided structure, project workflow, and folder architecture.

# **TI1-1S-24-25**  
1st Semester 2024/2025 IT Project  

## **Project Overview**  
**Project created by:**  
- Miguel Silva: miguel.angelosilva@my.istec.pt  
- André Fernandes: andre.rodriguesfernandes@my.istec.pt  
- João Eduardo: joao.espada@my.istec.pt  

**Instructor:**  
- Carla Silva  

**Theme:**  
- Barbershop  

## **How to Start the Project**  
To launch the project:  
1. Open the project in **VSCode**.  
2. Use the **Live Server extension** and navigate to the `app` folder.  
3. Alternatively, manually open the `index.html` file in a browser.

---

## **Coding Standards**

### **CSS Class Naming**  
- Follow the pattern: `$fileName` + `_` + `$className`  
  **Examples:**  
  - `footer_container`  
  - `common_border`  
  - `common_text`  

### **JavaScript Variable Declaration**  
- Use `const` wherever the value type doesn't need to change.

### **Folder Structure for Components/Content**  
- Every feature or component must reside within its **own folder**, structured as follows:  
  ```
  folder_name
  ├── index.html  
  ├── script.js  
  ├── styles.css  
  ```

### **Media Storage**  
- Store all **images** and **videos** inside the `assets` folder.

### **Variable Naming Style**  
- Use **camelCase** for all variable and function names.

### **Git Workflow and Standards**  
1. **Commits:**  
   - No commits should be made directly to `main` or `dev`.  
   - New features require separate branches.  
   
2. **Branch Naming Conventions:**  
   - `feat/featureName` → For new features  
   - `fix/fixName` → For bug fixes  
   - `chore/choreName` → For project settings/configurations  

3. **Commit Message Format:**  
   - `feat: brief description of the feature`  
   - `fix: brief description of the fix`  
   - `chore: brief description of the chore`  
   Refer to the [Conventional Commits Specification](https://www.conventionalcommits.org/en/v1.0.0/).

---

## **Project Functionalities (MVP)**  

The project includes the following components:  
- **Header** → A reusable header component.  
- **Carousel** → Interactive image carousel for showcasing services.  
- **Modal** → Popup modals for additional information.  
- **Footer** → Reusable footer component.  
- **Toast Message** → Notification messages for user interactions.

---

## **Architecture Overview**  

### **Folder Structure**
```
app/  
├── assets/  
│   ├── carousel/  
│   ├── doc/  
│   ├── icons/  
│   └── logos/  
│   └── products/  
├── components/  
│   ├── carousel/  
│   ├── footer/  
│   ├── header/  
│   ├── toast/  
├── locales/  
├── pages/  
│   ├── about/  
│   │   ├── index.html  
│   │   └── styles.css  
│   ├── checkout/  
│   │   ├── index.html  
│   │   └── script.js  
│   ├── contact/  
│   ├── home/  
│   └── shop/  
├── utils/  
│   ├── components.js  
│   ├── config.js  
│   ├── shop.js  
│   ├── storage.js  
│   ├── index.html  
│   └── script.js  
├── node_modules/  
├── .env  
├── .gitignore  
├── config.js  
├── package.json  
├── package-lock.json  
└── README.md  
```

### **Key Directories**
1. **assets/**:  
   Stores all **static files** such as images, logos, and icons. Organized into subfolders for better categorization.  

2. **components/**:  
   Contains reusable UI components, each within its folder. Each component has:  
   - `index.html` → HTML template.  
   - `script.js` → JavaScript logic.  

3. **pages/**:  
   Houses individual **page content** for the website. Each page follows the structure:  
   - `index.html` → Content structure.  
   - `styles.css` → Page-specific styles.  
   - `script.js` → Logic for the page.  

4. **utils/**:  
   Shared JavaScript utilities and helper functions used across the project, such as:  
   - API configurations (`config.js`).  
   - Shared storage logic (`storage.js`).  
   - General helper functions (`components.js`).

---

## **Dynamic Content Loading Workflow (SPA Simulation)**  

The project attempts to mimic a **Single Page Application (SPA)** behavior using **Vanilla JavaScript**.  

### **How It Works**
1. **Initial Setup:**  
   - On **page load**, the app identifies the current page name and stores it in `localStorage`.  

2. **Page Component Loading:**  
   - The app dynamically determines the corresponding folder for the requested page and builds the file URL:  
     ```
     const pageUrl = `/app/pages/${pageName}/index.html`;
     ```

3. **Component Fetching:**  
   - The `loadComponent()` function fetches the necessary HTML file dynamically and injects it into the main `<body>` section:  
     ```javascript
     fetch(url)
       .then(response => response.text())
       .then(data => {
         document.getElementById(selector).innerHTML = data;
       })
       .catch(console.error);
     ```

4. **Rendering the Page:**  
   - Once the HTML is loaded, any additional logic specific to that page is executed via pre-defined functions stored in an object like:  
     ```javascript
     const loadPageContent = {
       shop: () => loadShopContent(),
       contact: () => loadContactContent()
     };
     ```

### **Visual Workflow Diagram**  
(Refer to the provided image for a step-by-step breakdown of the dynamic loading process).  

---

## **Project Resources**  

### **Design Tools**  
- **Canva:** [Design link](https://www.canva.com/design/DAGYoE9i2pw/oNgbH23DMkGzBxKv_xYIuA/edit)  

Let me know if you'd like to refine any specific section further!

EmailJS:
https://dashboard.emailjs.com/admin
productions.m.a.works@gmail.com
Password: you wish

Gmail
productions.m.a.works@gmail.com
Password: you wish


