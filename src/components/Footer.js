// components/Footer.js
import React from 'react';
import styles from './Footer.module.css';
const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div>
                <p>Contact: info@carwashapp.com</p>
            </div>
            <div>
                <p>&copy; 2024 Car Wash App. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
