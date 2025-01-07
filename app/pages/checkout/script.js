// Import required functions

import { showToast } from "../../components/toast/script.js";
import {
  decrementItemQuantity,
  getCartTotal,
  incrementItemQuantity,
  removeAllItemsFromCart,
  removeItemFromCart,
} from "../../utils/shop.js";
import { storageHandler } from "../../utils/storage.js";

export const loadCheckoutContent = () => {
  populateCart();

  const checkoutButton = document.getElementById("checkoutButton");

  checkoutButton.addEventListener("click", checkout);
};

// Function to populate the cart dynamically
export const populateCart = () => {
  const cart = storageHandler.getItem("cart") || [];

  const cartContainer = document.querySelector(".col-12.col-md-8");

  // Clear existing items
  cartContainer.innerHTML = "";

  // Populate with items
  cart.forEach((item) => {
    const itemCard = document.createElement("div");
    itemCard.className = "card mb-4 shadow-sm border-light";
    itemCard.innerHTML = `
      <div class="row g-0">
        <div class="col-md-4 d-flex justify-content-center align-items-center">
          <img src="${
            item.image || "https://via.placeholder.com/150"
          }" class="img-fluid rounded" alt="${item.name}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title fw-bold text-center">${item.name}</h5>
            <p class="text-muted small text-center">${
              item.description || "No description available"
            }</p>
            <div class="d-flex justify-content-center align-items-center mb-3">
              <button class="btn btn-outline-secondary btn-sm me-2" data-action="decrement" data-id="${
                item.id
              }">-</button>
              <input type="number" class="form-control text-center" disabled value="${
                item.quantity
              }" min="1">
              <button class="btn btn-outline-secondary btn-sm ms-2" data-action="increment" data-id="${
                item.id
              }">+</button>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <p class="fw-bold mb-0">${item.price} €</p>
              <button class="btn btn-outline-danger btn-sm" data-action="remove" data-id="${
                item.id
              }">
                <i class="bi bi-trash"></i> Remove
              </button>
            </div>
          </div>
        </div>
      </div>`;

    cartContainer.appendChild(itemCard);
  });

  if (cart.length === 0) {
    cartContainer.innerHTML =
      "<p class='text-muted text-center'>Your cart is empty.</p>";
  }

  updateOrderDetails();
};

// Function to update the order details
export const updateOrderDetails = () => {
  // Find all elements with the class "fw-bold"
  const boldElements = document.querySelectorAll(".fw-bold");

  // Locate the element containing the specific text "Est. Total:"
  const totalElement = Array.from(boldElements).find(
    (el) => el.textContent.trim() === "Est. Total:"
  );

  if (!totalElement) {
    console.error("Could not find the 'Est. Total:' element.");
    return;
  }

  const totalValueElement = totalElement.nextElementSibling;

  // Similarly, find the "Price:" element
  const priceElements = document.querySelectorAll("p");
  const priceElement = Array.from(priceElements).find(
    (el) => el.textContent.trim() === "Price:"
  );

  if (!priceElement) {
    console.error("Could not find the 'Price:' element.");
    return;
  }

  const shippingValue = document.getElementById("shippingValue");

  const priceValueElement = priceElement.nextElementSibling;

  const cartTotal = getCartTotal();

  // Update the text content with calculated values
  priceValueElement.textContent = `${cartTotal.toLocaleString("en", {
    minimumFractionDigits: 2,
  })} €`;

  shippingValue.innerHTML =
    (cartTotal ? 14 : 0).toLocaleString("en", {
      minimumFractionDigits: 2,
    }) + " €";

  totalValueElement.textContent = `${(
    cartTotal + (+cartTotal ? 14 : 0)
  ).toLocaleString("en", { minimumFractionDigits: 2 })} €`; // Assuming a fixed shipping cost of 14 €
};

// Event listener for cart actions
document.addEventListener("click", (e) => {
  const action = e.target.dataset.action;
  const id = e.target.dataset.id;

  if (!action || !id) return;

  switch (action) {
    case "remove":
      removeItemFromCart(id);
      break;
    case "decrement":
      decrementItemQuantity(id);
      break;
    case "increment":
      incrementItemQuantity(id);
      break;
  }

  populateCart(); // Re-render the cart after any action
});

function checkout() {
  //obtem o carrinho do localStorage
  const cart = storageHandler.getItem("cart") || [];

  if (cart.length === 0) {
    showToast("Checkout failed!", "Your cart is empty.");
    return;
  }

  showToast("Checkout success!", "You'll soon receive a confirmation email.");

  removeAllItemsFromCart();

  populateCart();
}
