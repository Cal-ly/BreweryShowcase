import api from './api';

const beverageService = {
    getBeverages: () => api.get('/api/beverages'),
    createBeverage: (data) => api.post('/api/beverages', data),
    updateBeverage: (id, data) => api.put(`/api/beverages/${id}`, data),
    deleteBeverage: (id) => api.delete(`/api/beverages/${id}`)
};

export default beverageService;
