import axios from 'axios';

const api = axios.create({
    baseURL: 'https://breweryapi2024.azurewebsites.net',
    headers: {
        'Content-Type': 'application/json',
    },
});

// // Add an interceptor to include the JWT token in the Authorization header
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// // A response interceptor to handle common errors globally
// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response) {
//             // Handle 401 Unauthorized error globally
//             if (error.response.status === 401) {
//                 console.warn("Unauthorized access - perhaps token expired.");
//                 // Optional: Redirect to login or logout user
//                 // window.location.href = "/login";
//             }

//             // Handle other status codes (to be implemented..)
//             if (error.response.status === 403) {
//                 console.warn("Forbidden - you don’t have permission for this action.");
//             }
//             // Log any other error messages
//             console.error("API error:", error.response.data.message || "Unknown error occurred");
//         } else {
//             console.error("Network error:", error.message || "Unknown network error occurred");
//         }

//         return Promise.reject(error);
//     }
// );

export default api;