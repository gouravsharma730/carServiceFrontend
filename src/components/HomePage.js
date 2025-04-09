import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./HomePage.module.css";

function App() {
  let [userProfile, setUserProfile] = useState([]);
  let [bookingHistory, setBookingHistory] = useState([]);
  let [showReviewModal, setShowReviewModal] = useState(false);
  let [comment, setComment] = useState("");
  let [errorMessage, setErrorMessage] = useState("");
  let [rating, setRating] = useState(0);
  let [checkServiceStatus, setCheckServiceStatus] = useState(false);

  useEffect(() => {
    getUserProfile();
  }, []);

  async function getUserProfile() {
    try {
      let resForUserAPI = await axios.get(`${process.env.REACT_APP_BACKEND}/home`);
      setUserProfile(resForUserAPI.data.message);
      let resForBookingHistory = await axios.get(`${process.env.REACT_APP_BACKEND}/bookingHistory`);
      setBookingHistory(resForBookingHistory.data.message);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  }

  function displayUserProfile() {
    if (userProfile.length === 0) {
      return <div>Loading...</div>;
    }
    const userName = userProfile[0]["userName"];
    return (
      <div className={styles.userProfile}>
        <h2>Welcome, {userName} 👋</h2>
      </div>
    );
  }

  function handleCloseModal() {
    setShowReviewModal(false);
  }

  

  function handleCommentChange(e) {
    setComment(e.target.value);
  }

  function handleStarClick(selectedRating) {
    setRating(selectedRating);
  }

  async function handleSendComment() {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND}/review`, {
        comment,
        rating,
      });
      alert(response.data.message);
      setComment("");
      setRating(0);
      setShowReviewModal(false);
    } catch (err) {
      setErrorMessage("An error occurred. Please try again.");
    }
  }

  function displayBookingHistory() {
    if (bookingHistory.length === 0) {
      return (
        <div className={styles.noBooking}>
          <button className={styles.primaryButton}>
            <a href="/newbooking">Make New Booking</a>
          </button>
        </div>
      );
    }
    return (
      <div className={styles.tableContainer}>
        <h2 className={styles.sectionTitle}><strong>Booking History</strong></h2>
        <table className={styles.bookingTable}>
          <thead>
            <tr>
              <th>Car Number</th>
              <th>Service Type</th>
              <th>Service Status</th>
              <th>Date of Pickup</th>
            </tr>
          </thead>
          <tbody>
            {bookingHistory.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.carNumber}</td>
                <td>{booking.serviceType}</td>
                <td>{booking.serviceStatus}</td>
                <td>{booking.dateOfPickUp}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.bookingActions}>
          <button className={styles.primaryButton}>
            <a href="/newbooking">Make New Booking</a>
          </button>
          {checkServiceStatus && (
            <button className={styles.reviewButton} onClick={() => setShowReviewModal(true)}>
              Post Review
            </button>
          )}
        </div>
      </div>
    );
  }

  useEffect(() => {
    const hasCompletedBooking = bookingHistory.some(
      (booking) => booking.serviceStatus === "Completed"
    );
    setCheckServiceStatus(hasCompletedBooking);
  }, [bookingHistory]);

  return (
    <div className={styles.mainContainer}>
      {displayUserProfile()}
      <div className={styles.ServicesAndPrice}>
        <div className={styles.pricingBox}>
          <h3>Basic Wash Package</h3>
          <h2>$20</h2>
          <ul className={styles.pricingList}>
            <li>🚗 Exterior hand wash</li>
            <li>🛞 Wheel cleaning</li>
            <li>🧹 Interior vacuuming</li>
            <li>🪟 Windows cleaned inside and out</li>
          </ul>
        </div>
        <div className={styles.pricingBox}>
          <h3>Standard Wash Package</h3>
          <h2>$30</h2>
          <ul className={styles.pricingList}>
            <li>✔️ Includes all services in the Basic Wash Package</li>
            <li>✨ Application of high-quality wax</li>
            <li>🧽 Interior wipe down and dashboard cleaning</li>
          </ul>
        </div>
        <div className={styles.pricingBox}>
          <h3>Deluxe Wash Package</h3>
          <h2>$40</h2>
          <ul className={styles.pricingList}>
            <li>✔️ Includes all services in the Standard Wash Package</li>
            <li>🧴 Deep cleaning of interior surfaces</li>
            <li>🛡️ Application of protectant to interior surfaces</li>
            <li>🍃 Air freshener</li>
          </ul>
        </div>
      </div>

      {displayBookingHistory()}

      {showReviewModal && (
        <div className={styles.modal}>
            <span className={styles.close} onClick={handleCloseModal}>
              &times;
            </span>
          <div className={styles.modalContent}>
            <h2>Post Review</h2>
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Write your comment here..."
            />
            <div className={styles.starContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={star <= rating ? styles.filledStar : styles.star}
                  onClick={() => handleStarClick(star)}
                >
                  &#9733;
                </span>
              ))}
            </div>
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            <button className={styles.primaryButton} onClick={handleSendComment}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
