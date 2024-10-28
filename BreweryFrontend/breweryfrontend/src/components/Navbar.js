// src/components/Navbar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function Navbar() {
    const navigate = useNavigate();

    // // Check if user is authenticated
    // const isAuthenticated = authService.isAuthenticated();

    // Handle logout
    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
            <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav mr-auto">
                    {/* {isAuthenticated && (
                        <> */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/beverages">Beverages</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/customer">Customer Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">Admin Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/analytics">Analytics</Link>
                            </li>
                        {/* </>
                    )} */}
                </ul>
                <ul className="navbar-nav ml-auto">
                    {/* {!isAuthenticated ? (
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                    ) : ( */}
                        <li className="nav-item">
                            <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                        </li>
                    {/* )} */}
                </ul>
            </div>
            </div>
        </nav>
    );
}

export default Navbar;
