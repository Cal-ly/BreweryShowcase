// src/services/analyticsService.js

import api from './api';

const analyticsService = {
    getTopBeverages: () => api.get('/api/analytics/top-beverages'),
    getTotalSales: () => api.get('/api/analytics/total-sales'),
    getTopCustomers: () => api.get('/api/analytics/top-customers'),
    getMonthlyRevenue: () => api.get('/api/analytics/monthly-revenue'),
    getSalesBySize: () => api.get('/api/analytics/sales-by-size')
};

export default analyticsService;
