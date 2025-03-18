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
      console.error("Error fetching reviews:", error);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.reviewLine}>Customer Reviews</h1>
      <div className={styles.reviewList}>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review._id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <h2 className={styles.userName}>{review.userName}</h2>
                <span className={styles.rating}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={i < review.rating ? styles.filledStar : styles.emptyStar}>
                      &#9733;
                    </span>
                  ))}
                </span>
              </div>
              <p className={styles.comment}>{review.content}</p>
              <div className={styles.footer}>
                <span className={styles.date}>
                  {new Date(review.createdAt).toLocaleString().slice(0, 10)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noReviews}>No reviews available yet.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
