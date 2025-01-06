/*
This file: Cart management functionalities.

Description:
This JavaScript file handles cart management functionalities.
It allows for adding, removing, and updating items in the cart, as well as calculating totals and applying discounts. 
The cart data is stored in localStorage, and updates are reflected through dynamic content rendering. Toast notifications and order details are updated accordingly.
*/

// Importing utility functions and components for cart management, notifications, and storage handling
import { updateCart } from "../components/header/script.js";
import { showToast } from "../components/toast/script.js";
import { updateOrderDetails } from "../pages/checkout/script.js";
import { storageHandler } from "./storage.js";

// Adds an item to the cart, either incrementing its quantity if it's already in the cart, or adding it if not
export const addItemToCart = (item) => {
  const cart = storageHandler.getItem("cart") || [];

  // Checks if the item already exists in the cart
  const itemInCart = cart.find((i) => i.id === item.id);

  // If the item exists, increment its quantity
  if (itemInCart) {
    itemInCart.quantity++;
  } else {
    // If the item doesn't exist, add it with a quantity of 1
    cart.push({ ...item, quantity: 1 });
  }

  storageHandler.setItem("cart", cart); // Updates the cart in localStorage

  showToast("Item added to cart", item.name); // Displays a toast message

  updateEverythingBasedOnCart(); // Updates cart UI and order details
};

// Removes an item from the cart based on its ID
export const removeItemFromCart = (id) => {
  const cart = storageHandler.getItem("cart") || [];

  // Filters out the item to be removed from the cart
  const filteredCart = cart.filter((i) => i.id !== +id);

  storageHandler.setItem("cart", filteredCart); // Updates the cart in localStorage

  updateEverythingBasedOnCart(); // Updates cart UI and order details
};

// Decrements the quantity of an item in the cart, removing it if the quantity reaches zero
export const decrementItemQuantity = (id) => {
  const cart = storageHandler.getItem("cart") || [];

  // Finds the item in the cart
  const item = cart.find((i) => i.id === +id);

  // Decrements the quantity of the item
  item.quantity--;

  storageHandler.setItem("cart", cart); // Updates the cart in localStorage

  // If the quantity becomes zero, removes the item from the cart
  if (+item.quantity === 0) {
    removeItemFromCart(id);
    return;
  }

  updateEverythingBasedOnCart(); // Updates cart UI and order details
};

// Increments the quantity of an item in the cart
export const incrementItemQuantity = (id) => {
  const cart = storageHandler.getItem("cart") || [];

  // Finds the item in the cart
  const item = cart.find((i) => +i.id === +id);

  // Increments the quantity of the item
  item.quantity++;

  storageHandler.setItem("cart", cart); // Updates the cart in localStorage

  updateEverythingBasedOnCart(); // Updates cart UI and order details
};

// Calculates the discounted price of an item
export const getDiscountedPrice = (price, discount) => {
  // If no discount is applied, return the original price
  if (!discount) {
    return price;
  }

  // Calculates the price after applying the discount
  return +price - ((+price * discount) / 100).toFixed(2);
};

// Calculates the total price of all items in the cart
export const getCartTotal = () => {
  const cart = storageHandler.getItem("cart") || [];

  // Reduces the cart items to a total amount by considering the quantity and price of each item
  return cart.reduce((total, item) => {
    const normalizedPrice = Number(item.price.replace(",", ".")); // Converts price string to number
    const quantity = Number(item.quantity);

    return total + normalizedPrice * quantity;
  }, 0);
};

// Calculates the total quantity of items in the cart
export const getCartAmmount = () => {
  const cart = storageHandler.getItem("cart") || [];

  // Sums the quantities of all items in the cart
  return cart.reduce((acc, item) => acc + item.quantity, 0);
};

// Removes all items from the cart
export const removeAllItemsFromCart = () => {
  storageHandler.removeItem("cart"); // Removes the cart data from localStorage

  updateEverythingBasedOnCart(); // Updates cart UI and order details
};

// Helper function to update the cart UI and order details based on the current cart state
const updateEverythingBasedOnCart = () => {
  updateCart(); // Updates the cart UI
  updateOrderDetails(); // Updates the order details
};
