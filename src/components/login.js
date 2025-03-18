import React, { useState } from "react";
import styles from "./login.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const [formData, SetFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    SetFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.password.trim())
      return setErrorMessage("Please enter password");
    if (!formData.email.trim()) return setErrorMessage("Please enter email");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/login`,
        formData,
        { withCredentials: true }
      );
      let token = response.data["token"];
      localStorage.setItem("jwtToken", token);
      let res = response.data["message"];
      if (res === "User not found.") setErrorMessage("User not found.");
      else if (res === "Incorrect password")
        setErrorMessage("Incorrect Username or password");
      else {
        const profileCheck = response.data["message"][0]["userName"];
        if (profileCheck === "Admin") window.location.href = "/AdminDashboard";
        else window.location.href = "/home";
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.rightDiv}>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputAndLabel}>
            <input
              placeholder="Email address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={styles.userInput}
            />
          </div>
          <div className={styles.inputAndLabel}>
            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={styles.userInput}
            />
            <span
              className={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </span>
          </div>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <div className={styles.row}>
            <div className={styles.formCheck}>
              <input
                type="checkbox"
                id="rememberMe"
                defaultChecked
                className={styles.checkbox}
              />
              <label htmlFor="rememberMe" >Remember me</label>
            </div>
            <a href="/ForgetPassword" className={styles.forgotPassword}>
              Forgot password?
            </a>
          </div>
          <button type="submit" className={styles.btn}>
            Sign in
          </button>
          <div className={styles.sendToLogin}>
            Not a member?{" "}
            <a href="/signup" className={styles.loginLink}>
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
