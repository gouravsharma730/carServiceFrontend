import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const [pendingBookings, setPendingBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://car-service-backend-psi.vercel.app/adminHome');
      setPendingBookings(response.data.message);
    };
    fetchData();
  }, []);

  const handleDropDateChange = (bookingId, dropDate) => {
    // Update the local state with the new drop date
    const updatedBookings = pendingBookings.map(booking =>
      booking._id === bookingId ? { ...booking, dropDate } : booking
    );
    setPendingBookings(updatedBookings);
  };

  const handleResponseChange = async (bookingId, newStatus) => {
    try {
      const response = await axios.post('https://car-service-backend-psi.vercel.app/bookingresponse', {
        bookingId,
        newStatus
      });
      console.log(response.data);
      alert('One booking confirmed!');
      navigate('/AdminDashboard');
    } catch (error) {
      console.error('Error updating service status:', error);
    }
  };

  return (
      <div className="box">
        <h2>Awaiting Confirmation</h2>
        <table>
          <thead>
            <tr>
              <th>Car Number</th>
              <th>Address</th>
              <th>Pick-up Date</th>
              <th>Car Drop Date</th>
              <th>Response to Service Status</th>
            </tr>
          </thead>
          <tbody>
            {pendingBookings.map(booking => (
              <tr key={booking._id}>
                <td>{booking.carDetails.carNumber}</td>
                <td>{booking.address}</td>
                <td>{booking.dateOfPickUp.slice(0, 10)}</td>
                <td>
                  <input
                    type="date"
                    value={booking.dropDate || ''}
                    onChange={(e) => handleDropDateChange(booking._id, e.target.value)}
                  />
                </td>
                <td>
                  <select onChange={(e) => handleResponseChange(booking._id, e.target.value)}>
                    <option value="">Choose Service Status</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default App;
