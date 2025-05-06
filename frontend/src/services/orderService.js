const API_URL = 'http://localhost:5000/api';

export const getOrders = async () => {
    try {
        const response = await fetch(`${API_URL}/orders`);
        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

// get order by id
export const getOrderById = async (orderId) => {
    try {
        const response = await fetch(`${API_URL}/orders/${orderId}`);

        if (!response.ok) {
            throw new Error('Failed to fetch order');
        } 

        return await response.json();
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error;
    }
};

// Later, when user authentication is implemented:
// Get orders for the current user
// export const getMyOrders = async (token) => {
//   try {
//     const response = await fetch(`${API_URL}/orders/myorders`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     });
//     
//     if (!response.ok) {
//       throw new Error('Failed to fetch user orders');
//     }
//     
//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching user orders:', error);
//     throw error;
//   }
// };