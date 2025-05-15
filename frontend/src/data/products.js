// frontend/src/data/products.js
import { getProducts } from '../services/productService';

// Create a loading mechanism
let productsLoaded = false;
let loadingPromise = null;

// Export the products array
export const products = [];

// Function to load products
export const loadProducts = () => {
  if (productsLoaded) {
    return Promise.resolve(products);
  }
  
  if (!loadingPromise) {
    loadingPromise = new Promise((resolve) => {
      // Use .then() instead of async/await inside the Promise constructor
      getProducts()
        .then(fetchedProducts => {
          // Clear the current array and add all fetched products
          products.length = 0;
          products.push(...fetchedProducts);
          
          productsLoaded = true;
          resolve(products);
        })
        .catch(error => {
          console.error('Error loading products:', error);
          resolve([]);
        });
    });
  }
  
  return loadingPromise;
};

// Start loading products immediately
loadProducts();