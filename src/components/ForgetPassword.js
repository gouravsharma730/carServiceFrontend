import React, { useState } from "react";
import styles from './ForgetPassword.module.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const navigate = useNavigate();
  let [email, SetEmail] = useState("");
  let [errorMessage, setErrorMessage] = useState("");

  function handleIputChange(event) {
    const email = event.target.value;
    SetEmail(email);
  }
  async function handleSubmit(event) {
    event.preventDefault();
    try{
        let response = await axios.post("https://car-service-backend-psi.vercel.app/forgetpassword",{email},{
          withCredentials: true
        });
        let token = response.data["token"];
      localStorage.setItem('jwtToken', token);
        if (response.data.error) {
            setErrorMessage(response.data.error);
          }
          else{
            setErrorMessage('Please check your email.')

          }
    }catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage("An error occurred while processing your request.");
        }
      }

  }
  return (
    <div>
      <div className={styles.centeredForm}>
        <div className={styles.formContainer}>
          <p>Please enter your registered email address.</p>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputAndButton}>
              <input
                type="email"
                placeholder="Enter you email here"
                value={email}
                onChange={handleIputChange}
              />
              <button type="submit" className={'styles.btn btn-primary btn-block mb-4'}>
                Submit
              </button>
            </div>
          </form>
          {errorMessage && <p className={"styles.error-message"}>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
