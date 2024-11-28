import React, { useEffect, useState } from "react";
import axios from 'axios';
import styles from './AllReviews.module.css';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND}/reviews`);
      setReviews(response.data.message);
    } catch (error) {
      return(error);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.reviewLine}>Reviews</h1>
      {reviews.map(review => (
        <div key={review._id} className={styles.reviewContainer}>
          <div className={styles.reviewContent}>
            <p>{review.content}</p>
            <p className={styles.reviewRating}>Rating: {review.rating}</p>
          </div>
          <div className={styles.reviewStats}>
            <p>Created At: {new Date(review.createdAt).toLocaleString().slice(0,9)}</p>
          </div>
          <h2> By: {review.userName}</h2>
        </div>
      ))}
    </div>
  );
};

export default ReviewPage;
