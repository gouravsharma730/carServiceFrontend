import React, { useEffect, useState } from "react";
import styles from "./signup.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function SignUp() {
  let navigate = useNavigate();
  let [formData, setFormData] = useState({
    email: "",
    password: "",
    userName: "",
  });
  let [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    handleInputChange({});
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target || {};
    setFormData({ ...formData, [name]: value });
  };

  async function handleSignUpSubmit(event) {
    event.preventDefault();
    try {
      if (!formData.password.trim())
        return setErrorMessage("Please enter password");
      if (!formData.email.trim()) return setErrorMessage("Please enter email");

      let response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/signup`,
        formData
      );

      let token = response.data["token"];
      localStorage.setItem("jwtToken", token);
      return navigate("/login");
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setErrorMessage(
          "This email is already registered. Please use a different email."
        );
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftDiv}>
        <div className={styles.textDiv}>
          Rev up your ride with <span>SpeedyShine</span> — where every car gets VIP treatment!
        </div>
        <hr className={styles.line} />
      </div>
      <div className={styles.rightDiv}>
        <form onSubmit={handleSignUpSubmit}>
          <div className={styles.inputAndLabel}>
            <input
              type="text"
              className={styles.userInput}
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              placeholder="Username"
              required
            />
          </div>
          <div className={styles.inputAndLabel}>
            <input
              type="email"
              className={styles.userInput}
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
            />
          </div>
          <div className={styles.inputAndLabel}>
            <input
              type={showPassword ? "text" : "password"}
              className={styles.userInput}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
            />
            <span
              className={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </span>
          </div>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <div className={styles.inputSubmit}>
            <button type="submit" className={styles.btn}>
              Sign Up
            </button>
          </div>
          <div className={styles.sendToLogin}>
            <span>Already have an account?</span>
            <a href="/login" className={styles.loginLink}>Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
