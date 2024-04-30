import  React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';


import Landing from "./components/Landing";
import Signup from "./components/signup";
import Login from "./components/login";
import Home from "./components/HomePage";
import ProfileEdit from "./components/ProfileEdit";
import Booking from "./components/Booking";
import Review from "./components/AllReviews";
import AdminDashboard from"./components/AdminDashboard";
import Header from './components/Header';
import Footer from './components/Footer';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from "./components/ResetPassword";
import BookingForm from "./components/BookingForm";

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const App =()=>{
  return(
    <Router>
      <div>
        <Header></Header>
        <Routes>
        <Route path="/"  element={<Landing />} />
        <Route path ="/signup" element={<Signup/>} />
        <Route path ="/login" element={<Login/>} />
        <Route path ="/home" element={<Home/>} />
        <Route path ="/profile/edit" element={<ProfileEdit/>} />
        <Route path ="/booking" element={<Booking/>} />
        <Route path ="/reviews" element={<Review/>} />
        {/* <Route path ="/admin" element={<AdminLogin/>} /> */}
        <Route path ="/AdminDashboard" element={<AdminDashboard/>} />
        <Route path ="/forgetpassword" element={<ForgetPassword/>}/>
        <Route path ="/resetpassword" element={<ResetPassword/>}/>
        <Route path ="/newBooking" element={<BookingForm/>}/>

      </Routes>
      </div>
      <Footer></Footer>
    </Router>
  )
}

export default App;