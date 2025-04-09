import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import styles from './Landing.module.css';

const LandingPage = () => {
  let [reviews, SetReviews] = useState([]);

  useEffect(() => {
    handleReview();
  }, []);

  const handleReview = async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_BACKEND}/reviews`);
      SetReviews(response.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  function selectRandomReviews() {
    const shuffleReviews = reviews.sort(() => 0.5 - Math.random());
    return shuffleReviews.slice(0, 4);
  }

  function renderRandomReview() {
    const randomReview = selectRandomReviews();
    return randomReview.map((review, index) => (
      <div key={index} className={styles.reviewItem}>
        <p className={styles.reviewText}>“{review.content}”</p>
        <div className={styles.reviewAuthor}>- {review.userName}</div>
      </div>
    ));
  }

  return (
    <div className={styles.mainContainer}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heading}>Welcome to <span>SpeedyShine</span></h1>
          <p className={styles.subHeading}>
            Your one-stop solution for all your car service needs.
          </p>
          <p className={styles.description}>
            Discover the ease and satisfaction of using SpeedyShine. Book now and experience the difference!
          </p>
          <Link to="/signup" className={styles.ctaButton}>Sign Up</Link>
        </div>
        <div className={styles.heroImage}></div>
      </div>

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
      {/* Key Features Section */}
      <div className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Why Choose Us?</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureItem}>
            <strong>🚀 Convenience</strong>
            <p>Book your service anytime, anywhere, right from your smartphone.</p>
          </div>
          <div className={styles.featureItem}>
            <strong>💎 Quality</strong>
            <p>Our team of experienced professionals ensures top-notch service every time.</p>
          </div>
          <div className={styles.featureItem}>
            <strong>⚡ Reliability</strong>
            <p>Trust in our commitment to punctuality and efficiency.</p>
          </div>
          <div className={styles.featureItem}>
            <strong>🎯 Customization</strong>
            <p>Tailor services to fit your schedule and budget.</p>
          </div>
          <div className={styles.featureItem}>
            <strong>🛡️ Safety</strong>
            <p>We prioritize the safety and well-being of your vehicle.</p>
          </div>
        </div>
      </div>

      

      {/* Reviews Section */}
      <div className={styles.reviewsSection}>
        <h2 className={styles.sectionTitle}>Customer Reviews</h2>
        <div className={styles.reviewsGrid}>{renderRandomReview()}</div>
        <Link to="/reviews" className={styles.moreReviewsButton}>
          See More REVIEWS
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
