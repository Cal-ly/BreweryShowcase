// src/services/orderService.js

import api from './api';

const orderService = {
    // Retrieve all orders (Admin functionality)
    getOrders: () => api.get('/api/orders'),

    // Retrieve a specific order by ID
    getOrderById: (id) => api.get(`/api/orders/${id}`),

    // Place a new order for the authenticated customer
    placeOrder: (data) => api.post('/api/orders', data),

    // Retrieve order history for the authenticated customer
    getMyOrders: () => api.get('/api/orders/my-orders'),

    // Update an order status (Admin functionality)
    updateOrderStatus: (id, status) => api.put(`/api/orders/${id}/status`, { status })
};

export default orderService;
