import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        setIsLoggedIn(false);
    };

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        setIsLoggedIn(!!jwtToken);
    },[isLoggedIn]);

    return (
        <header className="header">
            <h2><a href="/">SpeedyShine</a></h2>
            <nav>
                <ul className="nav-links">
                    {isLoggedIn ? (
                        <>
                            <li><Link to="/home">Profile</Link></li>
                            <li><Link to="/login" onClick={handleLogout}>Logout</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">Sign Up</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
