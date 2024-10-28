// src/services/customerService.js

import api from './api';

const customerService = {
    // Retrieve all customers
    getCustomers: () => api.get('/api/customers'),

    // Retrieve a single customer by ID
    getCustomerById: (id) => api.get(`/api/customers/${id}`),

    // Create a new customer
    createCustomer: (data) => api.post('/api/customers', data),

    // Update an existing customer by ID
    updateCustomer: (id, data) => api.put(`/api/customers/${id}`, data),

    // Delete a customer by ID
    deleteCustomer: (id) => api.delete(`/api/customers/${id}`)
};

export default customerService;
