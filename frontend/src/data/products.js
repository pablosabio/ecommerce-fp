// frontend/src/data/products.js
import { getProducts } from '../services/productService';

// Default empty products array
let products = [];

// Function to load products from the API
export const loadProducts = async () => {
  try {
    const fetchedProducts = await getProducts();
    products = fetchedProducts;
    return fetchedProducts;
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
};

// Export the products array
export { products };

// Load products when this module is imported
loadProducts();