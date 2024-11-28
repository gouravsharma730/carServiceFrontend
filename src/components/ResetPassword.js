import React from "react";
import { useState } from "react";
import styles from './ResetPassword.module.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";


function ResetPassword() {
  const navigate = useNavigate();
  let [error, SetError] = useState("");
  let [password, SetPassword] = useState("");
  let [confirmPassword, SetConfirmPassword] = useState("");
  function handlePasswordChange(event) {
    SetPassword(event.target.value);
  }
  function handleConfirmPasswordChange(event) {
    SetConfirmPassword(event.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword){
      return (
      SetError("Password does not match!"),
      SetPassword(''),
      SetConfirmPassword('')
  )}
    else if(password === '' || confirmPassword === '') {
      return SetError('Please fill in all fields.');
    }else {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND}/resetpassword`,{password});
        let token = response.data["token"];
        localStorage.setItem('jwtToken', token);
        if(response.status===404) SetError('User Not Found!');
        else if(response.status===500)SetError('Internal server error, Please try after sometime.');
        else return SetError('Password successfully changed.');
        navigate('/login');
      } catch (err) {
        return SetError("An Error occur, please try again later.")
      }
    }
    return;
  }
  return (
    <div className={"styles.container"}>
      <h2>Reset Password</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">New Password :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="text"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
