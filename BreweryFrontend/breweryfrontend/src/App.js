import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Beverages from './pages/Beverages';
import Navbar from './components/Navbar';
import AnalyticsDashboard from './pages/AnalyticsDashboard';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/beverages" element={<Beverages />} />
                <Route path="/customer" element={<CustomerDashboard />} />
                <Route path="/analytics" element={<AnalyticsDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;

