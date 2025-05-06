// backend/routes/orderRoutes.js
import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// These routes are optional - you can add them if you need them later

// // Create a new order (for testing)
// router.post('/', async (req, res) => {
//   try {
//     const newOrder = new Order(req.body);
//     const savedOrder = await newOrder.save();
//     res.status(201).json(savedOrder);
//   } catch (error) {
//     console.error('Error creating order:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Update order to paid status
// router.put('/:id/pay', async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     
//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }
//     
//     order.isPaid = true;
//     order.paidAt = Date.now();
//     
//     const updatedOrder = await order.save();
//     res.json(updatedOrder);
//   } catch (error) {
//     console.error('Error updating order status:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

export default router;








// // backend/routes/orderRoutes.js
// import express from 'express';
// import {
//   getOrders,
//   getOrderById,
//   createOrder,
//   updateOrderToPaid,
//   updateOrderToDelivered
// } from '../controllers/orderController.js';

// const router = express.Router();

// // Route to get all orders
// router.get('/', getOrders);

// // Route to get a single order by ID
// router.get('/:id', getOrderById);

// // Route to create a new order
// router.post('/', createOrder);

// // Route to update an order to paid status
// router.put('/:id/pay', updateOrderToPaid);

// // Route to update an order to delivered status
// router.put('/:id/deliver', updateOrderToDelivered);

// export default router;