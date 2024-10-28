// src/services/authService.js

// import api from './api';

// const authService = {
//     // Login function sends credentials to the server and stores token in localStorage
//     login: async (email, password) => {
//         const response = await api.post('/api/auth/login', { email, password });
//         const token = response.data.token;
//         localStorage.setItem('token', token);
//         return token;
//     },

//     // Logout function clears the token from localStorage
//     logout: () => {
//         localStorage.removeItem('token');
//     },

//     // Check if a user is currently authenticated
//     isAuthenticated: () => {
//         return !!localStorage.getItem('token');
//     }
// };

// export default authService;

// src/services/authService.js

const authService = {
    // Simulate a login function that doesn't interact with the API
    login: async (email, password) => {
        // Simulate storing a "mock" token or simply set a flag in localStorage
        localStorage.setItem('mockAuth', 'true');
    },

    // Mock logout to clear the "mock" authentication flag
    logout: () => {
        localStorage.removeItem('mockAuth');
    },

    // Check if "mockAuth" flag exists in localStorage
    isAuthenticated: () => {
        return localStorage.getItem('mockAuth') === 'true';
    }
};

export default authService;
