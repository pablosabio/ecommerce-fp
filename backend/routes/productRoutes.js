// backend/routes/productRoutes.js
import express from 'express';
import { 
  getProducts, 
  getProductById,
  getProductsByCategory,
  getCategories,
  searchProducts
} from '../controllers/productController.js';

const router = express.Router();

// Get all unique categories
router.get('/categories', getCategories);

// Search products
router.get('/search', searchProducts);

// Get products by category
router.get('/category/:category', getProductsByCategory);

// Get single product by ID
router.get('/:id', getProductById);

// Get all products (this should be last to avoid conflicts with other routes)
router.get('/', getProducts);

export default router;