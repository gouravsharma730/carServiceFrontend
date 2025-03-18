import React, { useState } from "react";
import styles from './ForgetPassword.module.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const navigate = useNavigate();
  let [email, SetEmail] = useState("");
  let [errorMessage, setErrorMessage] = useState("");

  function handleInputChange(event) {
    const email = event.target.value;
    SetEmail(email);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!email.trim()) return setErrorMessage("Please enter your email");

    try {
      let response = await axios.post(`${process.env.REACT_APP_BACKEND}/forgetPassword`,
        { email },
        {
          withCredentials: true,
        }
      );
      let token = response.data["token"];
      localStorage.setItem("jwtToken", token);

      if (response.data.error) {
        setErrorMessage(response.data.error);
      } else {
        setErrorMessage("Please check your email.");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("An error occurred while processing your request.");
      }
    }
  }

  return (
    <div className={styles.centeredForm}>
      <div className={styles.formContainer}>
        <h2 className={styles.heading}>Forgot Password</h2>
        <p className={styles.subText}>Please enter your registered email address.</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputAndButton}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleInputChange}
              className={styles.inputHolder}
            />
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </div>
        </form>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <p className={styles.backToLogin}>
          <a href="/login">Back to Login</a>
        </p>
      </div>
    </div>
  );
}

export default ForgetPassword;
