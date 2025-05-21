import express from 'express';
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
} from '../controllers/orderController.js';
import { auth } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router();

router.use(auth);

// User routes
router.route('/my-orders').get(getMyOrders);
router.route('/').post(createOrder);
router.route('/:id').get(getOrderById);
router.route('/:id/pay').put(updateOrderToPaid);

// Admin routes
router.route('/').get(isAdmin, getOrders);
router.route('/:id/deliver').put(isAdmin, updateOrderToDelivered);

export default router;
