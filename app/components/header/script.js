// Updates the number of items in the cart
import { getCartAmmount } from "../../utils/shop.js";

// Function to update the cart count
export const updateCart = () => {
  const cartCount = document.getElementById('cartCount'); // Get the current number of items in the cart
  let currentAmount = parseInt(cartCount.textContent); // Convert the current cart count to an integer
  currentAmount = getCartAmmount(); // Update the count with the current number of items in the cart
  cartCount.textContent = currentAmount; // Set the updated count in the badge
}

// Function to increment the cart count by 1
export const incrementCartAmount = () => {
  const cartCount = document.getElementById('cartCount'); // Get the cart count element
  let currentAmount = parseInt(cartCount.textContent); // Get the current count as an integer
  currentAmount += 1; // Increase the count by 1
  cartCount.textContent = currentAmount; // Update the badge with the new count
};
