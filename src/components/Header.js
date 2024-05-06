import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

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
        <header className={styles.header}>
            <div>
                <h2><a href="/">SpeedyShine</a></h2>
            </div>
            <nav>
                <ul className={styles.navLinks}>
                    {isLoggedIn ? (
                        <div>
                            <li><Link to="/home">Profile</Link></li>
                            <li><Link to="/login" onClick={handleLogout}>Logout</Link></li>
                        </div>
                    ):''}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
