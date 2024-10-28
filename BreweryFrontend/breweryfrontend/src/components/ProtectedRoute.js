// src/components/ProtectedRoute.js

// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import authService from '../services/authService';

// function ProtectedRoute({ children }) {
//     // Check if user is authenticated
//     const isAuthenticated = authService.isAuthenticated();

//     // Redirect to login if not authenticated
//     return isAuthenticated ? children : <Navigate to="/login" />;
// }

// export default ProtectedRoute;


/*
to use protected route, wrap the component you want to protect with the ProtectedRoute component

// In App.js
import ProtectedRoute from './components/ProtectedRoute';

<Routes>
    <Route path="/customer" element={<ProtectedRoute><CustomerDashboard /></ProtectedRoute>} />
    <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
    <Route path="/" element={<Login />} />
</Routes>

*/