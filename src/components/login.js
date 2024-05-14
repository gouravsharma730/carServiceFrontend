import React from "react";
import { useState } from "react";
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
        "https://car-service-backend-psi.vercel.app/login",
        // "http://localhost:4000/login",
        formData,
        {
          withCredentials: true,
        }
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
      return console.log(err);
    }
  };

  return (
    <div className={styles.centered}>
      <div className={styles.formDiv}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formOutline}>
            <input
              placeholder="Email address"
              type="email"
              id="form2Example1"
              className={styles.inputHolder}
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formOutline}>
            <div className={styles.passwordInput}>
              <input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                id="form2Example2"
                className={styles.inputHolder}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              /> &nbsp; 
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  size="lg"
                />
              </span>
            </div>
          </div>
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
          <div className={styles.row}>
            <div className={styles.formCheck}>
              <label className={styles.formCheck} htmlFor="form2Example31">
                {" "}
                Remember&nbsp;me
              </label>
              <input
                type="checkbox"
                value=""
                id="form2Example31"
                defaultChecked
              />
            </div>

            <div className={"styles.col"}>
              <a href="/ForgetPassword">Forgot password?</a>
            </div>
          </div>
          <button type="submit" className={styles.btn}>
            Sign in
          </button>
          <div className={styles.textCenter}>
            <p>
              Not a member?{" "}
              <button type="button" className={styles.btn}>
                {" "}
                <a href="/signup">Register</a>
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
