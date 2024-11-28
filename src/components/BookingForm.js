import React, { useState } from 'react';
import styles from './BookingForm.module.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";



const BookingForm = () => {
  const navigate = useNavigate();
  const [carNumber, setCarNumber] = useState('');
  const [carModel, setCarModel] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [address, SetAddress] = useState('');
  const [dateOfPickUp, setDateOfPickUp] = useState('');

  const handleSubmit = async (e) => {
    try{e.preventDefault();
    const bookingDetails = {
      carDetails: {
        carNumber,
        carModel,
        serviceType,
      },
      address,
      dateOfPickUp,
    };
    bookingDetails.bookingTime = new Date().toLocaleDateString();
    const sendData = await axios.post(`${process.env.REACT_APP_BACKEND}/newBooking`);
    if(sendData) {
    setTimeout(function(){
        navigate('/home');
    }, 5000);    
}
alert("We've received your request and are in the process of scheduling your appointment.");
}catch(err){
    alert("Something went wrong,Please try after sometime!")
}
  };

  return (
    <div className={styles.bookingFormContainer}>
      <h2>Make New Booking</h2>
      <form onSubmit={handleSubmit}>
          <input placeholder='Car Number' type="text" value={carNumber} onChange={(e) => setCarNumber(e.target.value)} />
          <input placeholder='Car Model' type="text" value={carModel} onChange={(e) => setCarModel(e.target.value)} />
          <input placeholder='Address' type="text" value={address} onChange={(e) => SetAddress(e.target.value)} />
          <label>
          Date of Pick-Up: &nbsp;
          <input type="date" value={dateOfPickUp} onChange={(e) => setDateOfPickUp(e.target.value)} />
        </label>
        <label>
        Service Type: &nbsp;
          <select value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
            <option value="">Select Service Type</option>
            <option value="Basic Wash">Basic Wash</option>
            <option value="Standard Wash">Standard Wash</option>
            <option value="Deluxe Wash">Deluxe Wash</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BookingForm;
