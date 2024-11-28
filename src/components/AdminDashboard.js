import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AdminDashboard.module.css';
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const [pendingBookings, setPendingBookings] = useState([]);
  const [totalBookings, setTotalBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(process.env.backend);
      setPendingBookings(response.data.message.pendingBookings);
      setTotalBookings(response.data.message.totalBookings);
    };
    fetchData();
  }, []);

  const handleDropDateChange = (bookingId, dropDate) => {
    const updatedBookings = pendingBookings.map(booking =>
      booking._id === bookingId ? { ...booking, dropDate } : booking
    );
    setPendingBookings(updatedBookings);
  };

  const handleResponseChange = async (bookingId, newStatus) => {
    try {const response = await axios.post(`${process.env.REACT_APP_BACKEND}/adminHome`, {
        bookingId,
        newStatus
      });
      alert('One booking confirmed!');
      navigate('/AdminDashboard');
    } catch (error) {
      console.error('Error updating service status:', error);
    }
  };

  return (
    <>
      <div className={styles.box}>
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
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                    <option value="On hold">On hold</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.box}>
        <h2> All bookings</h2>
        <table>
          <thead>
            <tr>
              <th>Car Number</th>
              <th>Address</th>
              <th>Pick-up Date</th>
              <th>Service type</th>
              <th>Response to Service Status</th>
            </tr>
          </thead>
          <tbody>
            {totalBookings.map(booking => (
              <tr key={booking._id}>
                <td>{booking.carDetails.carNumber}</td>
                <td>{booking.address}</td>
                <td>{booking.dateOfPickUp.slice(0, 10)}</td>
                <td>{booking.carDetails.serviceType}</td>
                <td>{booking.serviceStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
            </>
  );
};

export default App;
