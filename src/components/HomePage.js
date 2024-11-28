import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./HomePage.module.css";

function App() {
  let [userProfile, SetUserProfile] = useState([]);
  let [bookingHistory, SetBookingHistory] = useState([]);
  let [showReviewModal, SetShowReviewModal] = useState(false);
  let [comment, SetComment] = useState([]);
  let [errorMessage, SetErrorMessage] = useState("");
  let [rating, SetRating] = useState(0);
  let [checkServiceStatus, SetCheckServiceStatus] = useState(false);

  useEffect(() => {
    getUserProfile();
  }, []);

  async function getUserProfile() {
    try {
      let resForUserAPI = await axios.get(`${process.env.REACT_APP_BACKEND}/home`);
      SetUserProfile(resForUserAPI.data.message);
      let resForBookingHistory = await axios.get(`${process.env.REACT_APP_BACKEND}/bookingHistory`);
      SetBookingHistory(resForBookingHistory.data.message);
    } catch (err) {
      return ("error", err);
    }
  }

  function displayUserProfile() {
    if (userProfile.length === 0) {
      return <div>Loading...</div>;
    }
    const userName = userProfile[0]["userName"];
    return (
      <div>
        <br />
        <h2>
          Hi {userName}, Welcome
          <br />
          <br /> Our services package
        </h2>
        <div></div>
      </div>
    );
  }

  function handleCloseModal() {
    SetShowReviewModal(false);
  }

  function handleCommentChange(e) {
    SetComment(e.target.value);
  }

  function handleStarClick(selectedRating) {
    SetRating(selectedRating);
  }

  async function handleSendComment() {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND}/review`, {
        comment,
        rating,
      });
      const message = response.data.message;
      alert(message);
      SetComment("");
      SetRating(0);
      SetShowReviewModal(false);
    } catch (err) {
      SetErrorMessage("An Error occurred, Please try later");
    }
  }

  function displayBookingHistory() {
    if (bookingHistory.length === 0) {
      return <div><button>
      <a href="/newbooking">Make New Booking</a>
    </button></div>;
    }
    return (
      <div className={styles.tableContainer}>
        <div>
          <h2>Booking History</h2>
        </div>
        <div className={styles.bookingTable}>
          <table>
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
        </div>
        <div className={styles.bookingAndReview}>
          <button>
            <a href="/newbooking">Make New Booking</a>
          </button>
          {checkServiceStatus && (
            <button onClick={() => SetShowReviewModal(true)}>
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
    SetCheckServiceStatus(hasCompletedBooking);
  }, [bookingHistory]);

  return (
    <div className={styles.mainContainer}>
      <div>{displayUserProfile()}</div>
      <br />
      <div className={styles.ServicesAndPrice}>
        <div className={styles.pricingBox}>
          <h3>Basic Wash Package</h3>
          <h2>Basic Wash: $20</h2>
          <ul className={styles.pricingList}>
            <li>&#8226; &nbsp; &nbsp;Exterior hand wash</li>
            <li>&#8226; &nbsp; &nbsp;Wheel cleaning</li>
            <li>&#8226; &nbsp;Interior vacuuming</li>
            <li>&#8226; &nbsp;Windows cleaned inside and out</li>
          </ul>
        </div>
        <div className={styles.pricingBox}>
          <h3>Standard Wash Package</h3>
          <h2>Standard Wash: $30</h2>
          <ul className={styles.pricingList}>
            <li>&#8226; &nbsp;Includes all services in the Basic Wash Package</li>
            <li>&#8226; &nbsp;Application of high-quality wax</li>
            <li>&#8226; &nbsp; Interior wipe down and dashboard cleaning</li>
          </ul>
        </div>
        <div className={styles.pricingBox}>
          <h3>Deluxe Wash Package</h3>
          <h2>Deluxe Wash: $40</h2>
          <ul className={styles.pricingList}>
            <li> &#8226; &nbsp; Includes all services in the Standard Wash Package</li>
            <li> &#8226; &nbsp;Deep cleaning of interior surfaces</li>
            <li> &#8226; &nbsp;Application of protectant to interior surfaces</li>
            <li> &#8226; &nbsp;Air freshener</li>
          </ul>
        </div>
      </div>
      <div className={styles.bookingHistory}>{displayBookingHistory()}</div>
      {showReviewModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Post Review</h2>
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Write your comment here..."
            />
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={star <= rating ? styles.filled : styles.star}
                  onClick={() => handleStarClick(star)}
                >
                  &#9733; {/* Unicode character for a star */}
                </span>
              ))}
            </div>
            {errorMessage && <p>{errorMessage}</p>}
            <button onClick={handleSendComment}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
