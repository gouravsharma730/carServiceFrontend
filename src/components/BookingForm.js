import React, { useState } from 'react';
import './BookingForm.css';
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
    let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWQzZWNhNDhjY2RhMjJmNGNkZDljNCIsInVzZXJOYW1lIjoiZ291cmF2IHNoYXJtYSIsImVtYWlsIjoiZ291cmF2c2hhcm1hNzMwQGdtYWlsLmNvbSIsImlhdCI6MTcxMzE5NzE0MSwiZXhwIjoxNzE1NzE3MTQxfQ.S2SmfWOVhp6gSnRs954d6kMeXRHq2YOQ6LTEpfAZ_5M";
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const sendData = await axios.post('https://car-service-backend-psi.vercel.app/newBooking',bookingDetails);
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
    <div className="booking-form-container">
      <h2>Make New Booking</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Car Number: &nbsp;
          <input type="text" value={carNumber} onChange={(e) => setCarNumber(e.target.value)} />
        </label>
        <label>
          Car Model: &nbsp;
          <input type="text" value={carModel} onChange={(e) => setCarModel(e.target.value)} />
        </label>
        
        <label>
          Address: &nbsp;
          <input type="text" value={address} onChange={(e) => SetAddress(e.target.value)} />
        </label>
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
