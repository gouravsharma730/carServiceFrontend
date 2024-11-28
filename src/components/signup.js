import React, { useEffect, useState } from "react";
import styles from "./signup.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
function SignUp() {
  let navigate = useNavigate();
  let [formData, SetformData] = useState({
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
    SetformData({ ...formData, [name]: value });
  };
  async function handleSignUpSubmit(event) {
    event.preventDefault();
    try {
      if (!formData.password.trim())
        return setErrorMessage("Please enter password");
      if (!formData.email.trim()) return setErrorMessage("Please enter email");
      let response = await axios.post(`${process.env.REACT_APP_BACKEND}/signup`,
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
          Rev up your ride with SpeedyShine where every car gets a VIP
          treatment!
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
            />
          </div>
          <div className={styles.inputAndLabel}>
            {/* <div className={styles.passwordInput}> */}
              <input
                type={showPassword ? "text" : "password"}
                id="form2Example2"
                className={styles.form}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
              />
            {/* </div> */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
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
          <br/>
          <div className={styles.sendToLogin}>
            <h6>Already have an account?</h6>
            <button>
              <a href="/login">Login</a>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
