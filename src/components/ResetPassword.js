import React, { useState } from "react";
import styles from './ResetPassword.module.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setPassword('');
      setConfirmPassword('');
      return;
    } 
    
    if (!password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND}/resetpassword`, { password });
      let token = response.data.token;
      localStorage.setItem('jwtToken', token);

      if (response.status === 404) setError('User not found!');
      else if (response.status === 500) setError('Internal server error, please try again later.');
      else {
        setError('Password successfully changed.');
        navigate('/login');
      }
    } catch (err) {
      setError("An error occurred, please try again later.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Reset Password</h2>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
