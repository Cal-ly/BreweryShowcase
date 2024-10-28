import React, { useState } from 'react';
import api from '../services/api';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            window.location.href = '/customer';  // Redirect based on user role later
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className="form-control mt-3" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-primary mt-3">Login</button>
            </form>
        </div>
    );
}

export default Login;
