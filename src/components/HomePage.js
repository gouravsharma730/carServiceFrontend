import React, {useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';

function App() {
  let [userProfile,SetUserProfile]= useState([]);
  let [bookingHistory, SetBookingHistory]=useState([]);
  let [showReviewModal, SetShowReviewModal] = useState(false);
  let [comment, SetComment] = useState([]);
  let [errorMessage, SetErrorMessage] = useState('');
  let [rating, SetRating] = useState(0);
  useEffect(()=>{
    getUserProfile();

  },[])
  async function getUserProfile(){
    try{
     
      let resForUserAPI = await axios.get('http://localhost:4000/home');
      SetUserProfile(resForUserAPI.data.message);
      let resForBookingHistory= await axios.get('http://localhost:4000/bookingHistory');
      SetBookingHistory(resForBookingHistory.data.message);

      return;
    }catch(err){
      return console.log('error',err);
    }
  }
  function displayUserProfile(){
    if (userProfile.length === 0) {
      return <div>Loading...</div>; 
    }
    const userName = userProfile[0]['userName'];
    return <div><br/>
      <h2> Hi {userName}, Welcome<br/><br/><br/> Our services package</h2>      
      <div>
      </div>
    </div>
  }
  function handleCloseModal(){
    SetShowReviewModal(false);
  }
  function handleCommentChange(e){
    SetComment(e.target.value);
  }
  function handleStarClick(selectedRating) {
    SetRating(selectedRating);
  }
  async function handleSendComment(){
    try{
      console.log(comment,rating);
      const response = await axios.post('http://localhost:4000/review',{comment,rating})
      const message = response['data']['message'];
      alert(message);
      SetComment('');
      SetRating(0);
      SetShowReviewModal(false); 
    }catch(err){
      SetErrorMessage("An Error occurred, Please try later")
    }
  }
  function displayBookingHistory(){
    if (userProfile.length === 0) {
      return <div>Loading...</div>; 
    }
    return (
      <div className='table-container'>
        <h2>Booking History</h2>
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
            {bookingHistory.map(booking => (
              <tr key={booking._id}>
                <td>{booking.carNumber}</td>
                <td>{booking.serviceType}</td>
                <td>{booking.serviceStatus}</td>
                <td>{booking.dateOfPickUp}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='bookingAndReview'>
        <button><a href="/newbooking">Make New Booking</a>
        </button>
        <button onClick={()=>SetShowReviewModal(true)}>Post Review</button>
        </div>
      </div>
    );
  }
  return (
    <div className="main-container ">
        <div>{displayUserProfile()}</div>
        <br/>
      <div className='ServicesAndPrice'>
      <div>
        <h3>Basic Wash Package:</h3>
        <ul className="pricing-list">
          <li>Exterior hand wash</li>
          <li>Wheel cleaning</li>
          <li>Tire dressing</li>
          <li>Interior vacuuming</li>
          <li>Windows cleaned inside and out</li>
        </ul>
      </div>
      <div>
        <h3>Standard Wash Package:</h3>
        <ul className="pricing-list">
          <li>Includes all services in the Basic Wash Package</li>
          <li>Application of high-quality wax</li>
          <li>Interior wipe down and dashboard cleaning</li>
        </ul>
      </div>
      <div>
        <h3>Deluxe Wash Package:</h3>
        <ul className="pricing-list">
          <li>Includes all services in the Standard Wash Package</li>
          <li>Deep cleaning of interior surfaces</li>
          <li>Application of protectant to interior surfaces</li>
          <li>Air freshener</li>
        </ul>
      </div>
      </div>
      <div>
      <h3>Pricing:</h3>
      <ul className="pricing-list">
        <li>Basic Wash: $20</li>
        <li>Standard Wash: $30</li>
        <li>Deluxe Wash: $40</li>
      </ul>
      </div>
      <div className='bookingHistory'>{displayBookingHistory()}
      </div>
      {/* Modal for posting review */}
      {showReviewModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Post Review</h2>
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Write your comment here..."
            />
            <div>
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  className={star <= rating ? 'star filled' : 'star'}
                  onClick={() => handleStarClick(star)}
                >
                  &#9733; {/* Unicode character for a star */}
                </span>
              ))}
            </div>
            {errorMessage &&<p>{errorMessage}</p>}
            <button onClick={handleSendComment}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
