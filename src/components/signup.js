import React, { useEffect, useState } from 'react';
import './signup.css';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
function SignUp() {

  
  let navigate = useNavigate();
  let [formData,SetformData]= useState({
    email:'',
    password:'',
    userName:''
  })
  let [errorMessage, setErrorMessage]= useState('');
  const [showPassword, setShowPassword] = useState(false);
  useEffect(()=>{
    handleInputChange({});
  },[])
  const handleInputChange=(event)=>{
    const { name, value } = event.target || {}
    SetformData({...formData,[name]:value})
  }
  async function handleSignUpSubmit(event){
    event.preventDefault();
    try{if (!formData.password.trim())
      return setErrorMessage("Please enter password");
    if (!formData.email.trim()) return setErrorMessage("Please enter email");
      let response = await axios.post('http://localhost:4000/signup',formData);
      let token = response.data["token"];
      localStorage.setItem('jwtToken', token);
      return navigate('/login');
    }catch (err) {
      if (err.response && err.response.status === 409) {
        setErrorMessage('This email is already registered. Please use a different email.');
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  }
  
  return (
    <div className='container'>
      <div className='leftDiv'>
        <div className='textDiv'>
          Rev up your ride with SpeedyShine – where every car gets a VIP treatment!
        </div>
        <hr className="line" />
      </div>
      <div className='rightDiv'>
        <div className='userInputDiv'>
          <form onSubmit = {handleSignUpSubmit}>
          <div className='inputAndLabel'>
          <label className="emailLabel">Email address</label>
          <input type="email" className="userInput" name="email" value={formData.email} onChange={handleInputChange}/>
          </div>
          <div className='inputAndLabel'>
          <label className="userNameLabel">User Name</label>
          <input type="text" className="userInput" name="userName" value={formData.userName} onChange={handleInputChange}/>
          </div>
          <div className='inputAndLabel'>
          <label className="passwordLabel" value={formData.password}>Password</label>
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
          {errorMessage && <p className='="error-message'>{errorMessage}</p>}
          <div className='inputAndLabel'>
          <button type="submit" className="btn btn-primary btn-block mb-4">Sign Up</button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}


export default SignUp;
