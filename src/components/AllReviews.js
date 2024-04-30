import React, { useEffect, useState } from "react";
import axios from 'axios';
import './AllReviews.css';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    try {
      const response = await axios.get('http://localhost:4000/reviews');
      setReviews(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="reviewLine">Reviews</h1>
      {reviews.map(review => (
        <div key={review._id} className="review-container">
          <div className="review-content">
            <p>{review.content}</p>
            <p className="review-rating">Rating: {review.rating}</p>
          </div>
          <div className="review-stats">
            <p>Created At: {new Date(review.createdAt).toLocaleString().slice(0,9)}</p>
          </div>
          <h2> By: {review.userName}</h2>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ReviewPage;
