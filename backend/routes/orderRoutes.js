// backend/routes/orderRoutes.js
import express from 'express';
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderToPaid,
  updateOrderToDelivered
} from '../controllers/orderController.js';

const router = express.Router();

// Route to get all orders
router.get('/', getOrders);

// Route to get a single order by ID
router.get('/:id', getOrderById);

// Route to create a new order
router.post('/', createOrder);

// Route to update an order to paid status
router.put('/:id/pay', updateOrderToPaid);

// Route to update an order to delivered status
router.put('/:id/deliver', updateOrderToDelivered);

export default router;