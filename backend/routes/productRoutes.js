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

// Get products by category
router.get('/category/:category', getProductsByCategory);

// Get single product by ID
router.get('/:id', getProductById);

// Get all products (this should be last to avoid conflicts with other routes)
router.get('/', getProducts);

// In backend/routes/productRoutes.js
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ 
        success: false, 
        message: 'Search query is required'
      });
    }
    
    // Search products using a case-insensitive regex
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ]
    });
    
    res.json({ 
      success: true, 
      data: products
    });
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error'
    });
  }
});

export default router;