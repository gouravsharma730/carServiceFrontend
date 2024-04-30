import React from "react";
import { useState } from "react";
import "./login.css";
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
        "http://localhost:4000/login",
        formData,{
          withCredentials: true
        }
      );
      let token = response.data["token"];
      localStorage.setItem('jwtToken', token);
      let res = response.data["message"];
      if (res === "User not found.") setErrorMessage("User not found.");
      else if (res === "Incorrect password")
        setErrorMessage("Incorrect Username or password");
      else {
        const profileCheck = response.data['message'][0]['userName'];
        if(profileCheck==='Admin') window.location.href = "/AdminDashboard";
        else window.location.href = "/home";
      }
    } catch (err) {
      return console.log(err);
    }
  };

  return (
    <div className="centered-form">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example1">
              Email address
            </label>
            <input
              type="email"
              id="form2Example1"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example2">
              Password
            </label>
            <div className ="passwordInput">
            <input
              type={showPassword ? "text" : "password"}
              id="form2Example2"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              />
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
              {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="row mb-4">
            <div className="col d-flex justify-content-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="form2Example31"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="form2Example31">
                  {" "}
                  Remember me
                </label>
              </div>
            </div>

            <div className="col">
              <a href="/ForgetPassword">Forgot password?</a>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block mb-4">
            Sign in
          </button>
          <div className="text-center">
            <p>
              Not a member?{" "}
              <button
                type="button"
                className="btn btn-link btn-floating mx-2 my-2 "
              >
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
